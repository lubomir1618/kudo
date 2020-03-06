(window["webpackJsonpKudoz"] = window["webpackJsonpKudoz"] || []).push([["admin"],{

/***/ 73:
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
const EventForm_1 = __importDefault(__webpack_require__(74));
const EventList_1 = __importDefault(__webpack_require__(77));
ReactDOM.render(React.createElement("div", { className: "eventAdmin" },
    React.createElement("header", null,
        React.createElement("h1", null, "Event admin")),
    React.createElement(EventForm_1.default, null),
    React.createElement(EventList_1.default, null)), document.getElementById('admin'));


/***/ }),

/***/ 74:
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
const E = __importStar(__webpack_require__(36));
__webpack_require__(75);
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
            react_1.default.createElement("form", { id: "form-event-form" },
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

/***/ 75:
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(39);
            var content = __webpack_require__(76);

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

/***/ 76:
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(41);
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, "html {\n  --c-one: #4d677f;\n  --c-two: white;\n  --c-three: rgba(3, 2, 2, 0.25);\n  --c-border: #dbe1e4;\n}\n\n#form-event {\n  border: 1px solid var(--c-border);\n  background-color: var(--c-two);\n  width: 500px;\n  height: 325px;\n  box-shadow: 0px 4px 10px var(--c-three);\n  font-family: 'Ubuntu_Bold';\n  position: fixed;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  z-index: 10;\n}\n\n#form-event.hidden {\n  display: none;\n}\n\n#form-event .formEvent_header {\n  background-color: var(--c-one);\n  height: 26px;\n  line-height: 26px;\n}\n\n#form-event .formEvent_header .formEvent_header-text {\n  font-size: 16px;\n  margin-left: 10px;\n  color: var(--c-two);\n}\n\n#form-event .formEvent_header .formEvent_header-close {\n  display: block;\n  font-size: 16px;\n  margin-right: 4px;\n  background-color: var(--c-two);\n  color: var(--c-one);\n  border-radius: 50%;\n  width: 20px;\n  height: 20px;\n  float: right;\n  text-align: center;\n  line-height: 18px;\n  margin-top: 2px;\n  cursor: pointer;\n}\n\n#form-event form {\n  margin: 10px 20px;\n}\n\n#form-event label {\n  display: inline-block;\n  display: inline-block;\n  min-width: 120px;\n  text-align: right;\n  margin-right: 10px;\n  color: var(--c-one);\n}\n\n#form-event input,\n#form-event select {\n  min-width: 200px;\n}\n\n#form-event input[type='button'] {\n  position: relative;\n  margin: 0 58%;\n}\n", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ 77:
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


/***/ })

},[[73,"runtime","vendor","common"]]]);
//# sourceMappingURL=admin.js.map