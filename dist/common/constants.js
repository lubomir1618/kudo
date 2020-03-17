"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.COOKIE_MAX_AGE = Number(process.env.COOKIE_MAX_AGE) || 180000;
var CARD_TYPE;
(function (CARD_TYPE) {
    CARD_TYPE["great_job"] = "great_job";
    CARD_TYPE["totally_awesome"] = "totally_awesome";
    CARD_TYPE["well_done"] = "well_done";
    CARD_TYPE["many_thanks"] = "many_thanks";
    CARD_TYPE["very_happy"] = "very_happy";
    CARD_TYPE["congrats"] = "congrats";
    CARD_TYPE["proud"] = "proud";
    CARD_TYPE["thank_you"] = "thank_you";
})(CARD_TYPE = exports.CARD_TYPE || (exports.CARD_TYPE = {}));
var EVENT_STATE;
(function (EVENT_STATE) {
    EVENT_STATE["past"] = "past";
    EVENT_STATE["active"] = "active";
    EVENT_STATE["future"] = "future";
})(EVENT_STATE = exports.EVENT_STATE || (exports.EVENT_STATE = {}));
var USER_ROLE;
(function (USER_ROLE) {
    USER_ROLE["admin"] = "admin";
    USER_ROLE["user"] = "user";
    USER_ROLE["none"] = "none";
})(USER_ROLE = exports.USER_ROLE || (exports.USER_ROLE = {}));
var FORM_MODE;
(function (FORM_MODE) {
    FORM_MODE["hidden"] = "hidden";
    FORM_MODE["insert"] = "insert";
    FORM_MODE["update"] = "update";
})(FORM_MODE = exports.FORM_MODE || (exports.FORM_MODE = {}));
var REST_ERROR;
(function (REST_ERROR) {
    REST_ERROR[REST_ERROR["bad_request"] = 400] = "bad_request";
    REST_ERROR[REST_ERROR["unauthorized"] = 401] = "unauthorized";
    REST_ERROR[REST_ERROR["forbidden"] = 403] = "forbidden";
    REST_ERROR[REST_ERROR["not_found"] = 404] = "not_found";
    REST_ERROR[REST_ERROR["unprocessable"] = 422] = "unprocessable";
})(REST_ERROR = exports.REST_ERROR || (exports.REST_ERROR = {}));
//# sourceMappingURL=constants.js.map