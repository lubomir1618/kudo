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
const path_1 = __importDefault(require("path"));
const utils = __importStar(require("../utils"));
const E = __importStar(require("../../common/constants"));
const validate_1 = require("../../common/validate");
dotenv_1.default.config();
const db = monk_1.default(process.env.MONGODB_URL || '');
class Auth {
    constructor() {
        this.users = db.get('users');
        this.key = new node_rsa_1.default({ b: 256 });
    }
    list(rootPath, res) {
        res.set('Content-Type', 'text/html');
        res.sendFile(path_1.default.resolve(rootPath, 'client', 'admin.html'));
    }
    /**
     * Sends RSA public key to client, starts handshake.
     */
    show(req, res) {
        utils.serverLog('/auth/:login => show', req);
        this.key.generateKeyPair(512);
        utils.setSession(req, 'privateKey', this.key.exportKey('pkcs8-private-pem'));
        res.json({ key: this.key.exportKey('pkcs8-public-pem') });
        res.end();
    }
    /**
     * Compares login and password with DB
     */
    create(req, res) {
        var _a, _b;
        utils.serverLog('/auth => create', req);
        const out = { authenticated: false, role: E.USER_ROLE.none, userId: undefined };
        let credentials;
        // Check if we started handshake
        if (((_a = req.session) === null || _a === void 0 ? void 0 : _a.privateKey) === undefined) {
            utils.setAuthCookie(req, res, out);
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
            utils.errorHandler(res, 'Authentication failed', E.REST_ERROR.forbidden);
            return;
        }
        // proceed with authentication check
        const valid = validate_1.isAuthValid(credentials, E.FORM_MODE.insert);
        if (valid === true) {
            this.users
                .findOne({ login: credentials.login })
                .then((data) => {
                if (!data || !data.password) {
                    throw new Error('Authentication failed');
                }
                else {
                    const salt = data.password.substr(0, 29);
                    const hash = bcryptjs_1.default.hashSync(credentials.password, salt);
                    if (hash === data.password) {
                        out.authenticated = true;
                        out.role = data.role;
                        out.userId = data._id;
                    }
                    utils.setAuthCookie(req, res, out);
                    utils.setSession(req, 'privateKey', undefined);
                    return res.json(out);
                }
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
        var _a, _b, _c;
        utils.serverLog('/auth/:id => update', req);
        let credentials;
        // Check if we are authenticated
        if (!utils.isAuthenticated(req, res)) {
            return;
        }
        // Check if we started handshake
        if (((_a = req.session) === null || _a === void 0 ? void 0 : _a.privateKey) === undefined) {
            utils.errorHandler(res, 'Error in handshake', E.REST_ERROR.forbidden);
            return;
        }
        else {
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
                utils.errorHandler(res, 'Authentication failed', E.REST_ERROR.forbidden);
                return;
            }
        }
        // proceed with password change
        const isAdmin = ((_c = req.session) === null || _c === void 0 ? void 0 : _c.role) === E.USER_ROLE.admin;
        const valid = validate_1.isPassChangeValid(credentials, E.FORM_MODE.update, isAdmin);
        if (valid === true) {
            const login = credentials.login;
            this.users
                .findOne({ login })
                .then((data) => {
                if (data && data.login) {
                    // admin can change user password without knowing old password
                    if (!(isAdmin && login !== 'admin')) {
                        const salt = data.password.substr(0, 29);
                        const hash = bcryptjs_1.default.hashSync(credentials.passwordOld, salt);
                        if (hash !== data.password) {
                            throw new Error('Authentication failed');
                        }
                    }
                    const newSalt = bcryptjs_1.default.genSaltSync(10);
                    const newHash = bcryptjs_1.default.hashSync(credentials.password, newSalt);
                    return this.users.update({ login }, { $set: { password: newHash } });
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
    list: auth.list.bind(auth),
    show: auth.show.bind(auth),
    update: auth.update.bind(auth)
};
//# sourceMappingURL=auth.js.map