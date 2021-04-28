(window["webpackJsonpKudoz"] = window["webpackJsonpKudoz"] || []).push([["main"],{

/***/ 0:
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
__webpack_require__(285);
function App() {
    return (React.createElement(react_router_dom_1.BrowserRouter, null,
        React.createElement(react_router_dom_1.Switch, null,
            React.createElement(react_router_dom_1.Route, { exact: true, path: "/" },
                React.createElement("div", null, "Ahoj, toto je main routa, tu mozno raz daco bude, mozno nie :P")),
            React.createElement(react_router_dom_1.Route, { path: "/priklad" },
                React.createElement("div", null, "Priklad na inu route ")),
            React.createElement(react_router_dom_1.Route, { path: "/event/:id", component: KudoEvent_1.default }))));
}
exports.default = App;
ReactDOM.render(React.createElement(App, null), document.getElementById('app'));


/***/ }),

/***/ 219:
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
__webpack_require__(220);
exports.Knight = (props) => (React.createElement("div", { className: "kudoKnight" },
    React.createElement("div", null,
        React.createElement("img", { src: "/img/007-crusader.png" })),
    React.createElement("div", { className: "kudoKnight__content" },
        React.createElement("h3", null, "Kudo Knight"),
        React.createElement("h2", null, props.mostKudos))));


/***/ }),

/***/ 220:
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(221);
            var content = __webpack_require__(222);

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

/***/ 222:
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(223);
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, ".kudoKnight {\n  font-family: 'Ubuntu', Arial, Helvetica, sans-serif;\n  background: linear-gradient(180deg, #ffffff 0%, rgba(255, 255, 255, 0) 100%), #c6d8d3;\n  display: flex;\n  position: relative;\n  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);\n  border-radius: 10px;\n  padding: 5px;\n}\n.kudoKnight__content {\n  margin-left: 110px;\n  margin-bottom: 16px;\n}\n.kudoKnight h3 {\n  font-family: 'Ubuntu_Medium';\n  margin-top: 20px;\n  font-size: 12px;\n  color: #6d686d;\n}\n\n.kudoKnight h2 {\n  font-family: 'Ubuntu_Medium';\n  font-size: 18px;\n  color: #331832;\n  margin-top: -5px;\n  margin-left: 0px;\n}\n.kudoKnight img {\n  position: absolute;\n  height: 120%;\n  bottom: 0;\n}\n", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ 224:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(__webpack_require__(1));
__webpack_require__(225);
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

/***/ 225:
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(221);
            var content = __webpack_require__(226);

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

/***/ 226:
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(223);
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, ":root {\n  --text-color: #ffffff;\n}\n\n.eventInfo {\n  position: relative;\n  margin-bottom: 10px;\n}\n\n.eventInfo h1,\nh2 {\n  font-family: 'Ubuntu_Normal';\n  font-style: normal;\n  color: var(--text-color);\n  margin: 2px;\n}\n\n.eventInfo h1 {\n  font-size: 24px;\n  line-height: 28px;\n}\n\n.eventInfo h2 {\n  font-size: 14px;\n  line-height: 17px;\n}\n", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ 227:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(__webpack_require__(1));
const react_select_search_1 = __importDefault(__webpack_require__(228));
const api_1 = __webpack_require__(33);
const constants_1 = __webpack_require__(234);
const CardIcon_1 = __webpack_require__(235);
const data_1 = __importDefault(__webpack_require__(238));
__webpack_require__(239);
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
        return (react_1.default.createElement("div", { className: "kudoForm", ref: this.formRef },
            react_1.default.createElement("div", { className: "typePicker" }, this.typePicker()),
            react_1.default.createElement("div", { className: "main" },
                react_1.default.createElement("div", { className: "name" },
                    "Name ",
                    this.peoplePicker()),
                react_1.default.createElement("div", { className: "message" },
                    react_1.default.createElement("textarea", { ref: this.messageRef, placeholder: "Message" }))),
            react_1.default.createElement("div", { className: `submit ${buttonClass}`, onClick: () => this.onSubmit() }, "Give Kudos")));
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
    renderValue(label) {
        return (react_1.default.createElement("div", { className: "typeTitle" },
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
        return react_1.default.createElement(react_select_search_1.default, { options: PEOPLE, onChange: handleClick, placeholder: "Select name", value: this.state.name });
    }
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
            else if (!this.messageRef.current ||
                (this.messageRef.current && this.messageRef.current.value.trim().length === 0) ||
                (this.messageRef.current && this.messageRef.current.value === 'Sprava')) {
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
                    .catch(() => {
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

/***/ 235:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(__webpack_require__(1));
const constants_1 = __webpack_require__(234);
__webpack_require__(236);
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

/***/ 236:
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(221);
            var content = __webpack_require__(237);

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

/***/ 237:
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(223);
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, ".cardIcon {\n  width: 100%;\n  height: 100%;\n}\n\n.cardIcon img {\n  width: 100%;\n  height: 100%;\n  min-width: 20px;\n  min-height: 20px;\n}\n", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ 238:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.default = [
    {
        "name": "Andrejko Maros"
    },
    {
        "name": "Angelovic Kamil"
    },
    {
        "name": "Aron Martin"
    },
    {
        "name": "Babela Jan"
    },
    {
        "name": "Birka Miroslav"
    },
    {
        "name": "Brunacky Tomas"
    },
    {
        "name": "Cernak Adrian"
    },
    {
        "name": "Durisin Martin"
    },
    {
        "name": "Fecko Erik"
    },
    {
        "name": "Gromina Juraj"
    },
    {
        "name": "Halupka Arben"
    },
    {
        "name": "Halupka Ivan"
    },
    {
        "name": "Hanusovsky Henrich"
    },
    {
        "name": "Istvan Miroslav"
    },
    {
        "name": "Jassova Monika"
    },
    {
        "name": "Kazmirsky Peter"
    },
    {
        "name": "Langa Adam"
    },
    {
        "name": "Lencses Rastislav"
    },
    {
        "name": "Lichvarova Jarmila"
    },
    {
        "name": "Malatakova Miroslava"
    },
    {
        "name": "Mezei Marek"
    },
    {
        "name": "Mezei Stefan"
    },
    {
        "name": "Miskovic Lubomir"
    },
    {
        "name": "Oscipovsky Lukas"
    },
    {
        "name": "Repcin Rudolf"
    },
    {
        "name": "Ruda Iveta"
    },
    {
        "name": "Ruscak Michal"
    },
    {
        "name": "Rzuhovska Veronika"
    },
    {
        "name": "Saloky Lubos"
    },
    {
        "name": "Sciranka Jaroslav"
    },
    {
        "name": "Sipkai Zoltan"
    },
    {
        "name": "Sorad Jan"
    },
    {
        "name": "Spisak Martin"
    },
    {
        "name": "Sroka Jozef"
    },
    {
        "name": "Svec Erik"
    },
    {
        "name": "Szabova Patricia"
    },
    {
        "name": "Tomko Martin"
    },
    {
        "name": "Tothova Diana"
    },
    {
        "name": "Ulicny Martin"
    },
    {
        "name": "Vargova Veronika"
    },
    {
        "name": "Vitkovic Martin"
    },
    {
        "name": "Sicak Michal"
    },
    {
        "name": "Vancikova Alena"
    },
    {
        "name": "Neceda Samuel"
    },
    {
        "name": "Kocik Bruno"
    },
    {
        "name": "Kazmirsky Andrej"
    },
    {
        "name": "Vojtko Robert"
    }
];


/***/ }),

/***/ 239:
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(221);
            var content = __webpack_require__(240);

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

/***/ 240:
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(223);
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, ".kudoForm {\n  background-color: #ffffff;\n  border-radius: 10px;\n  font-family: 'Ubuntu_Normal';\n}\n\n.kudoForm input,\n.kudoForm textarea {\n  font-family: 'Ubuntu_Normal';\n}\n\n.kudoForm .typePicker {\n  font-family: 'Ubuntu_Normal';\n  display: flex;\n  align-items: center;\n  height: 67px;\n  border-radius: 10px 10px 0 0;\n  background-color: #fdf0d5;\n  font-size: 20px;\n  color: #331832;\n  text-transform: capitalize;\n  cursor: pointer;\n  transition: background-color 0.3s ease;\n}\n\n.kudoForm .typePicker:hover {\n  background-color: #f9e6a3;\n}\n\n.kudoForm .typePicker .cardIcon {\n  max-width: 40px;\n  max-height: 40px;\n  margin-right: 16px;\n}\n\n.kudoForm .typeTitle {\n  display: flex;\n  flex-direction: row;\n  justify-content: center;\n  align-items: center;\n}\n\n.kudoForm .typePicker .select-search-box__options {\n  display: flex;\n  flex-wrap: wrap;\n}\n.kudoForm .typePicker .select-search-box__option:hover {\n  background: #f7e8d4;\n}\n.kudoForm .typePicker .select-search-box__option > div {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n\n.kudoForm .typePicker .select-search-box__options .cardIcon {\n  margin-right: 10px;\n  width: 30px;\n  max-width: 30px;\n  max-height: 30px;\n  min-width: 30px;\n}\n\n.kudoForm .typePicker .select-search-box__options li {\n  width: 50%;\n  padding: 14px;\n  height: 59px;\n  text-transform: capitalize;\n  background-color: #fbf8f4;\n}\n\n.kudoForm .typePicker .select-search-box__options li:hover {\n  background: rgba(47, 204, 139, 0.1);\n}\n\n.kudoForm .main {\n  height: 237px;\n  display: flex;\n  flex-direction: column;\n}\n\n.kudoForm .name {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 0 23px;\n  height: 55px;\n  font-size: 12px;\n  color: #6d686d;\n  border-bottom: 1px solid rgba(198, 216, 211, 0.3);\n}\n\n.kudoForm .name .select-search-box__search {\n  background-color: transparent;\n  width: 100%;\n  height: 53px;\n  margin-left: 20px;\n  border-radius: initial;\n  border: none;\n  font-size: 16px;\n  color: #6d686d;\n  margin-bottom: 0px;\n}\n\n.kudoForm .name .select-search-box .select-search-box__select {\n  top: 55px;\n  width: calc(100% - 23px);\n}\n\n.kudoForm .message {\n  display: flex;\n  align-items: center;\n  padding: 21px 23px;\n  flex-grow: 1;\n}\n\n.kudoForm .message textarea {\n  flex-grow: 1;\n  height: 100%;\n  width: 100%;\n  font-size: 12px;\n  color: #6d686d;\n  resize: none;\n  border: none;\n  outline: none;\n  background: transparent;\n  padding: 0;\n  margin: 0;\n}\n\n.kudoForm .name.red,\n.kudoForm .message.red {\n  animation: blink 0.7s ease;\n}\n\n.kudoForm .submit {\n  font-family: 'Ubuntu_Bold';\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  height: 49px;\n  border-radius: 0 0 10px 10px;\n  font-size: 18px;\n  color: #ffffff;\n  font-weight: bold;\n  background: linear-gradient(180deg, #f0544f 0%, #d74945 100%), #f0544f;\n  cursor: pointer;\n}\n.kudoForm .submit:hover {\n  background: #de3934;\n}\n\n.kudoForm .submit.disabled {\n  pointer-events: none;\n  background: linear-gradient(180deg, #cecece 0%, #bcbdc4 100%), #bcbdc4;\n}\n\n@keyframes blink {\n  0% {\n    background: transparent;\n  }\n  50% {\n    background: #f0544fc7;\n  }\n  100% {\n    background: transparent;\n  }\n}\n\n/* react-select-search */\n.select-search-box {\n  width: 100%;\n  position: relative;\n  box-sizing: border-box;\n  font-family: 'Ubuntu_Normal';\n}\n\n.select-search-box *,\n.select-search-box *::after,\n.select-search-box *::before {\n  box-sizing: inherit;\n}\n\n.select-search-box__select {\n  display: none;\n}\n\n.select-search-box__select.select-search-box__select--display {\n  display: block;\n  border-radius: 0;\n}\n\n.select-search-box__search {\n  outline: none;\n}\n\n.select-search-box__value {\n  position: relative;\n}\n\n.select-search-box__value::after {\n  content: '';\n  display: inline-block;\n  position: absolute;\n  top: calc(50% - 9px);\n  right: 19px;\n  width: 11px;\n  height: 11px;\n  transform: rotate(45deg);\n  border-right: 1px solid #000;\n  border-bottom: 1px solid #000;\n  pointer-events: none;\n}\n\n.select-search-box__input {\n  display: block;\n  height: 36px;\n  width: 100%;\n  padding: 0 16px;\n  background: #fff;\n  border: none;\n  box-shadow: 0 0.0625rem 0.125rem rgba(0, 0, 0, 0.15);\n  border-radius: 3px;\n  outline: none;\n  font-size: 14px;\n  text-align: left;\n  line-height: 36px;\n  -webkit-appearance: none;\n}\n\n.select-search-box__input::-webkit-search-decoration,\n.select-search-box__input::-webkit-search-cancel-button,\n.select-search-box__input::-webkit-search-results-button,\n.select-search-box__input::-webkit-search-results-decoration {\n  -webkit-appearance: none;\n}\n\n.select-search-box__input:hover {\n  border-color: #2fcc8b;\n}\n\n.select-search-box__input:not([readonly]):focus {\n  cursor: initial;\n}\n\n.select-search-box__select {\n  background: #fff;\n  box-shadow: 0 0.0625rem 0.125rem rgba(0, 0, 0, 0.15);\n}\n\n.select-search-box:not(.select-search-box--multiple) .select-search-box__select {\n  position: absolute;\n  z-index: 2;\n  top: 53px;\n  right: 0;\n  left: 0;\n  overflow: auto;\n  max-height: 360px;\n}\n\n.select-search-box__options {\n  list-style: none;\n  padding-left: 0;\n  margin: 0;\n}\n\n.select-search-box__option {\n  display: flex;\n  align-items: center;\n  justify-content: start;\n  height: 47px;\n  width: 100%;\n  padding: 0 16px;\n  background: #fff;\n  border: none;\n  outline: none;\n  font-size: 14px;\n  text-align: left;\n  cursor: pointer;\n}\n\n.select-search-box__option.is-selected {\n  background: #2fcc8b;\n  color: #fff;\n}\n\n.select-search-box__option.is-highlighted,\n.select-search-box__option:not(.is-selected):hover,\n.select-search-box__option:not(.select-search-box__option--hover):hover,\n.select-search-box__option--hover {\n  background: rgba(47, 204, 139, 0.1);\n}\n\n.select-search-box__option--hover:hover,\n.select-search-box__option--hover:not(.is-selected):hover {\n  background: rgba(47, 204, 139, 0.2);\n}\n", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ 241:
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
const CardIcon_1 = __webpack_require__(235);
const api_1 = __webpack_require__(33);
__webpack_require__(242);
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
            if (this.props.isActive) {
                if (savedVote) {
                    voteData = JSON.parse(savedVote);
                }
                voteData.cardID.push(cardID);
                if (!this.alreadyVoted(eventID, cardID)) {
                    // API call to increment likes
                    api_1.like(cardID)
                        .then(() => {
                        window.setTimeout(() => {
                            document.dispatchEvent(new CustomEvent('kudoz::cardListRefresh'));
                        }, 500);
                    })
                        .catch((err) => {
                        console.log(`Error: like not inserted - ${err}`);
                    });
                    this.setState({ voted: true });
                    localStorage.setItem(`kudosVote-${eventID}`, JSON.stringify(voteData));
                }
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
            this.getVoteButton()));
    }
    getVoteButton() {
        if (this.props.isActive === false) {
            return (react_1.default.createElement("div", { className: "card__likes-noVote", title: "event is inactive" }, this.props.likes));
        }
        else if (this.yourChoice(this.props.eventID, this.props.cardID)) {
            return (react_1.default.createElement("div", { className: "card__likes-yourChoice", title: "your choice" }, this.props.likes));
        }
        else {
            return (react_1.default.createElement("div", { onClick: this.vote, "data-eventid": this.props.eventID, "data-cardid": this.props.cardID, className: "card__likes", title: "vote" }, this.props.likes));
        }
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

/***/ 242:
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(221);
            var content = __webpack_require__(243);

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

/***/ 243:
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(223);
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, ":root {\n  --card-bg-color-text: rgba(255, 255, 255, 0.9);\n  --card-bg-color-body-highlighted: rgba(253, 240, 213, 0.9);\n  --card-bg-color-icon: linear-gradient(180deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0) 100%),\n    rgba(198, 216, 211, 0.9);\n  --card-text-color-h3: #331832;\n  --card-text-color: #6d686d;\n  --card-bg-color-likes: #f0544f;\n  --card-bg-color-likes-yourChoice: #2eb378;\n  --card-bg-color-likes-noVote: #bcbdc4;\n  --card-text-color-likes: #ffffff;\n}\n\n.card {\n  display: flex;\n  position: relative;\n  min-height: 80px;\n  border-radius: 0px 10px 10px 0px;\n  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);\n  background: transparent;\n  border-radius: 10px;\n  margin: 11px;\n}\n\n.card .card__icon {\n  min-width: 70px;\n  width: 70px;\n  background: var(--card-bg-color-icon);\n  border-radius: 10px 0px 0px 10px;\n  text-align: center;\n}\n\n.card .card__icon img {\n  width: 33px;\n  margin: 0 auto;\n}\n\n.card .card__text,\n.card .card__text-highlighted {\n  width: 100%;\n}\n\n.card .card__text,\n.card .card__text-highlighted {\n  border-radius: 0px 10px 10px 0px;\n  padding: 20px 17px 20px 17px;\n  background: var(--card-bg-color-text);\n}\n.card .card__text-highlighted {\n  background: var(--card-bg-color-body-highlighted);\n}\n\n.card .card__text h3,\n.card .card__text-highlighted h3 {\n  font-family: 'Ubuntu_Medium';\n  font-size: 14px;\n  line-height: 16px;\n  color: var(--card-text-color-h3);\n  margin: 0px;\n  margin-bottom: 6px;\n}\n\n.card .card__text p,\n.card .card__text-highlighted p {\n  font-family: 'Ubuntu_Normal';\n  font-size: 12px;\n  line-height: 14px;\n  color: var(--card-text-color);\n  margin: 0px;\n}\n\n.card .card__likes,\n.card .card__likes-yourChoice,\n.card .card__likes-noVote {\n  width: 22px;\n  height: 22px;\n  position: absolute;\n  top: -11px;\n  right: -11px;\n  background: var(--card-bg-color-likes-yourChoice);\n  border-radius: 50%;\n  color: var(--card-text-color-likes);\n  font-family: 'Ubuntu_Bold';\n  font-size: 10px;\n  line-height: 22px;\n  text-align: center;\n  transition: background-color 0.3s ease-out;\n}\n.card .card__likes {\n  cursor: pointer;\n}\n\n.card .card__likes-noVote {\n  background: var(--card-bg-color-likes-noVote);\n}\n\n.card .card__likes-yourChoice {\n  background: var(--card-bg-color-likes);\n  animation: pulse 0.3s;\n  animation-iteration-count: 2;\n}\n\n@keyframes pulse {\n  from {\n    transform: scale(1, 1);\n  }\n  50% {\n    transform: scale(1.3, 1.3);\n  }\n  to {\n    transform: scale(1, 1);\n  }\n}\n", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ 244:
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
const client_1 = __webpack_require__(34);
class CardNotification extends react_1.Component {
    constructor(props) {
        super(props);
        this.audio = new Audio('/audio/notification.wav');
        this.state = {
            play: this.props.playMusic ? this.props.playMusic : false
        };
        this.bind = {
            onEnded: this.onEnded.bind(this),
            onNotification: this.onNotification.bind(this)
        };
    }
    componentDidMount() {
        this.audio.addEventListener('ended', this.bind.onEnded);
        document.addEventListener('kudoz::newNotification', this.bind.onNotification);
    }
    componentWillUnmount() {
        this.audio.removeEventListener('ended', this.bind.onEnded);
        document.removeEventListener('kudoz::newNotification', this.bind.onNotification);
    }
    render() {
        this.state.play && client_1.soundTurnedOn() ? this.audio.play() : this.audio.pause();
        return react_1.default.createElement("div", null);
    }
    onEnded() {
        this.setState({ play: false });
    }
    onNotification() {
        this.setState({ play: true });
    }
}
exports.default = CardNotification;


/***/ }),

/***/ 245:
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
const SoundSwitch_1 = __importDefault(__webpack_require__(246));
__webpack_require__(249);
const react_switch_1 = __importDefault(__webpack_require__(251));
class KudoSettings extends react_1.Component {
    constructor(props) {
        super(props);
        this.state = { checked: window.location.href.includes('?tv=true') };
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(checked) {
        this.setState({ checked });
        const url = window.location.origin + window.location.pathname;
        window.setTimeout(() => {
            if (checked) {
                window.location.href = `${url}?tv=true`;
            }
            else {
                window.location.href = url;
            }
        }, 200);
    }
    render() {
        return (react_1.default.createElement("div", { className: "kudoSettings" },
            react_1.default.createElement("div", { className: "tv_mode" },
                "TV mode: ",
                react_1.default.createElement(react_switch_1.default, { onChange: this.handleChange, checked: this.state.checked })),
            react_1.default.createElement("div", { className: "sound_mode" },
                "Sound: ",
                react_1.default.createElement(SoundSwitch_1.default, null))));
    }
}
exports.default = KudoSettings;


/***/ }),

/***/ 246:
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
const client_1 = __webpack_require__(34);
__webpack_require__(247);
class SoundSwitch extends react_1.Component {
    constructor(props) {
        super(props);
        this.state = {
            sound: client_1.soundTurnedOn() ? 'on' : 'off'
        };
        this.bind = {
            onSoundOnOff: this.onSoundOnOff.bind(this)
        };
    }
    render() {
        return (react_1.default.createElement("div", { className: `soundSwitch ${this.state.sound === 'off' ? 'soundSwitch--off' : 'soundSwitch--on'}`, title: `${this.state.sound === 'off' ? 'Turn sound on' : 'Turn sound off'}`, onClick: this.bind.onSoundOnOff }));
    }
    onSoundOnOff() {
        this.setState({ sound: client_1.soundTurnedOn() ? 'off' : 'on' });
        const data = localStorage.getItem('kudosSettings');
        let settings;
        if (data) {
            settings = JSON.parse(data);
            if (settings && settings.sound === 'on') {
                settings.sound = 'off';
            }
            else {
                settings.sound = 'on';
            }
        }
        else {
            settings = { sound: 'on' };
        }
        localStorage.setItem('kudosSettings', JSON.stringify(settings));
    }
}
exports.default = SoundSwitch;


/***/ }),

/***/ 247:
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(221);
            var content = __webpack_require__(248);

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

/***/ 248:
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(223);
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, ".soundSwitch,\n.soundSwitch--on,\n.soundSwitch--off {\n  width: 20px;\n  height: 20px;\n  cursor: pointer;\n  margin-left: 10px;\n}\n\n.soundSwitch--on {\n  background: url('/img/volume.png');\n  background-size: 20px;\n}\n\n.soundSwitch--off {\n  background: url('/img/no-sound.png');\n  background-size: 20px;\n}\n", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ 249:
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(221);
            var content = __webpack_require__(250);

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

/***/ 250:
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(223);
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, ".kudoSettings {\n  position: absolute;\n  top: 10px;\n  right: 10px;\n  width: auto;\n  text-align: right;\n  display: flex;\n  justify-content: flex-end;\n  align-items: center;\n  color: #ffffff;\n}\n.tv_mode, .sound_mode {\n  margin: 0 10px;\n  display: flex;\n  align-items: center;\n}\n", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ 253:
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(221);
            var content = __webpack_require__(254);

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

/***/ 254:
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(223);
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, ".kudoEvent {\n  background: url('/img/lich_king_bg.jpg');\n  background-size: cover;\n  font-family: 'Ubuntu', Arial, Helvetica, sans-serif;\n  padding-right: 0px;\n  min-height: calc(100vh + 50px);\n  width: 100%;\n}\n\n.kudoEvent .event_info {\n  float: left;\n  flex-basis: 460px;\n  width: 460px;\n  min-width: 460px;\n  height: 100%;\n  display: flex;\n  flex-direction: column;\n  align-items: start;\n  justify-content: center;\n  padding: 50px 50px 0 100px;\n}\n\n.kudoEvent .event_info > div {\n  width: 100%;\n  margin-bottom: 50px;\n}\n\n.kudoEvent .event_info .eventInfo {\n  margin-bottom: 28px;\n}\n\n.kudoEvent .event_info .kudoForm {\n  margin-bottom: 0px;\n}\n\n.kudoEvent .event_cards {\n  margin-left: 100px;\n  padding: 50px 0;\n  display: flex;\n  flex-direction: row;\n  flex-wrap: wrap;\n  overflow-y: auto;\n  flex: 1;\n}\n\n.kudoEvent .event_cards .card {\n  width: 296px;\n}\n\n.kudoEvent .newCard {\n  display: flex;\n  z-index: 10;\n  width: 100%;\n  height: 100%;\n  top: 0;\n  left: 0;\n  padding: 4%;\n  position: absolute;\n  background: rgba(83, 83, 83, 0.3);\n}\n\n.kudoEvent .newCard.hidden {\n  display: none;\n}\n\n.kudoEvent .newCard > div {\n  position: relative;\n  margin: auto;\n  width: 70%;\n  height: 70%;\n  animation: popup 0.3s ease-out;\n}\n\n.kudoEvent .newCard .close {\n  position: absolute;\n  right: 12px;\n  top: 12px;\n  width: 12px;\n  height: 12px;\n  z-index: 11;\n  cursor: pointer;\n}\n\n.kudoEvent .newCard .card {\n  height: 100%;\n  width: 100%;\n  margin: 0;\n}\n\n.kudoEvent .newCard .card .card__icon {\n  width: 33%;\n  background: linear-gradient(180deg, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0) 100%),\n    rgba(198, 216, 211, 1);\n}\n\n.kudoEvent .newCard .card .card__icon img {\n  width: 60%;\n}\n\n.kudoEvent .newCard .card .card__text,\n.kudoEvent .newCard .card .card__text-highlighted {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  background: #fdf0d5;\n}\n\n.kudoEvent .newCard .card .card__text h3,\n.kudoEvent .newCard .card .card__text-highlighted h3 {\n  font-size: 46px;\n  line-height: 54px;\n  padding: 1rem 2rem;\n  text-align: center;\n  margin: 0;\n}\n\n.kudoEvent .newCard .card .card__text p,\n.kudoEvent .newCard .card .card__text-highlighted p {\n  font-size: 40px;\n  line-height: 49px;\n  padding: 1rem 2rem;\n  display: flex;\n  justify-content: center;\n  overflow: hidden;\n}\n\n.kudoEvent .newCard .card .card__likes {\n  display: none;\n}\n\n@media only screen and (max-width: 800px) {\n  .kudoEvent {\n    padding: 0 0 0 20px;\n  }\n\n  .kudoEvent .event_info {\n    flex-basis: 320px;\n    width: 320px;\n    min-width: 320px;\n    padding: 0px 10px 0 0px;\n  }\n\n  .kudoEvent .event_cards {\n    margin-left: 50px;\n  }\n}\n\n@media only screen and (max-width: 580px) {\n  .kudoEvent {\n    background: #0b1f39;\n    background: linear-gradient(140deg, #825640 0%, #0b1f39 100%);\n    flex-direction: column;\n    padding: 0px;\n    height: auto;\n  }\n\n  .kudoEvent .event_info {\n    width: 100%;\n    margin: 0;\n    padding: 7%;\n  }\n\n  .kudoEvent .event_cards {\n    width: 100%;\n    margin: 0;\n    padding: 7%;\n  }\n\n  .kudoEvent .event_cards .card {\n    margin: 10px 0;\n    min-width: unset;\n    width: 100%;\n  }\n\n  .kudoEvent .event_cards .card .card__text {\n    min-width: unset;\n  }\n\n  .kudoEvent .newCard {\n    display: none;\n  }\n}\n\n@keyframes popup {\n  0% {\n    transform: scale(0);\n  }\n  100% {\n    transform: scale(1);\n  }\n}", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ 255:
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
const qrcode_1 = __importDefault(__webpack_require__(256));
class QRcode extends react_1.Component {
    componentDidMount() {
        const canvas = document.getElementById('canvas');
        qrcode_1.default.toCanvas(canvas, this.props.url, { errorCorrectionLevel: 'H', width: 190 });
    }
    render() {
        return react_1.default.createElement("canvas", { id: "canvas" });
    }
}
exports.default = QRcode;


/***/ }),

/***/ 285:
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(221);
            var content = __webpack_require__(286);

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

/***/ 286:
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(223);
var ___CSS_LOADER_AT_RULE_IMPORT_0___ = __webpack_require__(287);
exports = ___CSS_LOADER_API_IMPORT___(false);
exports.i(___CSS_LOADER_AT_RULE_IMPORT_0___);
// Module
exports.push([module.i, "\n", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ 287:
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(223);
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, "/* Box sizing rules */\n*,\n*::before,\n*::after {\n  box-sizing: border-box;\n}\n\n/* Remove default padding */\nul[class],\nol[class] {\n  padding: 0;\n}\n\n/* Remove default margin */\nbody,\nh1,\nh2,\nh3,\nh4,\np,\nul[class],\nol[class],\nli,\nfigure,\nfigcaption,\nblockquote,\ndl,\ndd {\n  margin: 0;\n}\n\nh1,\nh2,\nh3,\nh4 {\n  font-weight: normal;\n}\n\n/* Set core body defaults */\nbody {\n  min-height: 100vh;\n  scroll-behavior: smooth;\n  text-rendering: optimizeSpeed;\n  line-height: 1.5;\n}\n\n/* Remove list styles on ul, ol elements with a class attribute */\nul[class],\nol[class] {\n  list-style: none;\n}\n\n/* A elements that don't have a class get default styles */\na:not([class]) {\n  text-decoration-skip-ink: auto;\n}\n\n/* Make images easier to work with */\nimg {\n  max-width: 100%;\n  display: block;\n}\n\n/* Inherit fonts for inputs and buttons */\ninput,\nbutton,\ntextarea,\nselect {\n  font: inherit;\n}\n", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ 32:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(__webpack_require__(1));
const api_1 = __webpack_require__(33);
const client_1 = __webpack_require__(34);
const Knight_1 = __webpack_require__(219);
const EventInfo_1 = __webpack_require__(224);
const KudoForm_1 = __importDefault(__webpack_require__(227));
const Card_1 = __importDefault(__webpack_require__(241));
const CardNotification_1 = __importDefault(__webpack_require__(244));
const KudoSettings_1 = __importDefault(__webpack_require__(245));
__webpack_require__(253);
const QRcode_1 = __importDefault(__webpack_require__(255));
const MODAL_INTERVAL = 120 * 1000;
const MODAL_TIME = 120 * 1000;
const REFRESH = 15 * 1000; // 60 seconds
function CardModal({ newCardProps, onClick }) {
    return (react_1.default.createElement("div", { className: "newCard" },
        react_1.default.createElement("div", null,
            react_1.default.createElement("div", { className: "close", onClick: onClick },
                react_1.default.createElement("img", { src: "/img/cancel.png" })),
            react_1.default.createElement(Card_1.default, Object.assign({}, newCardProps)))));
}
class KudoEvent extends react_1.default.Component {
    constructor(props) {
        super(props);
        this.eventId = this.props.match.params.id;
        this.state = {
            cards: [],
            event: undefined,
            is_active: false,
            shouldDisplayModal: false
        };
        this.bind = {
            onCardListRefresh: this.onCardListRefresh.bind(this),
            onHideModal: this.onHideModal.bind(this)
        };
    }
    componentDidMount() {
        this.getData();
        document.addEventListener('kudoz::cardListRefresh', this.bind.onCardListRefresh);
        window.clearInterval(this.interval);
        this.interval = window.setInterval(() => {
            this.getData();
        }, REFRESH);
    }
    componentDidUpdate(_prevProps, prevState) {
        if (prevState.cards.length < this.state.cards.length && !this.state.shouldDisplayModal) {
            const new_card = this.state.cards[this.state.cards.length - 1];
            const diff = new Date().getTime() - MODAL_INTERVAL;
            if (new_card && new_card.created > diff) {
                window.clearTimeout(this.timeout);
                this.setState({ shouldDisplayModal: true });
                this.timeout = window.setTimeout(() => {
                    this.setState({ shouldDisplayModal: false });
                }, MODAL_TIME);
            }
        }
    }
    componentWillUnmount() {
        document.removeEventListener('kudoz::cardListRefresh', this.bind.onCardListRefresh);
        window.clearInterval(this.interval);
        window.clearTimeout(this.timeout);
    }
    render() {
        const newCard = this.state.cards.length > 0 ? this.getCardProps(this.state.cards[this.state.cards.length - 1]) : undefined;
        return this.state.event ? (react_1.default.createElement("div", { className: "kudoEvent" },
            react_1.default.createElement("div", { className: "event_info" },
                this.getEvent(),
                this.getKnight(),
                location.href.indexOf('?tv=true') > -1 ? (react_1.default.createElement(QRcode_1.default, { url: location.protocol + '//' + location.host + location.pathname })) : (react_1.default.createElement(KudoForm_1.default, { eventId: this.eventId, isActive: this.state.is_active }))),
            react_1.default.createElement("div", { className: "event_cards" }, this.processCards()),
            react_1.default.createElement(CardNotification_1.default, null),
            this.state.shouldDisplayModal ? react_1.default.createElement(CardModal, { newCardProps: newCard, onClick: this.bind.onHideModal }) : null,
            react_1.default.createElement(KudoSettings_1.default, null))) : (react_1.default.createElement("div", null));
    }
    onHideModal() {
        this.setState({ shouldDisplayModal: false });
    }
    onCardListRefresh() {
        this.getData();
    }
    getData() {
        const now = new Date().getTime();
        api_1.select('/api/cards', { eventId: this.eventId }).then((data) => {
            if (this.state.cards.length < data.length) {
                document.dispatchEvent(new CustomEvent('kudoz::newNotification'));
            }
            data.sort((a, b) => b.likes - a.likes);
            this.setState({ cards: data });
        });
        api_1.select('/api/events', { _id: this.eventId })
            .then((data) => {
            const event = data[0];
            this.setState({
                event,
                is_active: event.dateFrom < now && now < event.dateTo
            });
        })
            .catch((err) => {
            console.log(err.message);
            window.clearInterval(this.interval);
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
        this.state.cards.forEach((card_data) => {
            cards.push(react_1.default.createElement(Card_1.default, Object.assign({ key: card_data._id }, this.getCardProps(card_data))));
        });
        return cards;
    }
    getCardProps(card_data) {
        return {
            awarded: card_data.awardedTo,
            cardID: card_data._id,
            cardType: card_data.type,
            eventID: card_data.eventId,
            highlighted: this.isHighligted(card_data._id),
            isActive: this.state.is_active,
            likes: card_data.likes,
            text: card_data.text
        };
    }
    isHighligted(cardId) {
        return this.state.cards.map((card) => card._id).indexOf(cardId) < 7;
    }
    getKnight() {
        // TODO get most frequent name from array
        const list = client_1.getKudoNumberList(this.state.cards);
        return (react_1.default.createElement("div", { title: list.map((person) => `${person.name}:${person.count}`).join(', ') },
            react_1.default.createElement(Knight_1.Knight, Object.assign({}, { mostKudos: client_1.getKudoKnight(list) }))));
    }
}
exports.default = KudoEvent;


/***/ })

},[[0,"runtime","vendor","common"]]]);
//# sourceMappingURL=main.js.map