(window["webpackJsonpKudoz"] = window["webpackJsonpKudoz"] || []).push([["admin"],{

/***/ 287:
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
const Admin_1 = __importDefault(__webpack_require__(288));
ReactDOM.render(React.createElement(Admin_1.default, null), document.getElementById('admin'));


/***/ }),

/***/ 288:
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
const react_1 = __importStar(__webpack_require__(1));
const E = __importStar(__webpack_require__(234));
const client_1 = __webpack_require__(34);
const api_1 = __webpack_require__(33);
const EventForm_1 = __importDefault(__webpack_require__(289));
const EventList_1 = __importDefault(__webpack_require__(344));
const NameList_1 = __importDefault(__webpack_require__(345));
const LoginForm_1 = __importDefault(__webpack_require__(346));
const PasswordForm_1 = __importDefault(__webpack_require__(347));
const UserForm_1 = __importDefault(__webpack_require__(348));
const UserList_1 = __importDefault(__webpack_require__(349));
class Admin extends react_1.Component {
    constructor(props) {
        super(props);
        this.sessionCheckIntervalID = 0;
        const role = client_1.getCookie('connect.role');
        const userId = client_1.getCookie('connect.userId') || '';
        this.state =
            role === false
                ? { authenticated: false, role: E.USER_ROLE.none, userId }
                : { authenticated: true, role: role, userId };
        this.bind = {
            onAuthenticated: this.onAuthenticated.bind(this),
            onLogoutHandler: this.onLogoutHandler.bind(this),
            onPasswordHandler: this.onPasswordHandler.bind(this),
            onTabsHandler: this.onTabsHandler.bind(this)
        };
    }
    componentDidMount() {
        document.addEventListener('kudoz::authenticated', this.bind.onAuthenticated);
    }
    componentWillUnmount() {
        document.removeEventListener('kudoz::userFormRefresh', this.bind.onAuthenticated);
        window.clearInterval(this.sessionCheckIntervalID);
    }
    componentDidUpdate() {
        const pane = document.getElementById('events_list');
        if (pane) {
            pane.style.display = 'block';
        }
    }
    render() {
        return (react_1.default.createElement("div", { className: "admin", key: "admin" }, this.state.authenticated ? this.renderAdmin() : react_1.default.createElement(LoginForm_1.default, null)));
    }
    renderAdmin() {
        const jsx = [];
        const isUser = this.state.role === E.USER_ROLE.user || this.state.role === E.USER_ROLE.admin;
        const isAdmin = this.state.role === E.USER_ROLE.admin;
        jsx.push(react_1.default.createElement("div", { className: "admin_buttons", key: "adminButtons" },
            react_1.default.createElement("button", { id: "admin-logout", className: "gen_button", key: "logoutButton", onClick: this.bind.onLogoutHandler },
                react_1.default.createElement("span", { className: "icon-power-off" }),
                " Sign out"),
            react_1.default.createElement("button", { id: "admin-password", className: "gen_button", key: "passwordButton", onClick: this.bind.onPasswordHandler },
                react_1.default.createElement("span", { className: "icon-key" }),
                " Change pass")));
        jsx.push(react_1.default.createElement("section", { className: "admin_forms", key: "adminForms" },
            react_1.default.createElement(PasswordForm_1.default, { key: "passwordForm", role: this.state.role }),
            isUser && react_1.default.createElement(EventForm_1.default, { key: "eventForm", userId: this.state.userId }),
            isAdmin && react_1.default.createElement(UserForm_1.default, { key: "userForm" })));
        jsx.push(react_1.default.createElement("main", { key: "adminMain" },
            react_1.default.createElement("header", null,
                react_1.default.createElement("h2", null, "Admin"),
                react_1.default.createElement("nav", null,
                    react_1.default.createElement("ul", { id: "tabs", className: "tabrow" },
                        isUser && (react_1.default.createElement("li", { className: "selected", "data-pane": "events_list", onClick: this.bind.onTabsHandler },
                            react_1.default.createElement("span", { className: "icon-calendar" }),
                            " Events")),
                        isUser && (react_1.default.createElement("li", { "data-pane": "name_list", onClick: this.bind.onTabsHandler },
                            react_1.default.createElement("span", { className: "icon-group" }),
                            " Name List")),
                        isAdmin && (react_1.default.createElement("li", { "data-pane": "users_list", onClick: this.bind.onTabsHandler },
                            react_1.default.createElement("span", { className: "icon-user" }),
                            " User Management"))))),
            react_1.default.createElement("article", null,
                isUser && react_1.default.createElement(EventList_1.default, { key: "eventsList", userId: this.state.userId, role: this.state.role }),
                isUser && react_1.default.createElement(NameList_1.default, { key: "nameList", userId: this.state.userId, role: this.state.role }),
                isAdmin && react_1.default.createElement(UserList_1.default, { key: "usersList" }))));
        return jsx;
    }
    sessionCheck() {
        this.sessionCheckIntervalID = window.setInterval(() => {
            const cookie = client_1.getCookie('connect.sid');
            if (cookie === false) {
                window.clearInterval(this.sessionCheckIntervalID);
                this.setState({ authenticated: false, role: E.USER_ROLE.none });
            }
        }, 60000); // check for validity every 1 minute (env file has max_cookie_age)
    }
    onLogoutHandler() {
        api_1.logout().then(() => {
            this.setState({
                authenticated: false,
                role: E.USER_ROLE.none,
                userId: ''
            });
        });
    }
    onTabsHandler(e) {
        const tabEl = e.currentTarget;
        const pane = document.getElementById(tabEl.dataset.pane);
        if (pane) {
            for (const el of document.querySelectorAll('.pane')) {
                el.style.display = 'none';
            }
            pane.style.display = 'block';
            for (const el of document.querySelectorAll('li')) {
                el.classList.remove('selected');
            }
            tabEl.classList.add('selected');
        }
    }
    onPasswordHandler() {
        document.dispatchEvent(new CustomEvent('kudoz::passwordFormRefresh'));
    }
    onAuthenticated(e) {
        this.setState({
            authenticated: true,
            role: e.detail.role,
            userId: e.detail.userId
        });
        this.sessionCheck();
    }
}
exports.default = Admin;


/***/ }),

/***/ 289:
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
const react_1 = __importStar(__webpack_require__(1));
const react_date_picker_1 = __importDefault(__webpack_require__(290));
const api_1 = __webpack_require__(33);
const E = __importStar(__webpack_require__(234));
const V = __importStar(__webpack_require__(343));
class EventForm extends react_1.Component {
    constructor(props) {
        super(props);
        const now = new Date().getTime();
        this.newEvent = {
            dateFrom: now,
            dateTo: now + 1209600000,
            name: '',
            state: E.EVENT_STATE.future,
            userId: props.userId
        };
        this.state = {
            event: Object.assign({}, this.newEvent),
            mode: 'hidden',
            userId: props.userId
        };
        this.bind = {
            onClickHandler: this.onClickHandler.bind(this),
            onClose: this.onClose.bind(this),
            onDateFrom: this.onDateFrom.bind(this),
            onDateTo: this.onDateTo.bind(this),
            onFormRefresh: this.onFormRefresh.bind(this)
        };
    }
    componentDidMount() {
        document.addEventListener('kudoz::eventFormRefresh', this.bind.onFormRefresh);
    }
    componentWillUnmount() {
        document.removeEventListener('kudoz::eventFormRefresh', this.bind.onFormRefresh);
    }
    render() {
        const { dateFrom, dateTo, name, state, userId } = this.state.event;
        const button = `${this.state.mode === 'insert' ? 'Create' : 'Update'} event`;
        const classHidden = this.state.mode === 'hidden' ? ' hidden' : '';
        return (react_1.default.createElement("div", { id: "form-event", key: "eventForm", className: `form-window${classHidden}` },
            react_1.default.createElement("div", { className: "form-window_header" },
                react_1.default.createElement("span", { className: "form-window_header-text" }, "Event"),
                react_1.default.createElement("span", { className: "form-window_header-close icon-remove-sign", onClick: this.bind.onClose })),
            react_1.default.createElement("form", { id: "form-event-form", className: "pane_form", autoComplete: "off", onSubmit: this.bind.onClickHandler },
                react_1.default.createElement("input", { type: "hidden", name: "userId", defaultValue: userId }),
                react_1.default.createElement("div", { className: "form_row" },
                    react_1.default.createElement("label", { htmlFor: "dateFrom" }, "Date from: "),
                    react_1.default.createElement(react_date_picker_1.default, { onChange: this.bind.onDateFrom, value: new Date(dateFrom), clearIcon: null }),
                    react_1.default.createElement("input", { type: "hidden", name: "dateFrom", defaultValue: dateFrom }),
                    " *"),
                react_1.default.createElement("div", { className: "form_row" },
                    react_1.default.createElement("label", { htmlFor: "dateTo" }, "Date to: "),
                    react_1.default.createElement(react_date_picker_1.default, { onChange: this.bind.onDateTo, value: new Date(dateTo), clearIcon: null }),
                    react_1.default.createElement("input", { type: "hidden", name: "dateTo", defaultValue: dateTo }),
                    " *"),
                react_1.default.createElement("div", { className: "form_row" },
                    react_1.default.createElement("label", { htmlFor: "name" }, "Event name: "),
                    react_1.default.createElement("input", { type: "text", name: "name", placeholder: "event name", defaultValue: name }),
                    " *"),
                react_1.default.createElement("div", { className: "form_row", style: { display: 'none' } },
                    react_1.default.createElement("label", { htmlFor: "state" }, "State: "),
                    react_1.default.createElement("select", { id: "event-state", name: "state", defaultValue: state },
                        react_1.default.createElement("option", { value: "past" }, "past"),
                        react_1.default.createElement("option", { value: "active" }, "active"),
                        react_1.default.createElement("option", { value: "future" }, "future")),
                    "*"),
                react_1.default.createElement("div", { className: "form_row -right" },
                    react_1.default.createElement("button", { className: "gen_button", onClick: this.bind.onClickHandler },
                        react_1.default.createElement("span", { className: "icon-calendar" }),
                        button))),
            react_1.default.createElement("div", { id: "form-event-info", className: "form-window_footer" }, "\u00A0")));
    }
    getData(_id) {
        if (_id) {
            api_1.select('/api/events', _id).then((data) => {
                const event = data[0];
                this.setState({ event, mode: E.FORM_MODE.update });
            });
        }
        else {
            this.setState({ event: Object.assign({}, this.newEvent), mode: 'insert' });
        }
    }
    onDateFrom(date) {
        const myDate = Array.isArray(date) ? date[0] : date;
        const event = this.state.event;
        event.dateFrom = myDate.getTime();
        this.setState({ event });
    }
    onDateTo(date) {
        const myDate = Array.isArray(date) ? date[0] : date;
        const event = this.state.event;
        event.dateTo = myDate.getTime();
        this.setState({ event });
    }
    onClickHandler(e) {
        e.preventDefault();
        const data = Object.assign({}, this.newEvent);
        const info = document.getElementById('form-event-info');
        const form = document.getElementById('form-event-form');
        const formData = new FormData(form);
        formData.forEach((item, key) => {
            data[key] = item;
        });
        const okEvent = V.isEventValid(data);
        if (okEvent === true) {
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
        else {
            info.innerText = `Error: ${okEvent.join(', ')}`;
        }
    }
    onClose() {
        const form = document.getElementById('form-event-form');
        form.reset();
        this.setState({ mode: 'hidden' });
    }
    onFormRefresh(e) {
        const info = document.getElementById('form-event-info');
        info.innerText = ' ';
        this.getData(e.detail._id);
    }
}
exports.default = EventForm;


/***/ }),

/***/ 343:
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
const E = __importStar(__webpack_require__(234));
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


/***/ }),

/***/ 344:
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
const E = __importStar(__webpack_require__(234));
class EventList extends react_1.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            loading: true,
            role: props.role,
            userId: props.userId
        };
        this.bind = {
            onClickHandler: this.onClickHandler.bind(this),
            onListRefresh: this.onListRefresh.bind(this)
        };
    }
    componentDidMount() {
        this.getData();
        document.addEventListener('kudoz::eventListRefresh', this.bind.onListRefresh);
    }
    componentWillUnmount() {
        document.removeEventListener('kudoz::eventListRefresh', this.bind.onListRefresh);
    }
    render() {
        const { data, loading } = this.state;
        return (react_1.default.createElement("section", { id: "events_list", className: "pane", key: "eventList" },
            react_1.default.createElement("h4", null,
                "Events",
                react_1.default.createElement("span", { className: "button" },
                    react_1.default.createElement("button", { className: "gen_button", "data-id": "", onClick: this.bind.onClickHandler },
                        react_1.default.createElement("span", { className: "icon-plus" }),
                        " New event"))),
            react_1.default.createElement("table", { className: "admin-table" },
                react_1.default.createElement("thead", null,
                    react_1.default.createElement("tr", null,
                        react_1.default.createElement("th", null, "id"),
                        react_1.default.createElement("th", null, "name"),
                        react_1.default.createElement("th", null, "dateFrom"),
                        react_1.default.createElement("th", null, "dateTo"),
                        react_1.default.createElement("th", null, "state"),
                        react_1.default.createElement("th", null, "action"))),
                react_1.default.createElement("tbody", null, loading ? this.loading() : this.eventRows(data)))));
    }
    eventCols(event) {
        const jsx = [];
        jsx.push(react_1.default.createElement("td", { key: "_id" },
            " ",
            react_1.default.createElement("a", { href: `${window.origin}/event/${event._id}`, target: "_blank", rel: "noopener noreferrer", title: "link to event" }, event._id)));
        jsx.push(react_1.default.createElement("td", { key: "name" },
            react_1.default.createElement("a", { href: `${window.origin}/event/${event._id}`, target: "_blank", rel: "noopener noreferrer", title: "link to event" }, event.name)));
        jsx.push(react_1.default.createElement("td", { key: "dateFrom" }, new Date(event.dateFrom).toLocaleString()));
        jsx.push(react_1.default.createElement("td", { key: "dateTo" }, new Date(event.dateTo).toLocaleString()));
        jsx.push(react_1.default.createElement("td", { key: "state" }, this.getEventStatus(event)));
        jsx.push(react_1.default.createElement("td", { key: "edit" },
            react_1.default.createElement("button", { className: "gen_button", "data-id": event._id, onClick: this.bind.onClickHandler },
                react_1.default.createElement("span", { className: "icon-pencil" }),
                " Edit")));
        return jsx;
    }
    eventRows(events) {
        const jsx = [];
        events.forEach((event) => {
            jsx.push(react_1.default.createElement("tr", { key: event._id, className: this.getEventStatus(event) }, this.eventCols(event)));
        });
        return jsx;
    }
    getEventStatus(event) {
        return (event.dateFrom > Date.now()
            ? E.EVENT_STATE.future
            : event.dateTo > Date.now()
                ? E.EVENT_STATE.active
                : E.EVENT_STATE.past);
    }
    loading() {
        return (react_1.default.createElement("tr", null,
            react_1.default.createElement("td", { colSpan: 5 }, "Loading...")));
    }
    getData() {
        const where = this.state.role === E.USER_ROLE.admin ? undefined : { userId: this.state.userId };
        api_1.select('/api/events', where).then((data) => {
            data.sort((a, b) => {
                if (a === b) {
                    return 0;
                }
                return a.dateFrom < b.dateFrom ? 1 : -1;
            });
            this.setState({ data, loading: false });
        });
    }
    onClickHandler(e) {
        var _a;
        const _id = (_a = e.currentTarget.dataset.id) !== null && _a !== void 0 ? _a : undefined;
        document.dispatchEvent(new CustomEvent('kudoz::eventFormRefresh', { detail: { _id } }));
    }
    onListRefresh() {
        this.setState({ loading: true });
        this.getData();
    }
}
exports.default = EventList;


/***/ }),

/***/ 345:
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
class NameList extends react_1.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            namesData: '',
            loading: true,
            role: props.role,
            userId: props.userId,
            mode: 'update'
        };
        this.bind = {
            onClickHandler: this.onClickHandler.bind(this),
            onListRefresh: this.onListRefresh.bind(this),
            onNameListChange: this.onNameListChange.bind(this)
        };
    }
    onNameListChange(e) {
        this.setState({ namesData: e.target.value });
    }
    componentDidMount() {
        this.getData();
        document.addEventListener('kudoz::eventListRefresh', this.bind.onListRefresh);
    }
    render() {
        const { data, loading, namesData } = this.state;
        const disabled = !namesData.length;
        return (react_1.default.createElement("section", { id: "name_list", className: "pane", key: "nameList" },
            react_1.default.createElement("h4", null, "Name list"),
            react_1.default.createElement("div", { className: "namelist_basicInfo" },
                react_1.default.createElement("p", null, "This is name list of people users can choose to give \"card\", which appears in each of yours events. Updates to this name list applies to all your past, active and future events. - one namelist to rule them all :D "),
                react_1.default.createElement("p", null,
                    " Each Name you provide needs to be separated by a comma character ",
                    react_1.default.createElement("span", { className: "namelist_highlight" }, ","),
                    "Make sure this list is not empty."),
                react_1.default.createElement("p", null,
                    "Example: ",
                    react_1.default.createElement("span", { className: "namelist_highlight" }, "Herkules, Janko Hra\u0161ko, L\u00ED\u0161ka Eli\u0161ka, Pinnochio"))),
            loading ? this.loading() : (react_1.default.createElement("div", { style: { margin: '0 auto', width: '80%' } },
                react_1.default.createElement("form", { className: "pane_form", id: "form-namelist-form", onSubmit: this.bind.onClickHandler },
                    react_1.default.createElement("textarea", { onChange: this.bind.onNameListChange, style: { width: '100%', height: '200px', display: 'block' }, defaultValue: namesData }),
                    react_1.default.createElement("button", { className: `gen_button disabled_${disabled}`, disabled: disabled, onClick: this.bind.onClickHandler }, `${this.state.mode} Name List`)),
                react_1.default.createElement("div", { className: "pane_form", id: "form-namelist-info" })))));
    }
    loading() {
        return (react_1.default.createElement("div", null,
            react_1.default.createElement("p", null, "Loading...")));
    }
    getData() {
        const where = { userId: this.state.userId };
        api_1.select('/api/namelist', where).then((data) => {
            const mode = !data || data.length === 0 ? 'insert' : 'update';
            const namesData = mode === 'insert' ? '' : data[0].names;
            this.setState({ mode, namesData, data, loading: false });
        });
    }
    onClickHandler(e) {
        e.preventDefault();
        const info = document.getElementById('form-namelist-info');
        const data = { names: this.state.namesData.trim().replace(/,$/, ""), userId: this.state.userId };
        const count = data.names.split(',').length;
        if (data.names.length === 0) {
            info.innerText = 'Please fill the name list.';
            return;
        }
        if (this.state.mode === 'insert') {
            api_1.insert('/api/namelist', data)
                .then((created) => {
                info.innerText = `Name list created. Names counted: ${count}`;
                this.setState({ mode: 'update', data: [created] });
            })
                .catch((err) => {
                info.innerText = `Error: ${err.message}`;
            });
        }
        else {
            api_1.update('/api/namelist', this.state.data[0]._id, data)
                .then(() => {
                info.innerText = `Name list updated. New count of names: ${count}`;
            })
                .catch((err) => {
                info.innerText = `Error: ${err.message}`;
            });
        }
    }
    onListRefresh() {
        this.setState({ loading: true });
        this.getData();
    }
}
exports.default = NameList;


/***/ }),

/***/ 346:
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
const V = __importStar(__webpack_require__(343));
const E = __importStar(__webpack_require__(234));
const api_1 = __webpack_require__(33);
const client_1 = __webpack_require__(34);
class LoginForm extends react_1.Component {
    constructor(props) {
        super(props);
        this.bind = {
            onLoginHandler: this.onLoginHandler.bind(this)
        };
    }
    render() {
        return (react_1.default.createElement("div", { id: "form-login", key: "loginForm", className: "form-window" },
            react_1.default.createElement("div", { className: "form-window_header" },
                react_1.default.createElement("span", { className: "form-window_header-text" }, "Sign in"),
                react_1.default.createElement("span", { className: "form-window_header-close icon-remove-sign" })),
            react_1.default.createElement("form", { id: "form-login-form", className: "pane_form", autoComplete: "off", onSubmit: this.bind.onLoginHandler },
                react_1.default.createElement("div", { className: "form_row" },
                    react_1.default.createElement("label", { htmlFor: "name" }, "Login:"),
                    react_1.default.createElement("input", { type: "text", name: "login", placeholder: "enter login" })),
                react_1.default.createElement("div", { className: "form_row" },
                    react_1.default.createElement("label", { htmlFor: "password" }, "Password: "),
                    react_1.default.createElement("input", { type: "password", autoComplete: "new-password", name: "password", placeholder: "enter password" })),
                react_1.default.createElement("div", { className: "form_row -right" },
                    react_1.default.createElement("button", { className: "gen_button", onClick: this.bind.onLoginHandler },
                        react_1.default.createElement("span", { className: "icon-circle-arrow-right" }),
                        " Sign in"))),
            react_1.default.createElement("div", { id: "form-login-info", className: "form-window_footer" }, "\u00A0")));
    }
    onLoginHandler(e) {
        e.preventDefault();
        const info = document.getElementById('form-login-info');
        const form = document.getElementById('form-login-form');
        const formData = new FormData(form);
        const rawData = {
            login: formData.get('login'),
            password: formData.get('password')
        };
        const okAuth = V.isAuthValid(rawData, E.FORM_MODE.insert);
        if (okAuth === true) {
            api_1.select('/api/auth', 'login')
                .then((data) => {
                const credentials = client_1.encryptCredentials(rawData, data.key);
                return api_1.auth({ credentials });
            })
                .then((data) => {
                if (data.authenticated) {
                    document.dispatchEvent(new CustomEvent('kudoz::authenticated', { detail: data }));
                }
                else {
                    info.innerText = 'Error: authentication failed';
                }
            })
                .catch((_e) => {
                info.innerText = 'Error: authentication failed';
            });
        }
        else {
            info.innerText = `Error: ${okAuth.join(', ')}`;
            return;
        }
    }
}
exports.default = LoginForm;


/***/ }),

/***/ 347:
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
const E = __importStar(__webpack_require__(234));
const V = __importStar(__webpack_require__(343));
const api_1 = __webpack_require__(33);
const client_1 = __webpack_require__(34);
class PasswordForm extends react_1.Component {
    constructor(props) {
        super(props);
        this.newPass = {
            login: '',
            password: '',
            passwordOld: '',
            passwordRepeat: ''
        };
        this.state = {
            isAdmin: props.role === E.USER_ROLE.admin,
            mode: E.FORM_MODE.hidden
        };
        this.bind = {
            onClickHandler: this.onClickHandler.bind(this),
            onClose: this.onClose.bind(this),
            onFormRefresh: this.onFormRefresh.bind(this)
        };
    }
    componentDidMount() {
        document.addEventListener('kudoz::passwordFormRefresh', this.bind.onFormRefresh);
    }
    componentWillUnmount() {
        document.removeEventListener('kudoz::passwordFormRefresh', this.bind.onFormRefresh);
    }
    render() {
        const { login, password, passwordOld, passwordRepeat } = this.newPass;
        const classHidden = this.state.mode === E.FORM_MODE.hidden ? ' hidden' : '';
        return (react_1.default.createElement("div", { id: "form-password", key: "passwordForm", className: `form-window${classHidden}` },
            react_1.default.createElement("div", { className: "form-window_header" },
                react_1.default.createElement("span", { className: "form-window_header-text" }, "Password change"),
                react_1.default.createElement("span", { className: "form-window_header-close icon-remove-sign", onClick: this.bind.onClose })),
            react_1.default.createElement("form", { id: "form-password-form", className: "pane_form", autoComplete: "off", onSubmit: this.bind.onClickHandler },
                react_1.default.createElement("div", { className: "form_row" },
                    react_1.default.createElement("label", { htmlFor: "login" }, "Login: "),
                    react_1.default.createElement("input", { type: "text", name: "login", placeholder: "enter your login", defaultValue: login }),
                    " *"),
                react_1.default.createElement("div", { className: "form_row" },
                    react_1.default.createElement("label", { htmlFor: "password" }, "Old password: "),
                    react_1.default.createElement("input", { type: "password", autoComplete: "old-password", name: "passwordOld", placeholder: "enter old password", defaultValue: passwordOld }),
                    this.state.isAdmin ? ' ' : ' *'),
                react_1.default.createElement("div", { className: "form_row" },
                    react_1.default.createElement("label", { htmlFor: "password" }, "New password: "),
                    react_1.default.createElement("input", { type: "password", autoComplete: "new-password", name: "password", placeholder: "enter new password", defaultValue: password }),
                    ' ',
                    "*"),
                react_1.default.createElement("div", { className: "form_row" },
                    react_1.default.createElement("label", { htmlFor: "passwordRepeat" }, "Repeat new password: "),
                    react_1.default.createElement("input", { type: "password", name: "passwordRepeat", placeholder: "repeat new password", defaultValue: passwordRepeat }),
                    ' ',
                    "*"),
                react_1.default.createElement("div", { className: "form_row -right" },
                    react_1.default.createElement("button", { className: "gen_button", onClick: this.bind.onClickHandler },
                        react_1.default.createElement("span", { className: "icon-key" }),
                        " Change password"))),
            react_1.default.createElement("div", { id: "form-password-info", className: "form-window_footer" }, "\u00A0")));
    }
    onClickHandler(e) {
        e.preventDefault();
        const rawData = Object.assign({}, this.newPass);
        const info = document.getElementById('form-password-info');
        const form = document.getElementById('form-password-form');
        const formData = new FormData(form);
        formData.forEach((item, key) => {
            rawData[key] = item;
        });
        const okPass = V.isPassChangeValid(rawData, E.FORM_MODE.insert, this.state.isAdmin);
        if (okPass === true) {
            api_1.select('/api/auth', 'chpass')
                .then((data) => {
                delete rawData.passwordRepeat;
                const credentials = client_1.encryptCredentials(rawData, data.key);
                return api_1.update('/api/auth', 'change', { credentials });
            })
                .then(() => {
                info.innerText = 'Success: Password changed';
            })
                .catch(() => {
                info.innerText = 'Error: Password change failed';
            });
        }
        else {
            info.innerText = 'Error: Passwords does not match.';
        }
    }
    onClose() {
        const form = document.getElementById('form-password-form');
        form.reset();
        this.setState({ mode: E.FORM_MODE.hidden });
    }
    onFormRefresh() {
        const info = document.getElementById('form-password-info');
        info.innerText = ' ';
        this.setState({ mode: E.FORM_MODE.insert });
    }
}
exports.default = PasswordForm;


/***/ }),

/***/ 348:
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
const E = __importStar(__webpack_require__(234));
const V = __importStar(__webpack_require__(343));
const api_1 = __webpack_require__(33);
const client_1 = __webpack_require__(34);
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
            user: Object.assign({}, this.newUser)
        };
        this.bind = {
            onClickHandler: this.onClickHandler.bind(this),
            onClose: this.onClose.bind(this),
            onFormRefresh: this.onFormRefresh.bind(this)
        };
    }
    componentDidMount() {
        document.addEventListener('kudoz::userFormRefresh', this.bind.onFormRefresh);
    }
    componentWillUnmount() {
        document.removeEventListener('kudoz::userFormRefresh', this.bind.onFormRefresh);
    }
    render() {
        const { name, surname, login, role } = this.state.user;
        const button = `${this.state.mode === E.FORM_MODE.insert ? 'Create' : 'Update'} user`;
        const classHidden = this.state.mode === E.FORM_MODE.hidden ? ' hidden' : '';
        return (react_1.default.createElement("div", { id: "form-user", key: "userForm", className: `form-window${classHidden}` },
            react_1.default.createElement("div", { className: "form-window_header" },
                react_1.default.createElement("span", { className: "form-window_header-text" }, "User"),
                react_1.default.createElement("span", { className: "form-window_header-close icon-remove-sign", onClick: this.bind.onClose })),
            react_1.default.createElement("form", { id: "form-user-form", className: "pane_form", autoComplete: "off", onSubmit: this.bind.onClickHandler },
                react_1.default.createElement("div", { className: "form_row" },
                    react_1.default.createElement("label", { htmlFor: "name" }, "Name:"),
                    react_1.default.createElement("input", { type: "text", name: "name", defaultValue: name })),
                react_1.default.createElement("div", { className: "form_row" },
                    react_1.default.createElement("label", { htmlFor: "surname" }, "Surname:"),
                    react_1.default.createElement("input", { type: "text", name: "surname", defaultValue: surname })),
                react_1.default.createElement("div", { className: "form_row" },
                    react_1.default.createElement("label", { htmlFor: "role" }, "Role: "),
                    react_1.default.createElement("select", { name: "role", defaultValue: role },
                        react_1.default.createElement("option", { value: "admin" }, "admin"),
                        react_1.default.createElement("option", { value: "user" }, "user")),
                    "*"),
                react_1.default.createElement("div", { className: "form_row" },
                    react_1.default.createElement("label", { htmlFor: "login" }, "Login: "),
                    react_1.default.createElement("input", { type: "text", name: "login", defaultValue: login }),
                    " *"),
                this.state.mode === E.FORM_MODE.insert ? this.passRows() : '',
                react_1.default.createElement("div", { className: "form_row -right" },
                    react_1.default.createElement("button", { className: "gen_button", onClick: this.bind.onClickHandler },
                        react_1.default.createElement("span", { className: "icon-user" }),
                        " ",
                        button))),
            react_1.default.createElement("div", { id: "form-user-info", className: "form-window_footer" }, "\u00A0")));
    }
    passRows() {
        return (react_1.default.createElement("div", null,
            react_1.default.createElement("div", { className: "form_row" },
                react_1.default.createElement("label", { htmlFor: "password" }, "Password: "),
                react_1.default.createElement("input", { type: "password", autoComplete: "new-password", name: "password", placeholder: "enter password" }),
                " *"),
            react_1.default.createElement("div", { className: "form_row" },
                react_1.default.createElement("label", { htmlFor: "passwordRepeat" }, "Password repeat: "),
                react_1.default.createElement("input", { type: "password", name: "passwordRepeat", placeholder: "repeat password" }),
                " *")));
    }
    onClickHandler(e) {
        e.preventDefault();
        const rawData = Object.assign({}, this.newUser);
        const info = document.getElementById('form-user-info');
        const form = document.getElementById('form-user-form');
        const formData = new FormData(form);
        formData.forEach((item, key) => {
            rawData[key] = item;
        });
        // validate passwords
        if (this.state.mode === E.FORM_MODE.insert) {
            const okPass = V.isPasswordValid(rawData);
            if (okPass !== true) {
                info.innerText = 'Error: Passwords does not match.';
                return;
            }
        }
        // validate form
        const okUser = V.isUserValid(rawData, this.state.mode);
        if (okUser !== true) {
            info.innerText = `Error: ${okUser.join(', ')}`;
            return;
        }
        if (this.state.mode === E.FORM_MODE.insert) {
            this.setDataInsert(rawData);
        }
        else {
            delete rawData.password;
            delete rawData.passwordRepeat;
            this.setDataUpdate(rawData);
        }
    }
    onClose() {
        const form = document.getElementById('form-user-form');
        form.reset();
        this.setState({ mode: E.FORM_MODE.hidden });
    }
    getData(_id) {
        if (_id) {
            api_1.select('/api/users', _id).then((data) => {
                const user = data[0];
                this.setState({ mode: E.FORM_MODE.update, user });
            });
        }
        else {
            this.setState({ mode: E.FORM_MODE.insert, user: Object.assign({}, this.newUser) });
        }
    }
    setDataInsert(rawData) {
        const info = document.getElementById('form-user-info');
        api_1.select('/api/auth', 'login')
            .then((hand) => {
            const credentials = client_1.encryptCredentials({ password: rawData.password }, hand.key);
            delete rawData.password;
            delete rawData.passwordRepeat;
            const data = Object.assign(Object.assign({}, rawData), { credentials });
            data.credentials = credentials;
            return api_1.insert('/api/users', data);
        })
            .then(() => {
            info.innerText = 'Success: User added.';
            document.dispatchEvent(new CustomEvent('kudoz::userListRefresh'));
        })
            .catch((err) => {
            info.innerText = `Error: ${err.message}`;
        });
    }
    setDataUpdate(rawData) {
        const info = document.getElementById('form-user-info');
        api_1.update('/api/users', this.state.user._id, rawData)
            .then(() => {
            info.innerText = 'Success: User updated.';
            document.dispatchEvent(new CustomEvent('kudoz::userListRefresh'));
        })
            .catch((err) => {
            info.innerText = `Error: ${err.message}`;
        });
    }
    onFormRefresh(e) {
        const info = document.getElementById('form-user-info');
        info.innerText = ' ';
        this.getData(e.detail._id);
    }
}
exports.default = UserForm;


/***/ }),

/***/ 349:
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
        this.bind = {
            onClickHandler: this.onClickHandler.bind(this),
            onListRefresh: this.onListRefresh.bind(this)
        };
    }
    componentDidMount() {
        this.getData();
        document.addEventListener('kudoz::userListRefresh', this.bind.onListRefresh);
    }
    componentWillUnmount() {
        document.removeEventListener('kudoz::userListRefresh', this.bind.onListRefresh);
    }
    render() {
        const { data, loading } = this.state;
        return (react_1.default.createElement("section", { id: "users_list", className: "pane", key: "userList" },
            react_1.default.createElement("h4", null,
                "Users",
                react_1.default.createElement("span", { className: "button" },
                    react_1.default.createElement("button", { className: "gen_button", "data-id": "", onClick: this.bind.onClickHandler },
                        react_1.default.createElement("span", { className: "icon-plus" }),
                        " New user"))),
            react_1.default.createElement("table", { className: "admin-table" },
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
            react_1.default.createElement("button", { className: "gen_button", "data-id": user._id, onClick: this.bind.onClickHandler },
                react_1.default.createElement("span", { className: "icon-pencil" }),
                "Edit")));
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
    getData() {
        api_1.select('/api/users').then((data) => this.setState({ data, loading: false }));
    }
    onClickHandler(e) {
        var _a;
        const _id = (_a = e.currentTarget.dataset.id) !== null && _a !== void 0 ? _a : undefined;
        document.dispatchEvent(new CustomEvent('kudoz::userFormRefresh', { detail: { _id } }));
    }
    onListRefresh() {
        this.setState({ loading: true });
        this.getData();
    }
}
exports.default = UserList;


/***/ })

},[[287,"runtime","vendor","common"]]]);
//# sourceMappingURL=admin.js.map