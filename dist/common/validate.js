"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isUserValid(user) {
    const bugs = [];
    if (!(user.name && user.name !== '')) {
        bugs.push('name');
    }
    if (!(user.surname && user.surname !== '')) {
        bugs.push('surname');
    }
    return bugs.length ? bugs : true;
}
exports.isUserValid = isUserValid;
function isCardValid(card) {
    const bugs = [];
    if (!(card.awardedTo && card.awardedTo !== '')) {
        bugs.push('awardedTo');
    }
    if (!(card.eventId && card.eventId !== '')) {
        bugs.push('eventId');
    }
    if (!(card.title && card.title !== '')) {
        bugs.push('title');
    }
    if (!(card.text && card.text !== '')) {
        bugs.push('text');
    }
    if (!(card.type && ['awesome', 'normal'].includes(card.type))) {
        bugs.push('type');
    }
    return bugs.length ? bugs : true;
}
exports.isCardValid = isCardValid;
function isEventValid(event) {
    const bugs = [];
    if (!(event.date && event.date !== '')) {
        bugs.push('date');
    }
    if (!(event.name && event.name !== '')) {
        bugs.push('name');
    }
    if (!(event.state && ['past', 'active', 'future'].includes(event.state))) {
        bugs.push('state');
    }
    return bugs.length ? bugs : true;
}
exports.isEventValid = isEventValid;
//# sourceMappingURL=validate.js.map