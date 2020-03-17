"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const E = __importStar(require("../common/constants"));
exports.COOKIE_MAX_AGE = Number(process.env.COOKIE_MAX_AGE) || 180000;
function serverLog(text, req) {
    console.log(`${req.method} ${text}, ` +
        `query: ${JSON.stringify(req.query)}, ` +
        `params: ${JSON.stringify(req.params)}, ` +
        `body: ${JSON.stringify(req.body)}`);
}
exports.serverLog = serverLog;
function errorHandler(res, message, code = E.REST_ERROR.unprocessable) {
    console.log(`💥 ${code} Error: ${message}`);
    res.status(code);
    res.json({ message });
    res.end();
}
exports.errorHandler = errorHandler;
function setSession(req, key, val) {
    if (req.session) {
        req.session[key] = val;
    }
}
exports.setSession = setSession;
function setAuthCookie(req, res, data) {
    setSession(req, 'authenticated', data.authenticated);
    setSession(req, 'role', data.role);
    if (data.authenticated) {
        res.cookie('connect.role', data.role, {
            httpOnly: false,
            maxAge: exports.COOKIE_MAX_AGE
        });
        res.cookie('connect.userId', data.userId, {
            httpOnly: false,
            maxAge: exports.COOKIE_MAX_AGE
        });
    }
    else {
        res.clearCookie('connect.role');
        res.clearCookie('connect.userId');
    }
}
exports.setAuthCookie = setAuthCookie;
function isAuthenticated(req, res, role) {
    let ok = false;
    if (req.session) {
        ok = req.session.authenticated === true;
        if (role) {
            ok = ok && req.session.role === role;
        }
    }
    if (!ok) {
        errorHandler(res, `Not authenticated`, E.REST_ERROR.forbidden);
    }
    return ok;
}
exports.isAuthenticated = isAuthenticated;
//# sourceMappingURL=utils.js.map