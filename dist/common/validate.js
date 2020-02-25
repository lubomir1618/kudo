"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isUserValid(user) {
    return user.name && user.name !== '' && user.surname && user.surname !== '';
}
exports.isUserValid = isUserValid;
//# sourceMappingURL=validate.js.map