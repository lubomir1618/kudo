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
        utils.serverLog('/events/:id => show', req);
        this.events.findOne({ _id: req.params.id }).then((data) => res.json(data));
    }
    create(req, res) {
        utils.serverLog('/events => create', req);
        const valid = validate_1.isEventValid(req.body);
        if (valid === true) {
            const event = {
                created: new Date().getTime(),
                date: req.body.date,
                name: req.body.name,
                state: req.body.state
            };
            // save to db
            this.events.insert(event).then((data) => res.json(data));
        }
        else {
            res.status(422);
            res.json({ message: `Error in: ${valid.join(', ')}` });
        }
    }
}
const events = new Events();
exports.cEvents = {
    create: events.create.bind(events),
    list: events.list.bind(events),
    show: events.show.bind(events)
};
//# sourceMappingURL=events.js.map