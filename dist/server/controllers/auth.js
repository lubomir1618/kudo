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
    /**
     * Retrieves salt for user password encoding
     */
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
            .catch((err) => utils.errorHandler(res, err.message, E.REST_ERROR.unauthorized));
    }
    /**
     * Compares login and password with DB
     */
    create(req, res) {
        utils.serverLog('/auth => create', req);
        const valid = validate_1.isAuthValid(req.body, E.FORM_MODE.insert);
        const out = { authenticated: false, role: E.USER_ROLE.none, userId: undefined };
        if (valid === true) {
            const where = { login: req.body.login, password: req.body.password };
            this.users
                .findOne(where)
                .then((data) => {
                if (data && data.login) {
                    out.authenticated = true;
                    out.role = data.role;
                    out.userId = data._id;
                }
                utils.setAuthCookie(req, res, out);
                return res.json(out);
            })
                .catch((err) => utils.errorHandler(res, err.message, E.REST_ERROR.forbidden));
        }
        else {
            utils.setAuthCookie(req, res, out);
            utils.errorHandler(res, `Error in: ${valid.join(', ')}`, E.REST_ERROR.bad_request);
        }
    }
    /**
     * Password change
     */
    update(req, res) {
        var _a;
        utils.serverLog('/auth/:id => update', req);
        if (!utils.isAuthenticated(req, res)) {
            return;
        }
        const isAdmin = ((_a = req.session) === null || _a === void 0 ? void 0 : _a.role) === E.USER_ROLE.admin;
        const valid = validate_1.isPassChangeValid(req.body, E.FORM_MODE.update, isAdmin);
        if (valid === true) {
            const login = req.body.login;
            const where = { login, password: req.body.passwordOld };
            // admin can change user password without knowing old password
            if (isAdmin && login !== 'admin') {
                delete where.password;
            }
            this.users
                .findOne(where)
                .then((data) => {
                if (data && data.login) {
                    return this.users.update({ login }, { $set: { password: req.body.password } });
                }
                else {
                    throw new Error('Authentication failed');
                }
            })
                .then((data) => res.json(data))
                .catch((err) => utils.errorHandler(res, err.message, E.REST_ERROR.not_found));
        }
        else {
            utils.errorHandler(res, `Error in: ${valid.join(', ')}`, E.REST_ERROR.bad_request);
        }
    }
    /**
     * Log out session
     */
    destroy(req, res) {
        utils.serverLog('/auth => destroy', req);
        const out = { authenticated: false, role: E.USER_ROLE.none, userId: undefined };
        utils.setAuthCookie(req, res, out);
        res.end('{"result": "logged out"}');
    }
}
const auth = new Auth();
exports.cAuth = {
    create: auth.create.bind(auth),
    destroy: auth.destroy.bind(auth),
    show: auth.show.bind(auth),
    update: auth.update.bind(auth)
};
//# sourceMappingURL=auth.js.map