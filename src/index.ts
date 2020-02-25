import express from 'express';
import cors from 'cors';
import serveStatic from 'serve-static';
import bodyParser from 'body-parser';
import restfulRouter from 'restful-router';

import { cUsers } from './server/controllers/users';
import { cCards } from './server/controllers/cards';

const app = express();

app.use(cors());
app.use(express.json());
// static html
app.use(serveStatic(`${__dirname}/client`));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

/* REST */
restfulRouter({ app, name: 'api/users', controller: cUsers });
restfulRouter({ app, name: 'api/cards', controller: cCards });

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
