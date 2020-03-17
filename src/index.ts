import express from 'express';
import session from 'express-session';
import cors from 'cors';
import bodyParser from 'body-parser';
import restfulRouter from 'restful-router';
import path from 'path';

import { COOKIE_MAX_AGE } from './server/utils';
import { cAuth } from './server/controllers/auth';
import { cCards } from './server/controllers/cards';
import { cEvents } from './server/controllers/events';
import { cLike } from './server/controllers/like';
import { cUsers } from './server/controllers/users';

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
// use sessions for admin
app.use(
  session({
    cookie: {
      httpOnly: false,
      maxAge: COOKIE_MAX_AGE,
      path: '/',
      sameSite: 'strict'
    },
    resave: false,
    // rolling: true,
    saveUninitialized: false,
    secret: 'Kudoz$ecret'
  })
);

/* REST
 ** 🚨🚨🚨 IMPORTANT 🚨🚨🚨
 ** - define api routes at top, then, all other routes will be handled via index.html - react router
 ** ****************** */

app.get('/admin', (_req, res) => cAuth.list(__dirname, res));
app.post('/api/like', cLike);
restfulRouter({ app, controller: cAuth, name: 'api/auth' });
restfulRouter({ app, controller: cUsers, name: 'api/users' });
restfulRouter({ app, controller: cCards, name: 'api/cards' });
restfulRouter({ app, controller: cEvents, name: 'api/events' });

/* Handle ALL OTHER, non-api,  requests / routes as the index.html (main application) - we use React Router fot this */
app.get('*', (_req, res) => {
  res.set('Content-Type', 'text/html');
  res.sendFile(path.resolve(__dirname, 'client', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
