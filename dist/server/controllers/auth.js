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
class Auth {
    constructor() {
        this.users = db.get('users');
    }
    show(req, res) {
        utils.serverLog('/auth/:login => show', req);
        const where = { login: req.params.id };
        this.users
            .findOne(where)
            .then((data) => {
            if (!data || !data.password) {
                throw new Error('Authentication failed');
            }
            else {
                const salt = data.password.substr(0, 29);
                return res.json({ salt });
            }
        })
            .catch((err) => utils.errorHandler(res, err.message));
    }
    create(req, res) {
        utils.serverLog('/auth => create', req);
        const valid = validate_1.isAuthValid(req.body);
        if (valid === true) {
            const where = { login: req.body.login, password: req.body.password };
            this.users
                .findOne(where)
                .then((data) => {
                let out;
                if (!data || !data.login) {
                    utils.setAuthCookie(req, res, false, E.USER_ROLE.none);
                    out = { authenticated: false, role: E.USER_ROLE.none };
                }
                else {
                    utils.setAuthCookie(req, res, true, data.role);
                    out = { authenticated: true, role: data.role };
                }
                return res.json(out);
            })
                .catch((err) => utils.errorHandler(res, err.message));
        }
        else {
            utils.setAuthCookie(req, res, false, E.USER_ROLE.none);
            utils.errorHandler(res, `Error in: ${valid.join(', ')}`);
        }
    }
}
const users = new Auth();
exports.cAuth = {
    create: users.create.bind(users),
    show: users.show.bind(users)
};
//# sourceMappingURL=auth.js.map