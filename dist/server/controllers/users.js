"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const monk_1 = __importDefault(require("monk"));
const dotenv_1 = __importDefault(require("dotenv"));
const utils = __importStar(require("../utils"));
const validate_1 = require("../../common/validate");
dotenv_1.default.config();
const db = monk_1.default(process.env.MONGODB_URL || '');
class Users {
    constructor() {
        this.users = db.get('userslist');
    }
    list(req, res) {
        utils.serverLog('/users => list', req);
        this.users.find().then((data) => res.json(data));
    }
    show(req, res) {
        let where = {};
        if (req.params.id === 'where') {
            utils.serverLog('/users/where?:key=:val => show', req);
            const [key, val] = Object.entries(req.query)[0];
            where = { [key]: val };
        }
        else {
            utils.serverLog('/users/:id => show', req);
            where = { _id: req.params.id };
        }
        this.users.findOne(where).then((data) => res.json(data));
    }
    where(req, res) {
        utils.serverLog('/users/where/:key/:val => show', req);
        console.log(req.params);
        // this.users.findOne({ _id: req.params.id }).then((data) => res.json(data));
    }
    create(req, res) {
        utils.serverLog('/users => create', req);
        const valid = validate_1.isUserValid(req.body);
        if (valid === true) {
            const user = {
                created: new Date().getTime(),
                name: req.body.name,
                surname: req.body.surname
            };
            // save to db
            this.users.insert(user).then((data) => res.json(data));
            console.log('user', user);
        }
        else {
            res.status(422);
            res.json({ message: `Error in: ${valid.join(', ')}` });
        }
    }
}
const users = new Users();
exports.cUsers = {
    create: users.create.bind(users),
    list: users.list.bind(users),
    show: users.show.bind(users)
};
//# sourceMappingURL=users.js.map