(window["webpackJsonpKudoz"] = window["webpackJsonpKudoz"] || []).push([["common"],{

/***/ 33:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const headers = { 'content-type': 'application/json' };
/**
 * Select record(s) from table
 *
 * select<I.User[]>('/api/users');
 * select<I.User>('/api/users', '123');
 * select<I.User>('/api/events', {state: 'active'});
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
        fetch(url, {
            method: 'GET'
        })
            .then((response) => resolved(response.json()))
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
        fetch(api, {
            body: JSON.stringify(data),
            headers,
            method: 'POST'
        })
            .then((response) => resolved(response.json()))
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
        fetch(`${api}/${id}`, {
            body: JSON.stringify(data),
            headers,
            method: 'PATCH'
        })
            .then((response) => resolved(response.json()))
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


/***/ }),

/***/ 49:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
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


/***/ })

}]);
//# sourceMappingURL=common.js.map