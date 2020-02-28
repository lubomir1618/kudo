"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const monk_1 = __importDefault(require("monk"));
const dotenv_1 = __importDefault(require("dotenv"));
const utils = __importStar(require("../utils"));
const validate_1 = require("../../common/validate");
dotenv_1.default.config();
const db = monk_1.default(process.env.MONGODB_URL || '');
class Events {
    constructor() {
        this.events = db.get('events');
    }
    list(req, res) {
        utils.serverLog('/events => list', req);
        this.events.find().then((data) => res.json(data));
    }
    show(req, res) {
        let where = {};
        if (req.params.id === 'where') {
            utils.serverLog('/events/where?:key=:val => show', req);
            const [key, val] = Object.entries(req.query)[0];
            where = { [key]: val };
        }
        else {
            utils.serverLog('/events/:id => show', req);
            where = { _id: req.params.id };
        }
        this.events
            .findOne(where)
            .then((data) => res.json(data))
            .catch((err) => utils.errorHandler(res, err.message));
    }
    create(req, res) {
        utils.serverLog('/events => create', req);
        const valid = validate_1.isEventValid(req.body);
        if (valid === true) {
            const event = {
                created: new Date().getTime(),
                dateFrom: Number(req.body.dateFrom),
                dateTo: Number(req.body.dateTo),
                name: req.body.name,
                state: req.body.state
            };
            // save to db
            this.events
                .insert(event)
                .then((data) => res.json(data))
                .catch((err) => utils.errorHandler(res, err.message));
        }
        else {
            utils.errorHandler(res, `Error in: ${valid.join(', ')}`);
        }
    }
    update(req, res) {
        utils.serverLog('/events/:id => update', req);
        const valid = validate_1.isEventValid(req.body);
        if (valid === true) {
            const card = {
                dateFrom: Number(req.body.dateFrom),
                dateTo: Number(req.body.dateTo),
                name: req.body.name,
                state: req.body.state
            };
            // update db
            this.events
                .update({ _id: req.params.id }, { $set: Object.assign({}, card) })
                .then((data) => res.json(data))
                .catch((err) => utils.errorHandler(res, err.message));
        }
        else {
            utils.errorHandler(res, `Error in: ${valid.join(', ')}`);
        }
    }
}
const events = new Events();
exports.cEvents = {
    create: events.create.bind(events),
    list: events.list.bind(events),
    show: events.show.bind(events),
    update: events.update.bind(events)
};
//# sourceMappingURL=events.js.map