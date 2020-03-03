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
Object.defineProperty(exports, "__esModule", { value: true });
const React = __importStar(__webpack_require__(1));
const ReactDOM = __importStar(__webpack_require__(6));
const react_router_dom_1 = __webpack_require__(12);
const KudoTest_1 = __webpack_require__(32);
__webpack_require__(33);
function App() {
    // let id = useParams().id;
    return (React.createElement(react_router_dom_1.BrowserRouter, null,
        React.createElement(react_router_dom_1.Switch, null,
            React.createElement(react_router_dom_1.Route, { exact: true, path: "/" },
                React.createElement("div", null, "Ahoj, toto je main routa, tu mozno raz daco bude, mozno nie :P")),
            React.createElement(react_router_dom_1.Route, { path: "/priklad" },
                React.createElement("div", null, "Priklad na inu route ")),
            React.createElement(react_router_dom_1.Route, { path: "/event/:id" },
                React.createElement("div", null,
                    " ",
                    React.createElement(KudoTest_1.KudoTest, null))))));
}
exports.default = App;
ReactDOM.render(React.createElement(App, null), document.getElementById('example'));
// vodka();


/***/ }),

/***/ 32:
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
const react_router_dom_1 = __webpack_require__(12);
exports.KudoTest = () => {
    const { id } = react_router_dom_1.useParams(); // toto berie z react routera, nasledne sa na toto id da zavolat nejaky api call napr. ;0 
    console.log('params: ', id);
    return (React.createElement("h1", { className: "big" },
        "soske mange more URL PARAMETER PRE KUDO HASH JE: ",
        id));
};


/***/ }),

/***/ 33:
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(34);
            var content = __webpack_require__(35);

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

/***/ 35:
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(36);
var ___CSS_LOADER_AT_RULE_IMPORT_0___ = __webpack_require__(37);
exports = ___CSS_LOADER_API_IMPORT___(false);
exports.i(___CSS_LOADER_AT_RULE_IMPORT_0___);
// Module
exports.push([module.i, "\n", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ 37:
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(36);
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, "/* Box sizing rules */\n*,\n*::before,\n*::after {\n  box-sizing: border-box;\n}\n\n/* Remove default padding */\nul[class],\nol[class] {\n  padding: 0;\n}\n\n/* Remove default margin */\nbody,\nh1,\nh2,\nh3,\nh4,\np,\nul[class],\nol[class],\nli,\nfigure,\nfigcaption,\nblockquote,\ndl,\ndd {\n  margin: 0;\n}\n\n/* Set core body defaults */\nbody {\n  min-height: 100vh;\n  scroll-behavior: smooth;\n  text-rendering: optimizeSpeed;\n  line-height: 1.5;\n}\n\n/* Remove list styles on ul, ol elements with a class attribute */\nul[class],\nol[class] {\n  list-style: none;\n}\n\n/* A elements that don't have a class get default styles */\na:not([class]) {\n  text-decoration-skip-ink: auto;\n}\n\n/* Make images easier to work with */\nimg {\n  max-width: 100%;\n  display: block;\n}\n\n/* Inherit fonts for inputs and buttons */\ninput,\nbutton,\ntextarea,\nselect {\n  font: inherit;\n}\n", ""]);
// Exports
module.exports = exports;


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map