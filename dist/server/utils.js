"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
//# sourceMappingURL=utils.js.map