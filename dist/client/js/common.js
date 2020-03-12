(window["webpackJsonpKudoz"] = window["webpackJsonpKudoz"] || []).push([["common"],{

/***/ 124:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 127:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 208:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {
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

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(37)))

/***/ }),

/***/ 33:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const headers = { 'content-type': 'application/json' };
/**
 * Select record(s) from table
 *
 * select<I.User[]>('/api/users');
 * select<I.User[]>('/api/users', '123');
 * select<I.User[]>('/api/events', {state: 'active'});
 * is equivalent of sql
 * SELECT * FROM users;
 * SELECT * FROM users WHERE _id='123';
 * SELECT * FROM events WHERE state='active';
 */
function select(api, id) {
    let url = api;
    if (id) {
        if (typeof id === 'string') {
            url = `${api}/${id}`;
        }
        else {
            const [key, val] = Object.entries(id)[0];
            url = encodeURI(`${api}/where?${key}=${val}`);
        }
    }
    return new Promise((resolved, rejected) => {
        let wasError = false;
        fetch(url, {
            method: 'GET'
        })
            .then((response) => {
            if (!response.ok) {
                wasError = true;
            }
            return response.json();
        })
            .then((response) => {
            if (wasError) {
                rejected(response);
            }
            else {
                resolved(response);
            }
        })
            .catch((err) => rejected(err));
    });
}
exports.select = select;
/**
 * Insert record into table
 *
 * insert<I.User>('/api/users', { name: 'Jon', surname: 'Snow'});
 * is equivalent of sql
 * INSERT INTO users (name, surname) VALUES ('Jon', 'Snow');
 */
function insert(api, data) {
    return new Promise((resolved, rejected) => {
        let wasError = false;
        fetch(api, {
            body: JSON.stringify(data),
            headers,
            method: 'POST'
        })
            .then((response) => {
            if (!response.ok) {
                wasError = true;
            }
            return response.json();
        })
            .then((response) => {
            if (wasError) {
                rejected(response);
            }
            else {
                resolved(response);
            }
        })
            .catch((err) => rejected(err));
    });
}
exports.insert = insert;
/**
 * Update record in table
 *
 * update<I.User>('/api/users', '123', { name: 'Jon', surname: 'Snow'});
 * is equivalent of sql
 * UPDATE users SET name='Jon', surname='Snow' WHERE _id=123;
 */
function update(api, id, data) {
    return new Promise((resolved, rejected) => {
        let wasError = false;
        fetch(`${api}/${id}`, {
            body: JSON.stringify(data),
            headers,
            method: 'PATCH'
        })
            .then((response) => {
            if (!response.ok) {
                wasError = true;
            }
            return response.json();
        })
            .then((response) => {
            if (wasError) {
                rejected(response);
            }
            else {
                resolved(response);
            }
        })
            .catch((err) => rejected(err));
    });
}
exports.update = update;
/**
 * Remove record from table
 *
 * remove('/api/users', '123');
 * is equivalent of sql
 * DELETE FROM users WHERE _id=123;
 */
function remove(api, id) {
    return new Promise((resolved, rejected) => {
        fetch(`${api}/${id}`, {
            headers,
            method: 'DELETE'
        })
            .then(() => resolved(true))
            .catch((err) => rejected(err));
    });
}
exports.remove = remove;
/**
 * Incerease likes of card
 */
function like(_id) {
    return new Promise((resolved, rejected) => {
        fetch('/api/like', {
            body: JSON.stringify({ _id }),
            headers,
            method: 'POST'
        })
            .then((response) => response.json())
            .then((data) => resolved(data.likes))
            .catch((err) => rejected(err));
    });
}
exports.like = like;
/**
 * POST login & pass and get authentication result
 */
function auth(data) {
    return new Promise((resolved, rejected) => {
        fetch('/api/auth', {
            body: JSON.stringify(data),
            headers,
            method: 'POST'
        })
            .then((response) => {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            return response;
        })
            .then((response) => resolved(response.json()))
            .catch((err) => rejected(err));
    });
}
exports.auth = auth;
/**
 * Logout active session
 */
function logout() {
    return new Promise((resolved, rejected) => {
        fetch('/api/auth/logout', {
            headers,
            method: 'DELETE'
        })
            .then(() => resolved(true))
            .catch((err) => rejected(err));
    });
}
exports.logout = logout;


/***/ }),

/***/ 34:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = __importDefault(__webpack_require__(35));
function getKudoNumberList(cards) {
    const list = cards.reduce((acc, val) => {
        if (acc[val.awardedTo]) {
            acc[val.awardedTo].count += 1;
        }
        else {
            acc[val.awardedTo] = { name: val.awardedTo, count: 1 };
        }
        return acc;
    }, {});
    return Object.values(list).sort((a, b) => (a.count > b.count ? -1 : 1));
}
exports.getKudoNumberList = getKudoNumberList;
function getKudoKnight(kudoNumList) {
    const winner = kudoNumList.shift();
    if (winner) {
        return winner.name;
    }
    return 'No knight yet';
}
exports.getKudoKnight = getKudoKnight;
function soundTurnedOn() {
    const data = localStorage.getItem('kudosSettings');
    if (data) {
        const soundSetting = JSON.parse(data);
        if (soundSetting && soundSetting.sound === 'on') {
            return true;
        }
    }
    return false;
}
exports.soundTurnedOn = soundTurnedOn;
function encodePassword(pass, salt) {
    const mySalt = salt || bcryptjs_1.default.genSaltSync(10);
    const hash = bcryptjs_1.default.hashSync(pass, mySalt);
    return hash;
}
exports.encodePassword = encodePassword;
function getCookie(cname) {
    const name = `${cname}=`;
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');
    // tslint:disable:prefer-for-of
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return false;
}
exports.getCookie = getCookie;


/***/ }),

/***/ 58:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 60:
/***/ (function(module, exports) {

/* (ignored) */

/***/ })

}]);
//# sourceMappingURL=common.js.map