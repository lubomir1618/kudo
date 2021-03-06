"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const E = __importStar(require("./constants"));
function hasData(data, type = 'string') {
    if (data === undefined || data === null) {
        return false;
    }
    switch (type) {
        case 'number':
            return typeof data === 'number' || !isNaN(data);
        case 'boolean':
            return typeof data === 'boolean';
        default:
            return data !== '';
    }
}
exports.hasData = hasData;
function hasOneOf(data, check) {
    if (hasData(data)) {
        return check.includes(data);
    }
    return false;
}
exports.hasOneOf = hasOneOf;
function isSame(original, copy) {
    return original === copy;
}
exports.isSame = isSame;
function isLikeValid(_id) {
    return hasData(_id) ? true : ['_id'];
}
exports.isLikeValid = isLikeValid;
function isUserValid(user, mode) {
    let bugs = [];
    const authValid = isAuthValid(user, mode);
    if (authValid !== true) {
        bugs = authValid;
    }
    if (!hasData(user.name)) {
        bugs.push('name');
    }
    if (!hasData(user.surname)) {
        bugs.push('surname');
    }
    if (!(user.role && E.USER_ROLE[user.role])) {
        bugs.push('role');
    }
    return bugs.length ? bugs : true;
}
exports.isUserValid = isUserValid;
function isAuthValid(user, mode) {
    const bugs = [];
    if (!hasData(user.login)) {
        bugs.push('login');
    }
    if (mode === E.FORM_MODE.insert) {
        if (!hasData(user.password)) {
            bugs.push('password');
        }
    }
    return bugs.length ? bugs : true;
}
exports.isAuthValid = isAuthValid;
function isPassChangeValid(user, mode = E.FORM_MODE.insert, isAdmin = false) {
    let bugs = [];
    if (mode === E.FORM_MODE.insert) {
        const passValid = isPasswordValid(user);
        if (passValid !== true) {
            bugs = passValid;
        }
    }
    else {
        if (!hasData(user.password)) {
            bugs.push('password');
        }
    }
    if (!hasData(user.login)) {
        bugs.push('login');
    }
    if (isAdmin === false) {
        if (!hasData(user.passwordOld)) {
            bugs.push('passwordOld');
        }
    }
    return bugs.length ? bugs : true;
}
exports.isPassChangeValid = isPassChangeValid;
function isPasswordValid(user) {
    const bugs = [];
    if (!hasData(user.password)) {
        bugs.push('password');
    }
    if (!hasData(user.passwordRepeat)) {
        bugs.push('paswordRepeat');
    }
    if (!isSame(user.password, user.passwordRepeat)) {
        bugs.push('paswordRepeat');
    }
    return bugs.length ? bugs : true;
}
exports.isPasswordValid = isPasswordValid;
function isCardValid(card, event) {
    const bugs = [];
    if (!(event && String(event._id) === card.eventId && event.dateFrom < card.created && event.dateTo > card.created)) {
        bugs.push('created');
    }
    if (!(card.awardedTo && card.awardedTo !== '')) {
        bugs.push('awardedTo');
    }
    if (!(card.eventId && card.eventId !== '')) {
        bugs.push('eventId');
    }
    if (!(card.text && card.text !== '')) {
        bugs.push('text');
    }
    if (!(card.type && E.CARD_TYPE[card.type])) {
        bugs.push('type');
    }
    return bugs.length ? bugs : true;
}
exports.isCardValid = isCardValid;
function isEventValid(event) {
    const bugs = [];
    let dates = 2;
    if (!hasData(event.dateFrom, 'number')) {
        dates--;
        bugs.push('dateFrom');
    }
    if (!hasData(event.dateTo, 'number')) {
        dates--;
        bugs.push('dateTo');
    }
    if (dates === 2) {
        if (Number(event.dateFrom) >= Number(event.dateTo)) {
            bugs.push('dateFrom');
            bugs.push('dateTo');
        }
    }
    if (!hasData(event.name)) {
        bugs.push('name');
    }
    if (!(event.state && E.EVENT_STATE[event.state])) {
        bugs.push('state');
    }
    if (!hasData(event.userId)) {
        bugs.push('userId');
    }
    return bugs.length ? bugs : true;
}
exports.isEventValid = isEventValid;
//# sourceMappingURL=validate.js.map