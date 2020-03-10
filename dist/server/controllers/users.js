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
            .findOne(where)
            .then((data) => res.json(this.stripPass(data || [])))
            .catch((err) => utils.errorHandler(res, err.message));
    }
    create(req, res) {
        utils.serverLog('/users => create', req);
        if (!utils.isAuthenticated(req, res, E.USER_ROLE.admin)) {
            return;
        }
        const valid = validate_1.isUserValid(req.body);
        if (valid === true) {
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
        else {
            utils.errorHandler(res, `Error in: ${valid.join(', ')}`);
        }
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
    show: users.show.bind(users)
};
//# sourceMappingURL=users.js.map