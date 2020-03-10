"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.COOKIE_MAX_AGE = Number(process.env.COOKIE_MAX_AGE) || 60000;
function serverLog(text, req) {
    console.log(`${req.method} ${text}, ` +
        `query: ${JSON.stringify(req.query)}, ` +
        `params: ${JSON.stringify(req.params)}, ` +
        `body: ${JSON.stringify(req.body)}`);
}
exports.serverLog = serverLog;
function errorHandler(res, message) {
    console.log(`💥 Error: ${message}`);
    res.status(422);
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
function setAuthCookie(req, res, authenticated, role) {
    setSession(req, 'authenticated', authenticated);
    setSession(req, 'role', role);
    if (authenticated) {
        res.cookie('connect.role', role, {
            httpOnly: false,
            maxAge: exports.COOKIE_MAX_AGE
        });
    }
    else {
        res.clearCookie('connect.role');
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
        errorHandler(res, `Error: not authenticated`);
    }
    return ok;
}
exports.isAuthenticated = isAuthenticated;
//# sourceMappingURL=utils.js.map