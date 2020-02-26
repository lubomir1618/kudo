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
const utils = __importStar(require("../utils"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const db = monk_1.default(process.env.MONGODB_URL || '');
class Cards {
    constructor() {
        this.cards = db.get('cards');
    }
    list(req, res) {
        utils.serverLog('/card => list', req);
        this.cards.find().then((data) => res.json(data));
    }
    show(req, res) {
        utils.serverLog('/card/:id => show', req);
        this.cards.findOne({ _id: req.params.id }).then((data) => res.json(data));
    }
    create(req, res) {
        utils.serverLog('/card => create', req);
        if (this.isValid(req.body)) {
            const card = {
                author: req.body.author,
                date: new Date(),
                eventId: Number(req.body.eventId),
                likes: Number(req.body.likes),
                name: req.body.name,
                text: req.body.text
            };
            // save to db
            this.cards.insert(card).then((data) => res.json(data));
        }
        else {
            res.status(422);
            res.json({ message: 'Name and surname must be fulfilled!' });
        }
    }
    isValid(data) {
        return data.name && data.name.toString() !== '';
    }
}
const cards = new Cards();
exports.cCards = {
    create: cards.create.bind(cards),
    list: cards.list.bind(cards),
    show: cards.show.bind(cards)
};
//# sourceMappingURL=cards.js.map