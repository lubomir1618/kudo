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
const events_1 = require("./server/controllers/events");
const like_1 = require("./server/controllers/like");
const path = require('path');
const app = express_1.default();
const port = process.env.PORT || 8080;
app.use(cors_1.default());
app.use(express_1.default.json());
// static html
app.use(express_1.default.static('dist/client'));
// parse application/x-www-form-urlencoded
app.use(body_parser_1.default.urlencoded({ extended: false }));
// parse application/json
app.use(body_parser_1.default.json());
/* REST
** 🚨🚨🚨 IMPORTANT 🚨🚨🚨
** - define api routes at top, then, all other routes will be handled via index.html - react router
** ****************** */
/* app.post('/api/like', (req: Request, res: Response) => {ow
  console.log('moo');
  res.end('yes');
});*/
app.post('/api/like', like_1.cLike);
restful_router_1.default({ app, name: 'api/users', controller: users_1.cUsers });
restful_router_1.default({ app, name: 'api/cards', controller: cards_1.cCards });
restful_router_1.default({ app, name: 'api/events', controller: events_1.cEvents });
/* Handle ALL OTHER, non-api,  requests / routes as the index.html (main application) - we use React Router fot this */
app.get('*', (req, res) => {
    res.set('Content-Type', 'text/html');
    res.sendFile(path.resolve(__dirname, 'client', 'index.html'));
});
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
//# sourceMappingURL=index.js.map