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
const E = __importStar(require("../../common/constants"));
const validate_1 = require("../../common/validate");
dotenv_1.default.config();
const DB = monk_1.default(process.env.MONGODB_URL || '');
function cLike(req, res) {
    utils.serverLog('/like => like', req);
    const _id = req.body._id;
    const valid = validate_1.isLikeValid(_id);
    if (valid !== true) {
        return utils.errorHandler(res, `Error in: ${valid.join(', ')}`, E.REST_ERROR.bad_request);
    }
    const events = DB.get('events');
    const cards = DB.get('cards');
    let cardData;
    let eventData;
    let likes;
    cards
        // select card because we need eventId and fresh value of likes
        .findOne({ _id })
        // select event because we need date range
        .then((data) => {
        if (data) {
            cardData = data;
        }
        else {
            throw new Error('No such card in DB');
        }
        return events.findOne({ _id: cardData.eventId });
    })
        // check date range to allow likes increase
        .then((data) => {
        if (data) {
            eventData = data;
        }
        else {
            throw new Error('No such event in DB');
        }
        const now = new Date().getTime();
        if (eventData.dateFrom <= now && now <= eventData.dateTo) {
            likes = cardData.likes + 1;
            return cards.update({ _id }, { $set: { likes } });
        }
        else {
            throw new Error('Can not vote for this event.');
        }
    })
        .then((data) => {
        if (data.ok === 1) {
            res.json({ likes });
            res.end();
        }
        else {
            throw new Error('Could not incerase likes.');
        }
    })
        .catch((err) => utils.errorHandler(res, err.message, E.REST_ERROR.not_found));
}
exports.cLike = cLike;
//# sourceMappingURL=like.js.map