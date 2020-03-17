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
const node_rsa_1 = __importDefault(require("node-rsa"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const utils = __importStar(require("../utils"));
const E = __importStar(require("../../common/constants"));
const validate_1 = require("../../common/validate");
dotenv_1.default.config();
const db = monk_1.default(process.env.MONGODB_URL || '');
class Users {
    constructor() {
        this.users = db.get('users');
        this.key = new node_rsa_1.default({ b: 256 });
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
        var _a, _b;
        utils.serverLog('/users => create', req);
        if (!utils.isAuthenticated(req, res, E.USER_ROLE.admin)) {
            return;
        }
        let credentials;
        // Check if we started handshake
        if (((_a = req.session) === null || _a === void 0 ? void 0 : _a.privateKey) === undefined) {
            utils.errorHandler(res, 'Error in handshake', E.REST_ERROR.forbidden);
            return;
        }
        // decode encrypted data
        try {
            const body = req.body;
            this.key.importKey((_b = req.session) === null || _b === void 0 ? void 0 : _b.privateKey);
            const dataBase = this.key.decrypt(body.credentials, 'base64');
            const dataJson = Buffer.from(dataBase, 'base64').toString();
            credentials = JSON.parse(dataJson);
        }
        catch (err) {
            const msg = err.message.includes('error:04099079')
                ? '🔐 wrong or expired key used, hack ?!'
                : err.message;
            console.log(msg);
            utils.errorHandler(res, 'Error in received data.', E.REST_ERROR.bad_request);
            return;
        }
        const rawData = Object.assign(Object.assign({}, req.body), { password: credentials.password });
        const valid = validate_1.isUserValid(rawData, E.FORM_MODE.insert);
        if (valid === true) {
            // login duplicity check
            this.users
                .findOne({ login: rawData.login })
                .then((existingUser) => {
                if ((existingUser === null || existingUser === void 0 ? void 0 : existingUser.login) === undefined) {
                    this.setUser(res, rawData);
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
    setUser(res, rawData) {
        const newSalt = bcryptjs_1.default.genSaltSync(10);
        const password = bcryptjs_1.default.hashSync(rawData.password, newSalt);
        const user = {
            created: new Date().getTime(),
            login: rawData.login,
            name: rawData.name,
            password,
            role: rawData.role,
            surname: rawData.surname
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