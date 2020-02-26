import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import restfulRouter from 'restful-router';

import { cUsers } from './server/controllers/users';
import { cCards } from './server/controllers/cards';
import { cEvents } from './server/controllers/events';

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());
// static html
app.use(express.static('dist/client'));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

/* REST */
restfulRouter({ app, name: 'api/users', controller: cUsers });
restfulRouter({ app, name: 'api/cards', controller: cCards });
restfulRouter({ app, name: 'api/events', controller: cEvents });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
