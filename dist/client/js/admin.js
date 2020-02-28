(window["webpackJsonpKudoz"] = window["webpackJsonpKudoz"] || []).push([["admin"],{

/***/ 24:
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
const EventForm_1 = __importDefault(__webpack_require__(25));
const EventList_1 = __importDefault(__webpack_require__(27));
ReactDOM.render(React.createElement("div", { className: "eventAdmin" },
    React.createElement("header", null,
        React.createElement("h1", null, "Event admin")),
    React.createElement(EventForm_1.default, null),
    React.createElement(EventList_1.default, null)), document.getElementById('admin'));


/***/ }),

/***/ 25:
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
const api_1 = __webpack_require__(23);
const E = __importStar(__webpack_require__(26));
class EventForm extends react_1.Component {
    constructor(props) {
        super(props);
        this.state = {
            mode: props.event ? 'update' : 'insert'
        };
        if (props.event) {
            this.event = props.event;
        }
    }
    onClickHandler() {
        var _a;
        const data = {};
        const info = document.getElementById('form-event-info');
        const form = document.getElementById('form-event');
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
            api_1.update('/api/events', (_a = this.event) === null || _a === void 0 ? void 0 : _a._id, data)
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
            console.log(e.detail._id);
            // this.getData(e.detail._id);
        }));
    }
    getData(_id) {
        api_1.select('/api/events', _id).then((data) => this.setState({ mode: 'update' }));
    }
    render() {
        const now = new Date().getTime();
        const { dateFrom, dateTo, name, state } = this.event
            ? this.event
            : { dateFrom: now, dateTo: now + 1209600000, name: '', state: E.EVENT_STATE.future };
        const button = `${this.state.mode === 'insert' ? 'Add' : 'Edit'} event 📅`;
        return (react_1.default.createElement("form", { id: "form-event", key: "eventForm" },
            react_1.default.createElement("label", { htmlFor: "dateFrom" }, "Date from: "),
            react_1.default.createElement("input", { type: "text", id: "event-dateFrom", name: "dateFrom", defaultValue: dateFrom }),
            "*",
            react_1.default.createElement("br", null),
            react_1.default.createElement("label", { htmlFor: "dateTo" }, "Date to: "),
            react_1.default.createElement("input", { type: "text", id: "event-dateTo", name: "dateTo", defaultValue: dateTo }),
            "*",
            react_1.default.createElement("br", null),
            react_1.default.createElement("label", { htmlFor: "name" }, "Event name: "),
            react_1.default.createElement("input", { type: "text", id: "event-name", name: "name", placeholder: "event name", defaultValue: name }),
            "*",
            react_1.default.createElement("br", null),
            react_1.default.createElement("label", { htmlFor: "state" }, "State: "),
            react_1.default.createElement("select", { id: "event-state", name: "state", defaultValue: state },
                "*",
                react_1.default.createElement("option", { value: "past" }, "past"),
                react_1.default.createElement("option", { value: "active" }, "active"),
                react_1.default.createElement("option", { value: "future" }, "future")),
            react_1.default.createElement("br", null),
            react_1.default.createElement("input", { type: "button", onClick: this.onClickHandler.bind(this), value: button }),
            react_1.default.createElement("div", { id: "form-event-info" })));
    }
}
exports.default = EventForm;


/***/ }),

/***/ 26:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var CARD_TYPE;
(function (CARD_TYPE) {
    CARD_TYPE["awesome"] = "awesome";
    CARD_TYPE["normal"] = "normal";
})(CARD_TYPE = exports.CARD_TYPE || (exports.CARD_TYPE = {}));
var EVENT_STATE;
(function (EVENT_STATE) {
    EVENT_STATE["past"] = "past";
    EVENT_STATE["active"] = "active";
    EVENT_STATE["future"] = "future";
})(EVENT_STATE = exports.EVENT_STATE || (exports.EVENT_STATE = {}));


/***/ }),

/***/ 27:
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
const api_1 = __webpack_require__(23);
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
        const _id = e.currentTarget.dataset.id;
        document.dispatchEvent(new CustomEvent('kudoz::eventFormRefresh', { detail: { _id } }));
    }
    render() {
        const { data, loading } = this.state;
        return (react_1.default.createElement("table", null,
            react_1.default.createElement("thead", null,
                react_1.default.createElement("tr", null,
                    react_1.default.createElement("th", null, "name"),
                    react_1.default.createElement("th", null, "dateFrom"),
                    react_1.default.createElement("th", null, "dateTo"),
                    react_1.default.createElement("th", null, "state"),
                    react_1.default.createElement("th", null, "action"))),
            react_1.default.createElement("tbody", null, loading ? this.loading() : this.eventRows(data))));
    }
    eventCols(event) {
        const jsx = [];
        jsx.push(react_1.default.createElement("td", null, event.name));
        jsx.push(react_1.default.createElement("td", null, new Date(event.dateFrom).toLocaleString()));
        jsx.push(react_1.default.createElement("td", null, new Date(event.dateTo).toLocaleString()));
        jsx.push(react_1.default.createElement("td", null, event.state));
        jsx.push(react_1.default.createElement("td", null,
            react_1.default.createElement("input", { type: "button", "data-id": event._id, value: "edit", onClick: this.onClickHandler.bind(this) })));
        return jsx;
    }
    eventRows(events) {
        const jsx = [];
        events.forEach((event) => {
            jsx.push(react_1.default.createElement("tr", null, this.eventCols(event)));
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

},[[24,"runtime","vendor","commons~admin~main"]]]);
//# sourceMappingURL=admin.js.map