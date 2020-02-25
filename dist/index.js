"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const restful_router_1 = __importDefault(require("restful-router"));
const users_1 = require("./server/controllers/users");
const cards_1 = require("./server/controllers/cards");
const app = express_1.default();
app.use(cors_1.default());
app.use(express_1.default.json());
// static html
app.use(express_1.default.static('dist/client'));
// parse application/x-www-form-urlencoded
app.use(body_parser_1.default.urlencoded({ extended: false }));
// parse application/json
app.use(body_parser_1.default.json());
/* REST */
restful_router_1.default({ app, name: 'api/users', controller: users_1.cUsers });
restful_router_1.default({ app, name: 'api/cards', controller: cards_1.cCards });
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
//# sourceMappingURL=index.js.map