(window["webpackJsonpKudoz"] = window["webpackJsonpKudoz"] || []).push([["main"],[
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = __importStar(__webpack_require__(1));
const ReactDOM = __importStar(__webpack_require__(6));
const Hello_1 = __webpack_require__(12);
const client_1 = __webpack_require__(18);
ReactDOM.render(React.createElement(Hello_1.Hello, { compiler: "TypeScript", framework: "React" }), document.getElementById('example'));
client_1.vodka();


/***/ }),
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = __importStar(__webpack_require__(1));
const Knight_1 = __webpack_require__(13);
// import HelloSvg from '../icons/3h.svg';
__webpack_require__(14);
exports.Hello = (props) => (React.createElement("h1", { className: "big" },
    "Hello from ",
    props.compiler,
    " and ",
    props.framework,
    "!",
    React.createElement(Knight_1.Knight, { mostKudos: "Janko Haluska" })));


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = __importStar(__webpack_require__(1));
exports.Knight = (props) => (React.createElement("div", { className: "kudoKnight" },
    React.createElement("div", null,
        React.createElement("img", { src: "img/007-crusader.png" })),
    React.createElement("div", { className: "kudoKnight__content" },
        React.createElement("h3", null, "Kudo Knight"),
        React.createElement("h2", null, props.mostKudos))));


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(15);
            var content = __webpack_require__(16);

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.i, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);

var exported = content.locals ? content.locals : {};



module.exports = exported;

/***/ }),
/* 15 */,
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(17);
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, ".big {\n  font-size: 18px;\n  color: blue;\n}\n\n.big svg {\n  height: 18px;\n  fill: blue;\n}\n", ""]);
// Exports
module.exports = exports;


/***/ }),
/* 17 */,
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const validate_1 = __webpack_require__(19);
const api_1 = __webpack_require__(20);
const form = document.getElementById('form-user');
const loading = document.querySelector('.loading');
const API_URL = '/api/users';
const usersElement = document.querySelector('.allUsers');
function vodka() {
    loading.style.display = 'none';
    listAllUsers();
    form.addEventListener('submit', (event) => {
        var _a, _b;
        const formData = new FormData(form);
        const name = ((_a = formData.get('name')) === null || _a === void 0 ? void 0 : _a.toString()) || '';
        const surname = ((_b = formData.get('surname')) === null || _b === void 0 ? void 0 : _b.toString()) || '';
        const user = {
            name,
            surname
        };
        if (!validate_1.isUserValid(user)) {
            return false;
        }
        console.log('user', user);
        form.style.display = 'none';
        loading.style.display = '';
        api_1.insert('/api/users', user)
            .then((createdUser) => {
            form.style.display = '';
            loading.style.display = 'none';
            form.reset();
            listAllUsers();
            console.log(createdUser);
        })
            .catch((err) => {
            console.error(`💥 Error: ${err.message}`);
        });
        event.preventDefault();
    });
    function listAllUsers() {
        api_1.select('/api/users')
            .then((users) => {
            usersElement.textContent = '';
            users.reverse();
            users.forEach((user) => {
                const div = document.createElement('div');
                const header = document.createElement('h4');
                const surname = document.createElement('p');
                const created = document.createElement('small');
                header.textContent = user.name;
                surname.textContent = user.surname;
                created.textContent = new Date(user.created).toString();
                div.appendChild(header);
                div.appendChild(surname);
                div.appendChild(created);
                usersElement.appendChild(div);
            });
        })
            .catch((err) => {
            console.error(`💥 Error: ${err.message}`);
        });
    }
}
exports.vodka = vodka;


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

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


/***/ }),
/* 20 */
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


/***/ })
],[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map