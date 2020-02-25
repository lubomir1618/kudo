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
const utils = __importStar(require("../utils"));
const validate_1 = require("../../common/validate");
const db = monk_1.default('mongodb+srv://oeirtoeriu:ndjnmdekehfehre2019@cluster0-8sxhu.mongodb.net/test');
class Users {
    constructor() {
        this.users = db.get('userslist');
    }
    list(req, res) {
        utils.serverLog('/users => list', req);
        this.users.find().then((data) => res.json(data));
    }
    show(req, res) {
        utils.serverLog('/users/:id => show', req);
        this.users.findOne({ _id: req.params.id }).then((data) => res.json(data));
    }
    create(req, res) {
        utils.serverLog('/users => create', req);
        if (validate_1.isUserValid(req.body)) {
            const user = {
                created: new Date(),
                name: req.body.name.toString(),
                surname: req.body.surname.toString()
            };
            // save to db
            this.users.insert(user).then((data) => res.json(data));
            console.log('user', user);
        }
        else {
            res.status(422);
            res.json({ message: 'Name and surname must be fulfilled!' });
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