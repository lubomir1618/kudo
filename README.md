# Kudo
Award voting app.

Written in Typescript at frontend and backend. Server part is nodejs and uses Express http server.
Frontend is run at React.

## Develop

 - **build app**: `npm run build`
 - **start in dev watch mode**: `npm run dev`
 - **start**: `npm run start`
 - **build for prod**: `npm run build`
 - **linting**: `npm run lint`
 - **see storybook**: `npm run storybook`

## Deploy
 - `dist` directory contains all files needed for server hosting. Server requires nodejs hosting environment.
 - to change mongodb location you need specify it in `.env` file and rebuild app.

## Launching
App is temporary run at Heroku. It is safe to host also on unsecured http server as
admin authorisation uses RSA encryption. 

### Live

 1. app url `https://kudoness.herokuapp.com/event/<eventHash>` (e.g. 5e5f619ff1a4fe47ed6bea33)
 2. admin url `https://kudoness.herokuapp.com/admin.html`
 3. DB url `mongodb+srv://<login>:<password>@cluster0-8sxhu.mongodb.net`

### Locally
 1. build & start server
 2. local app `http://localhost:3000/event/<eventHash>` (e.g. 5e67e7131831dec064112d4d)
 3. local admin: `http://localhost:3000/admin.html` default credentials are: `admin / admin`

## MongoDB locally

### Installation

```sh
brew tap mongodb/brew
brew install mongodb-community@4.2
```

### Launching
```
brew services start mongodb-community@4.2
```

### Managing
Best is to use **MongoDB Compass** app.
Connect to `localhost:27017`
```txt
mongodb://localhost:27017/
mongodb://localhost:27017/test?readPreference=primary&appname=MongoDB%20Compass&ssl=false
```
