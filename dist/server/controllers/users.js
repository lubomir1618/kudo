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
const db = monk_1.default(process.env.MONGODB_URL || '');
class Users {
    constructor() {
        this.users = db.get('users');
    }
    list(req, res) {
        utils.serverLog('/users => list', req);
        if (!utils.isAuthenticated(req, res, E.USER_ROLE.admin)) {
            return;
        }
        this.users
            .find()
            .then((data) => res.json(this.stripPass(data)))
            .catch((err) => utils.errorHandler(res, err.message));
    }
    show(req, res) {
        utils.serverLog(req.params.id === 'where' ? '/users/where?:key=:val => show' : '/users => create', req);
        if (!utils.isAuthenticated(req, res, E.USER_ROLE.admin)) {
            return;
        }
        let where = {};
        if (req.params.id === 'where') {
            const [key, val] = Object.entries(req.query)[0];
            where = { [key]: val };
        }
        else {
            where = { _id: req.params.id };
        }
        this.users
            .find(where)
            .then((data) => res.json(this.stripPass(data || [])))
            .catch((err) => utils.errorHandler(res, err.message, E.REST_ERROR.not_found));
    }
    create(req, res) {
        utils.serverLog('/users => create', req);
        if (!utils.isAuthenticated(req, res, E.USER_ROLE.admin)) {
            return;
        }
        const valid = validate_1.isUserValid(req.body, E.FORM_MODE.insert);
        if (valid === true) {
            // login duplicity check
            this.users
                .findOne({ login: req.body.login })
                .then((existingUser) => {
                if ((existingUser === null || existingUser === void 0 ? void 0 : existingUser.login) === undefined) {
                    this.setUser(req, res);
                }
                else {
                    utils.errorHandler(res, 'Duplicate user', E.REST_ERROR.bad_request);
                }
            })
                .catch((err) => utils.errorHandler(res, err.message));
        }
        else {
            utils.errorHandler(res, `Error in: ${valid.join(', ')}`, E.REST_ERROR.bad_request);
        }
    }
    update(req, res) {
        utils.serverLog('/users/:id => update', req);
        if (!utils.isAuthenticated(req, res, E.USER_ROLE.admin)) {
            return;
        }
        const valid = validate_1.isUserValid(req.body, E.FORM_MODE.update);
        if (valid === true) {
            const user = {
                login: req.body.login,
                name: req.body.name,
                role: req.body.role,
                surname: req.body.surname
            };
            // update db
            this.users
                .update({ _id: req.params.id }, { $set: Object.assign({}, user) })
                .then((data) => res.json(data))
                .catch((err) => utils.errorHandler(res, err.message, E.REST_ERROR.not_found));
        }
        else {
            utils.errorHandler(res, `Error in: ${valid.join(', ')}`, E.REST_ERROR.bad_request);
        }
    }
    setUser(req, res) {
        const user = {
            created: new Date().getTime(),
            login: req.body.login,
            name: req.body.name,
            password: req.body.password,
            role: req.body.role,
            surname: req.body.surname
        };
        // save to db
        this.users
            .insert(user)
            .then((data) => res.json(data))
            .catch((err) => utils.errorHandler(res, err.message));
    }
    stripPass(data) {
        const myData = Array.isArray(data) ? data : [data];
        const out = myData.map((user) => {
            const password = '👮‍♂️';
            return Object.assign(Object.assign({}, user), { password });
        });
        return Array.isArray(data) ? out : out[0];
    }
}
const users = new Users();
exports.cUsers = {
    create: users.create.bind(users),
    list: users.list.bind(users),
    show: users.show.bind(users),
    update: users.update.bind(users)
};
//# sourceMappingURL=users.js.map