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
const client_1 = __webpack_require__(21);
__webpack_require__(24);
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = __importStar(__webpack_require__(1));
const Knight_1 = __webpack_require__(13);
const _3h_svg_1 = __importDefault(__webpack_require__(18));
__webpack_require__(19);
exports.Hello = (props) => (React.createElement("h1", { className: "big" },
    React.createElement(_3h_svg_1.default, null),
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
__webpack_require__(14);
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
exports.push([module.i, ".kudoKnight {\n    font-family: 'Ubuntu', Arial, Helvetica, sans-serif;\n    background: linear-gradient(180deg, #FFFFFF 0%, rgba(255, 255, 255, 0) 100%), #C6D8D3;\n    display: flex;\n    position: relative;\n    box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);\n    border-radius: 10px;\n}\n.kudoKnight__content {\n    margin-left: 110px;\n}\n.kudoKnight h3 {\n    margin-top: 20px;\n    font-size: 9px;\n    color: #6D686D;\n}\n\n.kudoKnight h2 {\n    font-size: 18px;\n    color: #331832;\n    margin-top: -5px;\n}\n.kudoKnight img {\n    position: absolute;\n    height: 120%;\n    bottom: 0;\n}", ""]);
// Exports
module.exports = exports;


/***/ }),
/* 17 */,
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}


/* harmony default export */ __webpack_exports__["default"] = (({
  styles = {},
  ...props
}) => react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("svg", _extends({
  viewBox: "0 0 16 16",
  xmlns: "http://www.w3.org/2000/svg",
  stroke: "#000",
  fillRule: "evenodd",
  clipRule: "evenodd",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  strokeMiterlimit: "1.5"
}, props), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("path", {
  d: "M8.047 1.004l-.054 7.034 7.001.007c-.334-4.33-2.67-6.655-6.947-7.041z",
  stroke: "none"
}), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("circle", {
  cx: "8.987",
  cy: "8.744",
  r: "6.689",
  fill: "none",
  strokeWidth: ".96",
  transform: "translate(-1.404 -1.15) scale(1.04645)"
})));

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(15);
            var content = __webpack_require__(20);

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
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(17);
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, ".big {\n  font-size: 26px;\n  font-family: 'Roboto_Bold';\n  color: blue;\n}\n\n.big svg {\n  height: 26px;\n  fill: blue;\n}\n", ""]);
// Exports
module.exports = exports;


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const validate_1 = __webpack_require__(22);
const api_1 = __webpack_require__(23);
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
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
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
function isLikeValid(_id) {
    return hasData(_id) ? true : ['_id'];
}
exports.isLikeValid = isLikeValid;
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
    if (!hasData(event.dateFrom, 'number')) {
        bugs.push('dateFrom');
    }
    if (!hasData(event.dateTo, 'number')) {
        bugs.push('dateTo');
    }
    if (!hasData(event.name)) {
        bugs.push('name');
    }
    if (!hasOneOf(event.state, ['past', 'active', 'future'])) {
        bugs.push('state');
    }
    return bugs.length ? bugs : true;
}
exports.isEventValid = isEventValid;


/***/ }),
/* 23 */
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
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(15);
            var content = __webpack_require__(25);

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
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(17);
var ___CSS_LOADER_AT_RULE_IMPORT_0___ = __webpack_require__(26);
exports = ___CSS_LOADER_API_IMPORT___(false);
exports.i(___CSS_LOADER_AT_RULE_IMPORT_0___);
// Module
exports.push([module.i, "\n", ""]);
// Exports
module.exports = exports;


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(17);
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, "body {\n  background: red;\n}\n\n/* Box sizing rules */\n*,\n*::before,\n*::after {\n  box-sizing: border-box;\n}\n\n/* Remove default padding */\nul[class],\nol[class] {\n  padding: 0;\n}\n\n/* Remove default margin */\nbody,\nh1,\nh2,\nh3,\nh4,\np,\nul[class],\nol[class],\nli,\nfigure,\nfigcaption,\nblockquote,\ndl,\ndd {\n  margin: 0;\n}\n\n/* Set core body defaults */\nbody {\n  min-height: 100vh;\n  scroll-behavior: smooth;\n  text-rendering: optimizeSpeed;\n  line-height: 1.5;\n}\n\n/* Remove list styles on ul, ol elements with a class attribute */\nul[class],\nol[class] {\n  list-style: none;\n}\n\n/* A elements that don't have a class get default styles */\na:not([class]) {\n  text-decoration-skip-ink: auto;\n}\n\n/* Make images easier to work with */\nimg {\n  max-width: 100%;\n  display: block;\n}\n\n/* Inherit fonts for inputs and buttons */\ninput,\nbutton,\ntextarea,\nselect {\n  font: inherit;\n}\n", ""]);
// Exports
module.exports = exports;


/***/ })
],[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map