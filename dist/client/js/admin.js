(window["webpackJsonpKudoz"] = window["webpackJsonpKudoz"] || []).push([["admin"],{

/***/ 106:
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
const ReactDOM = __importStar(__webpack_require__(6));
const EventForm_1 = __importDefault(__webpack_require__(107));
const EventList_1 = __importDefault(__webpack_require__(110));
const UserForm_1 = __importDefault(__webpack_require__(111));
const UserList_1 = __importDefault(__webpack_require__(115));
ReactDOM.render(React.createElement("div", { className: "eventAdmin" },
    React.createElement("header", null,
        React.createElement("h1", null, "Event admin")),
    React.createElement(EventForm_1.default, null),
    React.createElement(UserForm_1.default, null),
    React.createElement(EventList_1.default, null),
    React.createElement(UserList_1.default, null)), document.getElementById('admin'));


/***/ }),

/***/ 107:
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
const react_1 = __importStar(__webpack_require__(1));
const api_1 = __webpack_require__(33);
const E = __importStar(__webpack_require__(50));
__webpack_require__(108);
class EventForm extends react_1.Component {
    constructor(props) {
        super(props);
        const now = new Date().getTime();
        this.newEvent = { dateFrom: now, dateTo: now + 1209600000, name: '', state: E.EVENT_STATE.future };
        this.state = {
            event: this.newEvent,
            mode: 'hidden'
        };
    }
    onClickHandler() {
        const data = {};
        const info = document.getElementById('form-event-info');
        const form = document.getElementById('form-event-form');
        const formData = new FormData(form);
        formData.forEach((item, key) => (data[key] = item));
        if (this.state.mode === 'insert') {
            api_1.insert('/api/events', data)
                .then(() => {
                info.innerText = 'Success: Event added.';
                document.dispatchEvent(new CustomEvent('kudoz::eventListRefresh'));
            })
                .catch((err) => {
                info.innerText = `Error: ${err.message}`;
            });
        }
        else {
            api_1.update('/api/events', this.state.event._id, data)
                .then(() => {
                info.innerText = 'Success: Event updated.';
                document.dispatchEvent(new CustomEvent('kudoz::eventListRefresh'));
            })
                .catch((err) => {
                info.innerText = `Error: ${err.message}`;
            });
        }
    }
    componentDidMount() {
        document.addEventListener('kudoz::eventFormRefresh', ((e) => {
            const info = document.getElementById('form-event-info');
            info.innerText = '';
            this.getData(e.detail._id);
        }));
    }
    getData(_id) {
        if (_id) {
            api_1.select('/api/events', _id).then((event) => this.setState({ event, mode: 'update' }));
        }
        else {
            this.setState({ event: this.newEvent, mode: 'insert' });
        }
    }
    close() {
        this.setState({ mode: 'hidden' });
    }
    render() {
        const { dateFrom, dateTo, name, state } = this.state.event;
        const button = `${this.state.mode === 'insert' ? 'Create' : 'Update'} event 📅`;
        const classHidden = this.state.mode === 'hidden' ? 'hidden' : '';
        return (react_1.default.createElement("div", { id: "form-event", key: "eventForm", className: classHidden },
            react_1.default.createElement("div", { className: "formEvent_header" },
                react_1.default.createElement("span", { className: "formEvent_header-text" }, "Event"),
                react_1.default.createElement("span", { className: "formEvent_header-close", onClick: this.close.bind(this) }, "x")),
            react_1.default.createElement("form", { id: "form-event-form", autoComplete: "off" },
                react_1.default.createElement("label", { htmlFor: "dateFrom" }, "Date from: "),
                react_1.default.createElement("input", { type: "text", id: "event-dateFrom", name: "dateFrom", defaultValue: dateFrom }),
                " *",
                react_1.default.createElement("br", null),
                react_1.default.createElement("label", { htmlFor: "dateTo" }, "Date to: "),
                react_1.default.createElement("input", { type: "text", id: "event-dateTo", name: "dateTo", defaultValue: dateTo }),
                " *",
                react_1.default.createElement("br", null),
                react_1.default.createElement("label", { htmlFor: "name" }, "Event name: "),
                react_1.default.createElement("input", { type: "text", id: "event-name", name: "name", placeholder: "event name", defaultValue: name }),
                " *",
                react_1.default.createElement("br", null),
                react_1.default.createElement("label", { htmlFor: "state" }, "State: "),
                react_1.default.createElement("select", { id: "event-state", name: "state", defaultValue: state },
                    react_1.default.createElement("option", { value: "past" }, "past"),
                    react_1.default.createElement("option", { value: "active" }, "active"),
                    react_1.default.createElement("option", { value: "future" }, "future")),
                "*",
                react_1.default.createElement("br", null),
                react_1.default.createElement("input", { type: "button", className: "button-primary", onClick: this.onClickHandler.bind(this), value: button }),
                react_1.default.createElement("div", { id: "form-event-info" }))));
    }
}
exports.default = EventForm;


/***/ }),

/***/ 108:
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(37);
            var content = __webpack_require__(109);

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

/***/ 109:
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(39);
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, "html {\n  --c-one: #4d677f;\n  --c-two: white;\n  --c-three: rgba(3, 2, 2, 0.25);\n  --c-border: #dbe1e4;\n}\n\n#form-event {\n  border: 1px solid var(--c-border);\n  background-color: var(--c-two);\n  width: 500px;\n  height: 325px;\n  box-shadow: 0px 4px 10px var(--c-three);\n  font-family: 'Ubuntu_Bold';\n  position: fixed;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  z-index: 10;\n}\n\n#form-event.hidden {\n  display: none;\n}\n\n#form-event .formEvent_header {\n  background-color: var(--c-one);\n  height: 26px;\n  line-height: 26px;\n}\n\n#form-event .formEvent_header .formEvent_header-text {\n  font-size: 16px;\n  margin-left: 10px;\n  color: var(--c-two);\n}\n\n#form-event .formEvent_header .formEvent_header-close {\n  display: block;\n  font-size: 16px;\n  margin-right: 4px;\n  background-color: var(--c-two);\n  color: var(--c-one);\n  border-radius: 50%;\n  width: 20px;\n  height: 20px;\n  float: right;\n  text-align: center;\n  line-height: 18px;\n  margin-top: 2px;\n  cursor: pointer;\n}\n\n#form-event form {\n  margin: 10px 20px;\n}\n\n#form-event label {\n  display: inline-block;\n  display: inline-block;\n  min-width: 120px;\n  text-align: right;\n  margin-right: 10px;\n  color: var(--c-one);\n}\n\n#form-event input,\n#form-event select {\n  min-width: 200px;\n}\n\n#form-event input[type='button'] {\n  position: relative;\n  margin: 0 58%;\n}\n", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ 110:
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
const react_1 = __importStar(__webpack_require__(1));
const api_1 = __webpack_require__(33);
class EventList extends react_1.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            loading: true
        };
    }
    componentDidMount() {
        this.getData();
        document.addEventListener('kudoz::eventListRefresh', () => {
            this.setState({ loading: true });
            this.getData();
        });
    }
    getData() {
        api_1.select('/api/events').then((data) => this.setState({ data, loading: false }));
    }
    onClickHandler(e) {
        var _a;
        const _id = (_a = e.currentTarget.dataset.id) !== null && _a !== void 0 ? _a : undefined;
        document.dispatchEvent(new CustomEvent('kudoz::eventFormRefresh', { detail: { _id } }));
    }
    render() {
        const { data, loading } = this.state;
        return (react_1.default.createElement("div", { key: "eventList" },
            react_1.default.createElement("input", { type: "button", "data-id": "", value: "new", onClick: this.onClickHandler.bind(this) }),
            react_1.default.createElement("table", null,
                react_1.default.createElement("caption", null, "Events"),
                react_1.default.createElement("thead", null,
                    react_1.default.createElement("tr", null,
                        react_1.default.createElement("th", null, "name"),
                        react_1.default.createElement("th", null, "dateFrom"),
                        react_1.default.createElement("th", null, "dateTo"),
                        react_1.default.createElement("th", null, "state"),
                        react_1.default.createElement("th", null, "action"))),
                react_1.default.createElement("tbody", null, loading ? this.loading() : this.eventRows(data)))));
    }
    eventCols(event) {
        const jsx = [];
        jsx.push(react_1.default.createElement("td", { key: "name" }, event.name));
        jsx.push(react_1.default.createElement("td", { key: "dateFrom" }, new Date(event.dateFrom).toLocaleString()));
        jsx.push(react_1.default.createElement("td", { key: "dateTo" }, new Date(event.dateTo).toLocaleString()));
        jsx.push(react_1.default.createElement("td", { key: "state" }, event.state));
        jsx.push(react_1.default.createElement("td", { key: "edit" },
            react_1.default.createElement("input", { type: "button", "data-id": event._id, value: "edit", onClick: this.onClickHandler.bind(this) })));
        return jsx;
    }
    eventRows(events) {
        const jsx = [];
        events.forEach((event) => {
            jsx.push(react_1.default.createElement("tr", { key: event._id }, this.eventCols(event)));
        });
        return jsx;
    }
    loading() {
        return (react_1.default.createElement("tr", null,
            react_1.default.createElement("td", { colSpan: 5 }, "Loading...")));
    }
}
exports.default = EventList;


/***/ }),

/***/ 111:
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
const react_1 = __importStar(__webpack_require__(1));
const V = __importStar(__webpack_require__(112));
const api_1 = __webpack_require__(33);
const client_1 = __webpack_require__(34);
const E = __importStar(__webpack_require__(50));
__webpack_require__(113);
class UserForm extends react_1.Component {
    constructor(props) {
        super(props);
        this.newUser = {
            login: '',
            name: '',
            password: '',
            passwordRepeat: '',
            role: E.USER_ROLE.user,
            surname: ''
        };
        this.state = {
            mode: E.FORM_MODE.hidden,
            user: this.newUser
        };
    }
    onClickHandler() {
        const rawData = this.newUser;
        const info = document.getElementById('form-user-info');
        const form = document.getElementById('form-user-form');
        const formData = new FormData(form);
        let data;
        formData.forEach((item, key) => {
            rawData[key] = item;
        });
        // validate passwords
        if (this.state.mode === E.FORM_MODE.insert) {
            const okPass = V.isPasswordValid(rawData);
            if (okPass === true) {
                const password = client_1.encodePassword(rawData.password);
                delete rawData.passwordRepeat;
                data = Object.assign(Object.assign({}, rawData), { password });
            }
            else {
                info.innerText = 'Error: Passwords does not match.';
                return;
            }
        }
        else {
            data = Object.assign({}, rawData);
        }
        // validate form
        const okUser = V.isUserValid(data);
        if (okUser !== true) {
            info.innerText = `Error: ${okUser.join(', ')}`;
            return;
        }
        this.setData(data);
    }
    componentDidMount() {
        document.addEventListener('kudoz::userFormRefresh', ((e) => {
            const info = document.getElementById('form-user-info');
            info.innerText = '';
            this.getData(e.detail._id);
        }));
    }
    getData(_id) {
        if (_id) {
            api_1.select('/api/users', _id).then((user) => this.setState({ user, mode: E.FORM_MODE.update }));
        }
        else {
            this.setState({ user: this.newUser, mode: E.FORM_MODE.insert });
        }
    }
    close() {
        this.setState({ mode: E.FORM_MODE.hidden });
    }
    render() {
        const { name, surname, login, password, role } = this.state.user;
        const button = `${this.state.mode === E.FORM_MODE.insert ? 'Create' : 'Update'} user 🙍‍♂️`;
        const classHidden = this.state.mode === E.FORM_MODE.hidden ? 'hidden' : '';
        return (react_1.default.createElement("div", { id: "form-user", key: "userForm", className: classHidden },
            react_1.default.createElement("div", { className: "formUser_header" },
                react_1.default.createElement("span", { className: "formUser_header-text" }, "User"),
                react_1.default.createElement("span", { className: "formUser_header-close", onClick: this.close.bind(this) }, "x")),
            react_1.default.createElement("form", { id: "form-user-form", autoComplete: "off" },
                react_1.default.createElement("label", { htmlFor: "name" }, "Name:"),
                react_1.default.createElement("input", { type: "text", id: "user-name", name: "name", defaultValue: name }),
                react_1.default.createElement("br", null),
                react_1.default.createElement("label", { htmlFor: "surname" }, "Surname:"),
                react_1.default.createElement("input", { type: "text", id: "user-surname", name: "surname", defaultValue: surname }),
                react_1.default.createElement("br", null),
                react_1.default.createElement("label", { htmlFor: "role" }, "Role: "),
                react_1.default.createElement("select", { id: "user-role", name: "role", defaultValue: role },
                    react_1.default.createElement("option", { value: "admin" }, "admin"),
                    react_1.default.createElement("option", { value: "user" }, "user")),
                "*",
                react_1.default.createElement("br", null),
                react_1.default.createElement("label", { htmlFor: "login" }, "Login: "),
                react_1.default.createElement("input", { type: "text", id: "user-login", name: "login", defaultValue: login }),
                " *",
                react_1.default.createElement("br", null),
                this.state.mode === E.FORM_MODE.insert ? (this.passRows()) : (react_1.default.createElement("input", { type: "hidden", id: "user-password", name: "password", defaultValue: password })),
                react_1.default.createElement("input", { type: "button", className: "button-primary", onClick: this.onClickHandler.bind(this), value: button }),
                react_1.default.createElement("div", { id: "form-user-info" }))));
    }
    passRows() {
        return (react_1.default.createElement("div", null,
            react_1.default.createElement("label", { htmlFor: "password" }, "Password: "),
            react_1.default.createElement("input", { type: "password", id: "user-password", autoComplete: "new-password", name: "password", placeholder: "enter password" }),
            ' ',
            "*",
            react_1.default.createElement("br", null),
            react_1.default.createElement("label", { htmlFor: "passwordRepeat" }, "Password repeat: "),
            react_1.default.createElement("input", { type: "password", id: "user-password-repeat", name: "passwordRepeat", placeholder: "repeat password" }),
            " *",
            react_1.default.createElement("br", null)));
    }
    setData(data) {
        const info = document.getElementById('form-user-info');
        if (this.state.mode === E.FORM_MODE.insert) {
            api_1.insert('/api/users', data)
                .then(() => {
                info.innerText = 'Success: User added.';
                document.dispatchEvent(new CustomEvent('kudoz::userListRefresh'));
            })
                .catch((err) => {
                info.innerText = `Error: ${err.message}`;
            });
        }
        else {
            api_1.update('/api/users', this.state.user._id, data)
                .then(() => {
                info.innerText = 'Success: User updated.';
                document.dispatchEvent(new CustomEvent('kudoz::userListRefresh'));
            })
                .catch((err) => {
                info.innerText = `Error: ${err.message}`;
            });
        }
    }
}
exports.default = UserForm;


/***/ }),

/***/ 112:
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
const E = __importStar(__webpack_require__(50));
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
function isUserValid(user) {
    const bugs = [];
    if (!hasData(user.name)) {
        bugs.push('name');
    }
    if (!hasData(user.surname)) {
        bugs.push('surname');
    }
    if (!hasData(user.login)) {
        bugs.push('login');
    }
    if (!hasData(user.password)) {
        bugs.push('password');
    }
    if (!(user.role && E.USER_ROLE[user.role])) {
        bugs.push('role');
    }
    return bugs.length ? bugs : true;
}
exports.isUserValid = isUserValid;
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
    if (!hasData(event.dateFrom, 'number')) {
        bugs.push('dateFrom');
    }
    if (!hasData(event.dateTo, 'number')) {
        bugs.push('dateTo');
    }
    if (!hasData(event.name)) {
        bugs.push('name');
    }
    if (!(event.state && E.EVENT_STATE[event.state])) {
        bugs.push('state');
    }
    return bugs.length ? bugs : true;
}
exports.isEventValid = isEventValid;


/***/ }),

/***/ 113:
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(37);
            var content = __webpack_require__(114);

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

/***/ 114:
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(39);
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, "html {\n  --c-one: #4d677f;\n  --c-two: white;\n  --c-three: rgba(3, 2, 2, 0.25);\n  --c-border: #dbe1e4;\n}\n\n#form-user {\n  border: 1px solid var(--c-border);\n  background-color: var(--c-two);\n  width: 500px;\n  height: 425px;\n  box-shadow: 0px 4px 10px var(--c-three);\n  font-family: 'Ubuntu_Bold';\n  position: fixed;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  z-index: 10;\n}\n\n#form-user.hidden {\n  display: none;\n}\n\n#form-user .formUser_header {\n  background-color: var(--c-one);\n  height: 26px;\n  line-height: 26px;\n}\n\n#form-user .formUser_header .formUser_header-text {\n  font-size: 16px;\n  margin-left: 10px;\n  color: var(--c-two);\n}\n\n#form-user .formUser_header .formUser_header-close {\n  display: block;\n  font-size: 16px;\n  margin-right: 4px;\n  background-color: var(--c-two);\n  color: var(--c-one);\n  border-radius: 50%;\n  width: 20px;\n  height: 20px;\n  float: right;\n  text-align: center;\n  line-height: 18px;\n  margin-top: 2px;\n  cursor: pointer;\n}\n\n#form-user form {\n  margin: 10px 20px;\n}\n\n#form-user label {\n  display: inline-block;\n  display: inline-block;\n  min-width: 120px;\n  text-align: right;\n  margin-right: 10px;\n  color: var(--c-one);\n}\n\n#form-user input,\n#form-user select {\n  min-width: 200px;\n}\n\n#form-user input[type='button'] {\n  position: relative;\n  margin: 0 58%;\n}\n", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ 115:
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
const react_1 = __importStar(__webpack_require__(1));
const api_1 = __webpack_require__(33);
class UserList extends react_1.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            loading: true
        };
    }
    componentDidMount() {
        this.getData();
        document.addEventListener('kudoz::userListRefresh', () => {
            this.setState({ loading: true });
            this.getData();
        });
    }
    getData() {
        api_1.select('/api/users').then((data) => this.setState({ data, loading: false }));
    }
    onClickHandler(e) {
        var _a;
        const _id = (_a = e.currentTarget.dataset.id) !== null && _a !== void 0 ? _a : undefined;
        document.dispatchEvent(new CustomEvent('kudoz::userFormRefresh', { detail: { _id } }));
    }
    render() {
        const { data, loading } = this.state;
        return (react_1.default.createElement("div", { key: "userList" },
            react_1.default.createElement("input", { type: "button", "data-id": "", value: "new", onClick: this.onClickHandler.bind(this) }),
            react_1.default.createElement("table", null,
                react_1.default.createElement("caption", null, "Users"),
                react_1.default.createElement("thead", null,
                    react_1.default.createElement("tr", null,
                        react_1.default.createElement("th", null, "id"),
                        react_1.default.createElement("th", null, "name"),
                        react_1.default.createElement("th", null, "surname"),
                        react_1.default.createElement("th", null, "login"),
                        react_1.default.createElement("th", null, "role"),
                        react_1.default.createElement("th", null, "action"))),
                react_1.default.createElement("tbody", null, loading ? this.loading() : this.userRows(data)))));
    }
    userCols(user) {
        const jsx = [];
        jsx.push(react_1.default.createElement("td", { key: "_id" }, user._id));
        jsx.push(react_1.default.createElement("td", { key: "name" }, user.name));
        jsx.push(react_1.default.createElement("td", { key: "surname" }, user.surname));
        jsx.push(react_1.default.createElement("td", { key: "login" }, user.login));
        jsx.push(react_1.default.createElement("td", { key: "role" }, user.role));
        jsx.push(react_1.default.createElement("td", { key: "edit" },
            react_1.default.createElement("input", { type: "button", "data-id": user._id, value: "edit", onClick: this.onClickHandler.bind(this) })));
        return jsx;
    }
    userRows(users) {
        const jsx = [];
        users.forEach((user) => {
            jsx.push(react_1.default.createElement("tr", { key: user._id }, this.userCols(user)));
        });
        return jsx;
    }
    loading() {
        return (react_1.default.createElement("tr", null,
            react_1.default.createElement("td", { colSpan: 5 }, "Loading...")));
    }
}
exports.default = UserList;


/***/ })

},[[106,"runtime","vendor","common"]]]);
//# sourceMappingURL=admin.js.map