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
class Cards {
    constructor() {
        this.cards = db.get('cards');
    }
    list(req, res) {
        utils.serverLog('/cards => list', req);
        this.cards.find().then((data) => res.json(data));
    }
    show(req, res) {
        let where = {};
        if (req.params.id === 'where') {
            utils.serverLog('/cards/where?:key=:val => show', req);
            const [key, val] = Object.entries(req.query)[0];
            where = { [key]: val };
        }
        else {
            utils.serverLog('/cards/:id => show', req);
            where = { _id: req.params.id };
        }
        this.cards.findOne(where).then((data) => res.json(data));
    }
    create(req, res) {
        utils.serverLog('/cards => create', req);
        const valid = validate_1.isCardValid(req.body);
        if (valid === true) {
            const card = {
                author: req.body.author || 'anonymous',
                awardedTo: req.body.awardedTo,
                created: new Date().getTime(),
                eventId: req.body.eventId,
                likes: 0,
                text: req.body.text,
                title: req.body.name,
                type: req.body.type
            };
            // save to db
            this.cards.insert(card).then((data) => res.json(data));
        }
        else {
            res.status(422);
            res.json({ message: `Error in: ${valid.join(', ')}` });
        }
    }
    update(req, res) {
        utils.serverLog('/cards/:id => update', req);
        const valid = validate_1.isCardValid(req.body);
        if (valid === true) {
            const card = {
                author: req.body.author,
                awardedTo: req.body.awardedTo,
                likes: req.body.likes,
                text: req.body.text,
                title: req.body.name,
                type: req.body.type
            };
            // save to db
            this.cards.update({ _id: req.params.id }, card).then((data) => res.json(data));
        }
        else {
            res.status(422);
            res.json({ message: `Error in: ${valid.join(', ')}` });
        }
    }
}
const cards = new Cards();
exports.cCards = {
    create: cards.create.bind(cards),
    list: cards.list.bind(cards),
    show: cards.show.bind(cards)
};
//# sourceMappingURL=cards.js.map