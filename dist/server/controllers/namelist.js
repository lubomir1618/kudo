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
dotenv_1.default.config();
const db = monk_1.default(process.env.MONGODB_URL || '');
class NameLists {
    constructor() {
        this.nameLists = db.get('namelist');
    }
    list(req, res) {
        utils.serverLog('/events => list', req);
        this.nameLists
            .find()
            .then((data) => res.json(data))
            .catch((err) => utils.errorHandler(res, err.message));
    }
    show(req, res) {
        let where = {};
        if (req.params.id === 'where') {
            utils.serverLog('/namelist/where?:key=:val => show', req);
            const [key, val] = Object.entries(req.query)[0];
            where = { [key]: val };
        }
        else {
            utils.serverLog('/namelist/:id => show', req);
            where = { _id: req.params.id };
        }
        try {
            this.nameLists
                .find(where)
                .then((data) => res.json(data))
                .catch((err) => utils.errorHandler(res, err.message, E.REST_ERROR.not_found));
        }
        catch (e) {
            utils.errorHandler(res, 'No namelist', E.REST_ERROR.not_found);
        }
    }
    create(req, res) {
        utils.serverLog('/events => create', req);
        if (!utils.isAuthenticated(req, res)) {
            return;
        }
        const valid = true; //isEventValid(req.body);
        if (valid === true) {
            const namelist = {
                created: new Date().getTime(),
                names: req.body.names,
                userId: req.body.userId
            };
            // save to db
            this.nameLists
                .insert(namelist)
                .then((data) => res.json(data))
                .catch((err) => utils.errorHandler(res, err.message, E.REST_ERROR.bad_request));
        }
        else {
            utils.errorHandler(res, `Error in: validity of namelist`, E.REST_ERROR.bad_request);
        }
    }
    update(req, res) {
        utils.serverLog('/namelist/:id => update', req);
        if (!utils.isAuthenticated(req, res)) {
            return;
        }
        const valid = true; //isEventValid(req.body);
        if (valid === true) {
            const names = {
                names: req.body.names
            };
            // update db
            this.nameLists
                .update({ _id: req.params.id }, { $set: Object.assign({}, names) })
                .then((data) => res.json(data))
                .catch((err) => utils.errorHandler(res, err.message, E.REST_ERROR.not_found));
        }
        else {
            utils.errorHandler(res, `Error in: validity of namelist`, E.REST_ERROR.bad_request);
        }
    }
}
const userNameList = new NameLists();
exports.cUserNameList = {
    create: userNameList.create.bind(userNameList),
    list: userNameList.list.bind(userNameList),
    show: userNameList.show.bind(userNameList),
    update: userNameList.update.bind(userNameList)
};
//# sourceMappingURL=namelist.js.map