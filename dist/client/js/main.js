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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = __importStar(__webpack_require__(1));
const ReactDOM = __importStar(__webpack_require__(6));
const react_router_dom_1 = __webpack_require__(12);
const KudoEvent_1 = __importDefault(__webpack_require__(32));
__webpack_require__(63);
function App() {
    // let id = useParams().id;
    return (React.createElement(react_router_dom_1.BrowserRouter, null,
        React.createElement(react_router_dom_1.Switch, null,
            React.createElement(react_router_dom_1.Route, { exact: true, path: "/" },
                React.createElement("div", null, "Ahoj, toto je main routa, tu mozno raz daco bude, mozno nie :P")),
            React.createElement(react_router_dom_1.Route, { path: "/priklad" },
                React.createElement("div", null, "Priklad na inu route ")),
            React.createElement(react_router_dom_1.Route, { path: "/event/:id", component: KudoEvent_1.default }))));
}
exports.default = App;
ReactDOM.render(React.createElement(App, null), document.getElementById('example'));
// vodka();


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
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */,
/* 19 */,
/* 20 */,
/* 21 */,
/* 22 */,
/* 23 */,
/* 24 */,
/* 25 */,
/* 26 */,
/* 27 */,
/* 28 */,
/* 29 */,
/* 30 */,
/* 31 */,
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(__webpack_require__(1));
const api_1 = __webpack_require__(33);
const client_1 = __webpack_require__(34);
const Knight_1 = __webpack_require__(37);
const EventInfo_1 = __webpack_require__(42);
const KudoForm_1 = __importDefault(__webpack_require__(45));
const Card_1 = __importDefault(__webpack_require__(58));
__webpack_require__(61);
class KudoEvent extends react_1.default.Component {
    constructor(props) {
        super(props);
        this.eventId = this.props.match.params.id;
        this.state = {
            cards: [],
            event: undefined,
            is_active: false
        };
    }
    componentDidMount() {
        this.getData();
        document.addEventListener('kudoz::cardListRefresh', () => {
            this.getData();
        });
    }
    render() {
        return (this.state.event
            ? react_1.default.createElement("div", { className: 'kudoEvent' },
                react_1.default.createElement("div", { className: "event_info" },
                    this.getEvent(),
                    this.getKnight(),
                    react_1.default.createElement(KudoForm_1.default, { eventId: this.eventId, isActive: this.state.is_active })),
                react_1.default.createElement("div", { className: "event_cards" }, this.processCards()))
            : react_1.default.createElement("div", null));
    }
    getData() {
        const now = new Date().getTime();
        api_1.select('/api/cards', { eventId: this.eventId }).then((data) => {
            if (Array.isArray(data)) {
                data.sort((a, b) => (a.likes > b.likes) ? -1 : 1);
                this.setState({ cards: data });
            }
            else {
                this.setState({ cards: [data] });
            }
        });
        api_1.select('/api/events', { _id: this.eventId })
            .then((data) => {
            this.setState({
                event: data,
                is_active: data.dateFrom < now && now < data.dateTo
            });
        });
    }
    getEvent() {
        if (this.state.event) {
            const event_props = {
                dateFrom: this.state.event.dateFrom,
                dateTo: this.state.event.dateTo,
                eventName: this.state.event.name
            };
            return react_1.default.createElement(EventInfo_1.EventInfo, Object.assign({}, event_props));
        }
        return react_1.default.createElement("div", null);
    }
    processCards() {
        const cards = [];
        this.state.cards.forEach(card_data => {
            const card_props = {
                awarded: card_data.awardedTo,
                cardID: card_data._id,
                cardType: card_data.type,
                eventID: card_data.eventId,
                highlighted: this.isHighligted(card_data._id),
                likes: card_data.likes,
                text: card_data.text
            };
            cards.push(react_1.default.createElement(Card_1.default, Object.assign({ key: card_props.cardID }, card_props)));
        });
        return cards;
    }
    isHighligted(cardId) {
        return this.state.cards.map(card => card._id).indexOf(cardId) < 7;
    }
    getKnight() {
        // TODO get most frequent name from array
        const list = client_1.getKudoNumberList(this.state.cards);
        return react_1.default.createElement("div", { title: JSON.stringify(list) },
            react_1.default.createElement(Knight_1.Knight, Object.assign({}, { mostKudos: client_1.getKudoKnight(list) })));
    }
}
exports.default = KudoEvent;


/***/ }),
/* 33 */,
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const validate_1 = __webpack_require__(35);
const api_1 = __webpack_require__(33);
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
function getKudoNumberList(cards) {
    let list = cards.reduce((acc, val) => {
        if (acc[val.awardedTo]) {
            acc[val.awardedTo].count += 1;
        }
        else {
            acc[val.awardedTo] = { name: val.awardedTo, count: 1 };
        }
        return acc;
    }, {});
    return Object.values(list).sort((a, b) => a.count > b.count ? -1 : 1);
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


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = __webpack_require__(36);
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
function isCardValid(card, event) {
    const bugs = [];
    if (!(event && event._id === card.eventId && event.dateFrom < card.created && event.dateTo < card.created)) {
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
    if (!(card.type && constants_1.CARD_TYPE[card.type])) {
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
/* 36 */,
/* 37 */
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
__webpack_require__(38);
exports.Knight = (props) => (React.createElement("div", { className: "kudoKnight" },
    React.createElement("div", null,
        React.createElement("img", { src: "/img/007-crusader.png" })),
    React.createElement("div", { className: "kudoKnight__content" },
        React.createElement("h3", null, "Kudo Knight"),
        React.createElement("h2", null, props.mostKudos))));


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(39);
            var content = __webpack_require__(40);

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
/* 39 */,
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(41);
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, ".kudoKnight {\n  font-family: 'Ubuntu', Arial, Helvetica, sans-serif;\n  background: linear-gradient(180deg, #ffffff 0%, rgba(255, 255, 255, 0) 100%), #c6d8d3;\n  display: flex;\n  position: relative;\n  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);\n  border-radius: 10px;\n  padding: 5px;\n}\n.kudoKnight__content {\n  margin-left: 110px;\n  margin-bottom: 16px;\n}\n.kudoKnight h3 {\n  margin-top: 20px;\n  font-size: 12px;\n  color: #6d686d;\n}\n\n.kudoKnight h2 {\n  font-size: 18px;\n  color: #331832;\n  margin-top: -5px;\n  margin-left: 0px;\n}\n.kudoKnight img {\n  position: absolute;\n  height: 120%;\n  bottom: 0;\n}\n", ""]);
// Exports
module.exports = exports;


/***/ }),
/* 41 */,
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(__webpack_require__(1));
__webpack_require__(43);
function getDate(dateFrom, dateTo) {
    const yearFrom = new Date(dateFrom).getFullYear();
    const monthFrom = new Date(dateFrom).getMonth() + 1;
    const dayFrom = new Date(dateFrom).getDate();
    const yearTo = new Date(dateTo).getFullYear();
    const monthTo = new Date(dateTo).getMonth() + 1;
    const dayTo = new Date(dateTo).getDate();
    if (yearFrom !== yearTo) {
        return `${dayFrom}.${monthFrom}.${yearFrom} - ${dayTo}.${monthTo}.${yearTo} `;
    }
    else if (monthFrom !== monthTo) {
        return `${dayFrom}.${monthFrom} - ${dayTo}.${monthTo}.${yearTo} `;
    }
    else {
        return `${dayFrom} - ${dayTo}.${monthTo}.${yearTo} `;
    }
}
exports.EventInfo = (props) => {
    return (react_1.default.createElement("div", { className: "eventInfo" },
        react_1.default.createElement("h1", null, props.eventName),
        react_1.default.createElement("h2", null, getDate(props.dateFrom, props.dateTo))));
};


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(39);
            var content = __webpack_require__(44);

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
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(41);
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, ":root {\n  --text-color: #ffffff;\n}\n\n.eventInfo {\n  position: relative;\n  margin-bottom: 10px;\n}\n\n.eventInfo h1,\nh2 {\n  font-family: 'Ubuntu_Normal';\n  font-style: normal;\n  color: var(--text-color);\n  margin: 2px;\n}\n\n.eventInfo h1 {\n  font-size: 24px;\n  line-height: 28px;\n}\n\n.eventInfo h2 {\n  font-size: 14px;\n  line-height: 17px;\n}\n", ""]);
// Exports
module.exports = exports;


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(__webpack_require__(1));
const react_select_search_1 = __importDefault(__webpack_require__(46));
const api_1 = __webpack_require__(33);
const constants_1 = __webpack_require__(36);
const CardIcon_1 = __webpack_require__(52);
const data_1 = __importDefault(__webpack_require__(55));
__webpack_require__(56);
const CARD_TYPES = Object.values(constants_1.CARD_TYPE);
const PEOPLE = [...data_1.default];
PEOPLE.map((folk) => {
    folk.value = folk.name;
});
class KudoForm extends react_1.default.Component {
    constructor(props) {
        super(props);
        this.eventId = props.eventId;
        this.formRef = react_1.default.createRef();
        this.messageRef = react_1.default.createRef();
        this.state = {
            name: undefined,
            type: constants_1.CARD_TYPE.totally_awesome
        };
    }
    componentDidMount() {
        if (this.formRef.current && this.messageRef.current) {
            const name_options = this.formRef.current.querySelector('.name .select-search-box__options');
            const type_options = this.formRef.current.querySelector('.typePicker .select-search-box__options');
            const message_height = this.messageRef.current.parentElement.offsetHeight;
            name_options.style.maxHeight = `${message_height - 1}px`;
            type_options.style.height = `${message_height + 55}px`;
        }
    }
    render() {
        const buttonClass = this.props.isActive ? '' : 'disabled';
        return (react_1.default.createElement("div", { className: 'kudoForm', ref: this.formRef },
            react_1.default.createElement("div", { className: 'typePicker' }, this.typePicker()),
            react_1.default.createElement("div", { className: 'main' },
                react_1.default.createElement("div", { className: 'name' },
                    "Meno ",
                    this.peoplePicker()),
                react_1.default.createElement("div", { className: 'message' },
                    react_1.default.createElement("textarea", { ref: this.messageRef, placeholder: 'Sprava' }))),
            react_1.default.createElement("div", { className: `submit ${buttonClass}`, onClick: () => this.onSubmit() }, "Daj Kudos")));
    }
    typePicker() {
        const options = CARD_TYPES.map((type) => {
            return {
                name: type.replace('_', ' '),
                value: type
            };
        });
        const handleClick = (valueProps) => this.onTypeSelect(valueProps);
        return (react_1.default.createElement(react_select_search_1.default, { options: options, value: this.state.type, search: false, onChange: handleClick, renderOption: this.renderOption, renderValue: this.renderValue }));
    }
    ;
    renderValue(label) {
        return (react_1.default.createElement("div", { className: 'typeTitle' },
            react_1.default.createElement(CardIcon_1.CardIcon, Object.assign({}, { cardType: label.replace(' ', '_') })),
            label));
    }
    renderOption(valueProps) {
        return (react_1.default.createElement("div", null,
            react_1.default.createElement(CardIcon_1.CardIcon, Object.assign({}, { cardType: valueProps.value })),
            react_1.default.createElement("div", null, valueProps.name)));
    }
    peoplePicker() {
        const handleClick = (valueProps) => this.onFolkSelect(valueProps);
        return (react_1.default.createElement(react_select_search_1.default, { options: PEOPLE, onChange: handleClick, placeholder: 'Select name', value: this.state.name }));
    }
    ;
    onTypeSelect(valueProps) {
        this.setState({ type: valueProps.value });
    }
    onFolkSelect(valueProps) {
        this.setState({ name: valueProps.name });
    }
    drawRed(error) {
        const classlist = this.formRef.current.getElementsByClassName(error)[0].classList;
        classlist.add('red');
        setTimeout(() => {
            classlist.remove('red');
        }, 700);
    }
    onSubmit() {
        if (this.props.isActive) {
            if (this.state.name === undefined) {
                this.drawRed("name" /* name */);
            }
            else if (!this.messageRef.current
                || (this.messageRef.current && this.messageRef.current.value.trim().length === 0)
                || (this.messageRef.current && this.messageRef.current.value === 'Sprava')) {
                this.drawRed("message" /* message */);
            }
            else {
                const new_card = {
                    awardedTo: this.state.name,
                    created: new Date().getTime(),
                    eventId: this.eventId,
                    likes: 0,
                    text: this.messageRef.current.value,
                    type: this.state.type
                };
                api_1.insert('/api/cards', new_card)
                    .then(() => {
                    this.clearForm();
                    document.dispatchEvent(new CustomEvent('kudoz::cardListRefresh'));
                })
                    .catch((err) => {
                    console.log('Error: card not inserted');
                });
            }
        }
    }
    clearForm() {
        this.setState({ name: undefined });
        this.messageRef.current.value = '';
    }
}
exports.default = KudoForm;


/***/ }),
/* 46 */,
/* 47 */,
/* 48 */,
/* 49 */,
/* 50 */,
/* 51 */,
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(__webpack_require__(1));
const constants_1 = __webpack_require__(36);
__webpack_require__(53);
function getIcon(cardType) {
    switch (cardType) {
        case constants_1.CARD_TYPE.great_job:
            return '009-positive-vote.svg';
        case constants_1.CARD_TYPE.totally_awesome:
            return '005-star.svg';
        case constants_1.CARD_TYPE.well_done:
            return '006-smiling-face.svg';
        case constants_1.CARD_TYPE.many_thanks:
            return '003-flower.svg';
        case constants_1.CARD_TYPE.very_happy:
            return '002-heart.svg';
        case constants_1.CARD_TYPE.congrats:
            return '004-balloons.svg';
        case constants_1.CARD_TYPE.proud:
            return '001-crowns.svg';
        case constants_1.CARD_TYPE.thank_you:
            return '010-birthday-cupcake.svg';
        default:
            return '005-star.svg';
    }
}
exports.CardIcon = (props) => {
    return (react_1.default.createElement("div", { className: "cardIcon" },
        react_1.default.createElement("img", { src: `/img/${getIcon(props.cardType)}`, title: props.cardType.replace('_', ' ').toUpperCase() })));
};


/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(39);
            var content = __webpack_require__(54);

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
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(41);
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, ".cardIcon {\n  width: 100%;\n  height: 100%;\n}\n\n.cardIcon img {\n  width: 100%;\n  height: 100%;\n  min-width: 20px;\n  min-height: 20px;\n}\n", ""]);
// Exports
module.exports = exports;


/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.default = [
    {
        name: 'Andrejko Maros'
    },
    {
        name: 'Angelovic Kamil'
    },
    {
        name: 'Babela Jan'
    },
    {
        name: 'Birka Miroslav'
    },
    {
        name: 'Bobikova Martina'
    },
    {
        name: 'Briskar Rastislav'
    },
    {
        name: 'Brunacky Tomas'
    },
    {
        name: 'Daneshjo Tomas'
    },
    {
        name: 'Derner Jan'
    },
    {
        name: 'Fabianova Lucia'
    },
    {
        name: 'Gavala Cyril'
    },
    {
        name: 'Halupka Arben'
    },
    {
        name: 'Halupka Ivan'
    },
    {
        name: 'Haskova Veronika'
    },
    {
        name: 'Holubec Lukas'
    },
    {
        name: 'Igrini Tomas'
    },
    {
        name: 'Istvan Miroslav'
    },
    {
        name: 'Jancus Adrian'
    },
    {
        name: 'Jassova Monika'
    },
    {
        name: 'Kapusta Michal'
    },
    {
        name: 'Kardos Michal'
    },
    {
        name: 'Kardosova Katarina'
    },
    {
        name: 'Komives Csaba'
    },
    {
        name: 'Korcekova Silvia'
    },
    {
        name: 'Kosc Ladislav'
    },
    {
        name: 'Kovac Andrej'
    },
    {
        name: 'Kulcsar Matej'
    },
    {
        name: 'Langa Adam'
    },
    {
        name: 'Lenard Lubomir'
    },
    {
        name: 'Lencses Rastislav'
    },
    {
        name: 'Lichvar Miroslav'
    },
    {
        name: 'Lichvarova Jarmila'
    },
    {
        name: 'Matija Ondrej'
    },
    {
        name: 'Mezei Stefan'
    },
    {
        name: 'Molcan Adrian'
    },
    {
        name: 'Olejar Lubos'
    },
    {
        name: 'Orgovan Lukas'
    },
    {
        name: 'Palenik Marek'
    },
    {
        name: 'Palko Jan'
    },
    {
        name: 'Pasternakova Petra'
    },
    {
        name: 'Repcin Rudolf'
    },
    {
        name: 'Ruda Iveta'
    },
    {
        name: 'Saloky Lubos'
    },
    {
        name: 'Satala Peter'
    },
    {
        name: 'Schon Dalibor'
    },
    {
        name: 'Sciranka Jaroslav'
    },
    {
        name: 'Sedlak David'
    },
    {
        name: 'Sipkaiova Katarina'
    },
    {
        name: 'Spontak Filip'
    },
    {
        name: 'Sroka Jozef'
    },
    {
        name: 'Stanekova Lenka'
    },
    {
        name: 'Svec Erik'
    },
    {
        name: 'Svitana Robert'
    },
    {
        name: 'Szabova Patricia'
    },
    {
        name: 'Tomko Martin'
    },
    {
        name: 'Tothova Diana'
    },
    {
        name: 'Urban Peter'
    },
    {
        name: 'Valigura Miroslav'
    },
    {
        name: 'Vargova Veronika'
    },
    {
        name: 'Velebna Bozena'
    },
    {
        name: 'Vitkovic Martin'
    },
    {
        name: 'Vodicka Gabriel'
    },
    {
        name: 'Vozarik Norbert'
    },
    {
        name: 'Zavodska Olga'
    },
    {
        name: 'Cernak Adrian'
    },
    {
        name: 'Dlugos Viliam'
    },
    {
        name: 'Fecko Erik'
    },
    {
        name: 'Gromina Juraj'
    },
    {
        name: 'Hanusovsky Henrich'
    },
    {
        name: 'Hilovska Jana'
    },
    {
        name: 'Jalc Tomas'
    },
    {
        name: 'Jurcik Jan'
    },
    {
        name: 'Kazmirsky Peter'
    },
    {
        name: 'Malatakova Miroslava'
    },
    {
        name: 'Mezei Marek'
    },
    {
        name: 'Mihaly Tomas'
    },
    {
        name: 'Miskovic Lubomir'
    },
    {
        name: 'Nedoroscik Jozef'
    },
    {
        name: 'Oscipovsky Lukas'
    },
    {
        name: 'Pajkos Peter'
    },
    {
        name: 'Ridarsky Jan'
    },
    {
        name: 'Ruscak Michal'
    },
    {
        name: 'Rzuhovska Veronika'
    },
    {
        name: 'Schwarz Erik'
    },
    {
        name: 'Sicak Michal'
    },
    {
        name: 'Sipkai Zoltan'
    },
    {
        name: 'Smolarik Oto'
    },
    {
        name: 'Solanikova Marketa'
    },
    {
        name: 'Sorad Jan'
    },
    {
        name: 'Spisak Martin'
    },
    {
        name: 'Ulicny Martin'
    },
    {
        name: 'Vojtko Robert'
    },
    {
        name: 'Durisin Martin'
    }
];


/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(39);
            var content = __webpack_require__(57);

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
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(41);
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, ".kudoForm {\n  background-color: #ffffff;\n  border-radius: 10px;\n  font-family: 'Ubuntu', Arial, Helvetica, sans-serif;\n}\n\n.kudoForm input, .kudoForm textarea {\n  font-family: 'Ubuntu', Arial, Helvetica, sans-serif;\n}\n\n.kudoForm .typePicker {\n  display: flex;\n  align-items: center;\n  height: 67px;\n  border-radius: 10px 10px 0 0;\n  background-color: #FDF0D5;\n  font-size: 20px;\n  color: #331832;\n  text-transform: capitalize;\n  cursor: pointer;\n  transition: background-color 0.3s ease;\n}\n\n.kudoForm .typePicker:hover {\n  background-color: #fae8c1;\n}\n\n.kudoForm .typePicker .cardIcon {\n  max-width: 40px;\n  max-height: 40px;\n  margin-right: 16px;\n}\n\n.kudoForm .typeTitle {\n  display: flex;\n  flex-direction: row;\n  justify-content: center;\n  align-items: center;\n}\n\n.kudoForm .typePicker .select-search-box__options {\n  display: flex;\n  flex-wrap: wrap;\n}\n\n.kudoForm .typePicker .select-search-box__option > div {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n\n.kudoForm .typePicker .select-search-box__options .cardIcon {\n  margin-right: 10px;\n  width: 30px;\n  max-width: 30px;\n  max-height: 30px;\n  min-width: 30px;\n}\n\n.kudoForm .typePicker .select-search-box__options li {\n  width: 50%;\n  padding: 14px;\n  height: 59px;\n  text-transform: capitalize;\n  background-color: #fbf8f4;\n}\n\n.kudoForm .main {\n  height: 237px;\n  display: flex;\n  flex-direction: column;\n}\n\n.kudoForm .name {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 0 23px;\n  height: 55px;\n  font-size: 12px;\n  color: #6D686D;\n  border-bottom: 1px solid rgba(198, 216, 211, 0.3);\n}\n\n.kudoForm .name .select-search-box__search {\n  background-color: transparent;\n  width: 100%;\n  height: 53px;\n  margin-left: 20px;\n  border-radius: initial;\n  border: none;\n  font-size: 16px;\n  color: #6D686D;\n  margin-bottom: 0px;\n}\n\n\n.kudoForm .name .select-search-box .select-search-box__select {\n  top: 55px;\n  width: calc(100% - 23px);\n}\n\n.kudoForm .message {\n  display: flex;\n  align-items: center;\n  padding: 21px 23px;\n  flex-grow: 1;\n}\n\n.kudoForm .message textarea {\n  flex-grow: 1;\n  height: 100%;\n  width: 100%;\n  font-size: 12px;\n  color: #6D686D;\n  resize: none;\n  border: none;\n  outline: none;\n  background: transparent;\n  padding: 0;\n  margin: 0;\n}\n\n.kudoForm .name.red,\n.kudoForm .message.red {\n  animation: blink 0.7s ease;\n}\n\n.kudoForm .submit {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  height: 49px;\n  border-radius: 0 0 10px 10px;\n  font-size: 18px;\n  color: #ffffff;\n  font-weight: bold;\n  background: linear-gradient(180deg, #F0544F 0%, #D74945 100%), #F0544F;\n  cursor: pointer;\n}\n\n.kudoForm .submit.disabled {\n  pointer-events: none;\n  background: linear-gradient(180deg, #cecece 0%, #bcbdc4 100%), #bcbdc4;\n}\n\n@keyframes blink {\n  0% {\n    background: transparent;\n  }\n  50% {\n    background: #f0544fc7;\n  }\n  100% {\n    background: transparent;\n  }\n}\n\n/* react-select-search */\n.select-search-box {\n  width: 100%;\n  position: relative;\n  box-sizing: border-box;\n  font-family: 'Ubuntu', Arial, Helvetica, sans-serif;\n}\n\n.select-search-box *,\n.select-search-box *::after,\n.select-search-box *::before {\n  box-sizing: inherit;\n}\n\n.select-search-box__select {\n  display: none;\n}\n\n.select-search-box__select.select-search-box__select--display {\n  display: block;\n  border-radius: 0;\n}\n\n.select-search-box__search {\n  outline: none;\n}\n\n.select-search-box__value {\n  position: relative;\n}\n\n.select-search-box__value::after {\n  content: '';\n  display: inline-block;\n  position: absolute;\n  top: calc(50% - 9px);\n  right: 19px;\n  width: 11px;\n  height: 11px;\n  transform: rotate(45deg);\n  border-right: 1px solid #000;\n  border-bottom: 1px solid #000;\n  pointer-events: none;\n}\n\n.select-search-box__input {\n  display: block;\n  height: 36px;\n  width: 100%;\n  padding: 0 16px;\n  background: #fff;\n  border: none;\n  box-shadow: 0 .0625rem .125rem rgba(0, 0, 0, 0.15);\n  border-radius: 3px;\n  outline: none;\n  font-size: 14px;\n  text-align: left;\n  line-height: 36px;\n  -webkit-appearance: none;\n}\n\n.select-search-box__input::-webkit-search-decoration,\n.select-search-box__input::-webkit-search-cancel-button,\n.select-search-box__input::-webkit-search-results-button,\n.select-search-box__input::-webkit-search-results-decoration {\n  -webkit-appearance:none;\n}\n\n.select-search-box__input:hover {\n  border-color: #2FCC8B;\n}\n\n.select-search-box__input:not([readonly]):focus {\n  cursor: initial;\n}\n\n.select-search-box__select {\n  background: #fff;\n  box-shadow: 0 .0625rem .125rem rgba(0, 0, 0, 0.15);\n}\n\n.select-search-box:not(.select-search-box--multiple) .select-search-box__select {\n  position: absolute;\n  z-index: 2;\n  top: 53px;\n  right: 0;\n  left: 0;\n  overflow: auto;\n  max-height: 360px;\n}\n\n.select-search-box__options {\n  list-style: none;\n  padding-left: 0;\n  margin: 0;\n}\n\n.select-search-box__option {\n  display: flex;\n  align-items: center;\n  justify-content: start;\n  height: 47px;\n  width: 100%;\n  padding: 0 16px;\n  background: #fff;\n  border: none;\n  outline: none;\n  font-size: 14px;\n  text-align: left;\n  cursor: pointer;\n}\n\n.select-search-box__option.is-selected {\n  background: #2FCC8B;\n  color: #fff;\n}\n\n.select-search-box__option.is-highlighted,\n.select-search-box__option:not(.is-selected):hover {\n  background: rgba(47, 204, 139, 0.1);\n}\n\n.select-search-box__option.is-highlighted.is-selected,\n.select-search-box__option.is-selected:hover {\n  background: #2eb378;\n  color: #fff;\n}", ""]);
// Exports
module.exports = exports;


/***/ }),
/* 58 */
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
const CardIcon_1 = __webpack_require__(52);
const api_1 = __webpack_require__(33);
__webpack_require__(59);
class Card extends react_1.Component {
    constructor(props) {
        super(props);
        this.vote = (event) => {
            const eventID = event.currentTarget.dataset.eventid;
            const cardID = event.currentTarget.dataset.cardid;
            const savedVote = localStorage.getItem(`kudosVote-${eventID}`);
            let voteData = {
                cardID: [],
                eventID
            };
            if (savedVote) {
                voteData = JSON.parse(savedVote);
            }
            voteData.cardID.push(cardID);
            if (!this.alreadyVoted(eventID, cardID)) {
                // API call to increment likes
                api_1.like(cardID)
                    .then(() => {
                    document.dispatchEvent(new CustomEvent('kudoz::cardListRefresh'));
                })
                    .catch((err) => {
                    console.log(`Error: like not inserted - ${err}`);
                });
                this.setState({ voted: true });
                localStorage.setItem(`kudosVote-${eventID}`, JSON.stringify(voteData));
            }
            return;
        };
        this.state = {
            voted: false
        };
    }
    render() {
        return (react_1.default.createElement("div", { className: "card" },
            react_1.default.createElement("div", { className: "card__icon" },
                react_1.default.createElement(CardIcon_1.CardIcon, { cardType: this.props.cardType })),
            react_1.default.createElement("div", { className: this.props.highlighted ? 'card__text-highlighted ' : 'card__text' },
                react_1.default.createElement("h3", null, this.props.awarded),
                react_1.default.createElement("p", null, this.props.text)),
            this.yourChoice(this.props.eventID, this.props.cardID) ? (react_1.default.createElement("div", { className: "card__likes-yourChoice", title: "your choice" }, this.props.likes)) : (react_1.default.createElement("div", { onClick: this.vote, "data-eventid": this.props.eventID, "data-cardid": this.props.cardID, className: "card__likes", title: "vote" }, this.props.likes))));
    }
    alreadyVoted(eventID, cardID) {
        const savedVote = localStorage.getItem(`kudosVote-${eventID}`);
        if (savedVote) {
            const data = JSON.parse(savedVote);
            if (data.cardID.includes(cardID)) {
                return true;
            }
        }
        return false;
    }
    yourChoice(eventID, cardID) {
        const savedVote = localStorage.getItem(`kudosVote-${eventID}`);
        if (savedVote) {
            const data = JSON.parse(savedVote);
            if (data.cardID.includes(cardID)) {
                return true;
            }
        }
        return false;
    }
}
exports.default = Card;


/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(39);
            var content = __webpack_require__(60);

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
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(41);
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, ":root {\n  --card-bg-color-text: rgba(255, 255, 255, 0.9);\n  --card-bg-color-body-highlighted: rgba(253, 240, 213, 0.9);\n  --card-bg-color-icon: linear-gradient(180deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0) 100%),\n    rgba(198, 216, 211, 0.9);\n  --card-text-color-h3: #331832;\n  --card-text-color: #6d686d;\n  --card-bg-color-likes: #f0544f;\n  --card-bg-color-likes-noVote: #bcbdc4;\n  --card-text-color-likes: #ffffff;\n}\n\n.card {\n  display: flex;\n  position: relative;\n  min-height: 80px;\n  border-radius: 0px 10px 10px 0px;\n  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);\n  background: transparent;\n  border-radius: 10px;\n  margin: 11px;\n}\n\n.card .card__icon {\n  min-width: 70px;\n  width: 70px;\n  background: var(--card-bg-color-icon);\n  border-radius: 10px 0px 0px 10px;\n  text-align: center;\n}\n\n.card .card__icon img {\n  width: 33px;\n  margin: 0 auto;\n}\n\n.card .card__text,\n.card .card__text-highlighted {\n  min-width: 226px;\n  width: 100%;\n}\n\n.card .card__text,\n.card .card__text-highlighted {\n  border-radius: 0px 10px 10px 0px;\n  padding: 20px 17px 20px 17px;\n  background: var(--card-bg-color-text);\n}\n.card .card__text-highlighted {\n  background: var(--card-bg-color-body-highlighted);\n}\n\n.card .card__text h3,\n.card .card__text-highlighted h3 {\n  font-family: 'Ubuntu_Normal';\n  font-size: 14px;\n  line-height: 16px;\n  color: var(--card-text-color-h3);\n  margin: 0px;\n  margin-bottom: 6px;\n}\n\n.card .card__text p,\n.card .card__text-highlighted p {\n  font-family: 'Ubuntu_Normal';\n  font-size: 11px;\n  line-height: 14px;\n  color: var(--card-text-color);\n  margin: 0px;\n}\n\n.card .card__likes,\n.card .card__likes-yourChoice {\n  width: 22px;\n  height: 22px;\n  position: absolute;\n  top: -11px;\n  right: -11px;\n  background: var(--card-bg-color-likes-noVote);\n  border-radius: 50%;\n  color: var(--card-text-color-likes);\n  font-family: 'Ubuntu_Normal';\n  font-size: 10px;\n  line-height: 22px;\n  text-align: center;\n  transition: background-color 0.3s ease-out;\n}\n.card .card__likes {\n  cursor: pointer;\n}\n\n.card .card__likes-yourChoice {\n  background: var(--card-bg-color-likes);\n  animation: pulse 0.3s;\n  animation-iteration-count: 2;\n}\n\n@keyframes pulse {\n  from {\n    transform: scale(1, 1);\n  }\n  50% {\n    transform: scale(1.3, 1.3);\n  }\n  to {\n    transform: scale(1, 1);\n  }\n}\n", ""]);
// Exports
module.exports = exports;


/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(39);
            var content = __webpack_require__(62);

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
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(41);
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, ".kudoEvent {\n  background: url('/img/lich_king_bg.jpg');\n  background-size: cover;\n  font-family: 'Ubuntu', Arial, Helvetica, sans-serif;\n  display: flex;\n  flex-direction: row;\n  padding-right: 0px;\n  height: 100vh;\n  width: 100%;\n}\n\n.kudoEvent .event_info {\n  flex-basis: 460px;\n  width: 460px;\n  min-width: 460px;\n  height: 100%;\n  display: flex;\n  flex-direction: column;\n  align-items: start;\n  justify-content: center;\n  padding: 50px 50px 0 100px;\n}\n\n.kudoEvent .event_info > div {\n  width: 100%;\n  margin-bottom: 50px;\n}\n\n.kudoEvent .event_info .eventInfo {\n  margin-bottom: 28px;\n}\n\n.kudoEvent .event_info .kudoForm {\n  margin-bottom: 0px;\n}\n\n.kudoEvent .event_cards {\n  margin-left: 100px;\n  padding-top: 50px;\n  height: 100%;\n  width: 100%;\n  display: flex;\n  flex-direction: row;\n  flex-wrap: wrap;\n  overflow-x: scroll;\n  flex: 1;\n}\n\n.kudoEvent .event_cards .card {\n  width: 296px;\n}\n\n@media only screen and (max-width: 800px) {\n  .kudoEvent {\n    padding: 0 0 0 20px;\n  }\n\n  .kudoEvent .event_info {\n    flex-basis: 320px;\n    width: 320px;\n    min-width: 320px;\n    padding: 0px 10px 0 0px;\n  }\n\n  .kudoEvent .event_cards {\n    margin-left: 50px;\n  }\n}\n\n@media only screen and (max-width: 580px) {\n  .kudoEvent {\n    background: #0b1f39;\n    background: linear-gradient(140deg, #825640 0%, #0b1f39 100%);\n    flex-direction: column;\n    padding: 0px;\n    height: auto;\n  }\n\n  .kudoEvent .event_info {\n    width: 100%;\n    margin: 0;\n    padding: 7%;\n  }\n\n  .kudoEvent .event_cards {\n    width: 100%;\n    margin: 0;\n    padding: 7%;\n  }\n\n  .kudoEvent .event_cards .card {\n    margin: 10px 0;\n    min-width: unset;\n    width: 100%;\n  }\n\n  .kudoEvent .event_cards .card .card__text {\n    min-width: unset;\n  }\n}\n", ""]);
// Exports
module.exports = exports;


/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(39);
            var content = __webpack_require__(64);

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
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(41);
var ___CSS_LOADER_AT_RULE_IMPORT_0___ = __webpack_require__(65);
exports = ___CSS_LOADER_API_IMPORT___(false);
exports.i(___CSS_LOADER_AT_RULE_IMPORT_0___);
// Module
exports.push([module.i, "\n", ""]);
// Exports
module.exports = exports;


/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(41);
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, "/* Box sizing rules */\n*,\n*::before,\n*::after {\n  box-sizing: border-box;\n}\n\n/* Remove default padding */\nul[class],\nol[class] {\n  padding: 0;\n}\n\n/* Remove default margin */\nbody,\nh1,\nh2,\nh3,\nh4,\np,\nul[class],\nol[class],\nli,\nfigure,\nfigcaption,\nblockquote,\ndl,\ndd {\n  margin: 0;\n}\n\n/* Set core body defaults */\nbody {\n  min-height: 100vh;\n  scroll-behavior: smooth;\n  text-rendering: optimizeSpeed;\n  line-height: 1.5;\n}\n\n/* Remove list styles on ul, ol elements with a class attribute */\nul[class],\nol[class] {\n  list-style: none;\n}\n\n/* A elements that don't have a class get default styles */\na:not([class]) {\n  text-decoration-skip-ink: auto;\n}\n\n/* Make images easier to work with */\nimg {\n  max-width: 100%;\n  display: block;\n}\n\n/* Inherit fonts for inputs and buttons */\ninput,\nbutton,\ntextarea,\nselect {\n  font: inherit;\n}\n", ""]);
// Exports
module.exports = exports;


/***/ })
],[[0,"runtime","vendor","common"]]]);
//# sourceMappingURL=main.js.map