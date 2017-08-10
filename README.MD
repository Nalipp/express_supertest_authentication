## Commit descriptions

### mongoose connection and models

connect to mongoose

create users and todos models

mongoose.Promise = global.Promise for enabling promises

create first post to the database with postman


in the app.js 
  create a get.post() route

#### postman
allows you to post an http request to a post route in app.js

input a dummy json object that mimicks the object that would be the result of a submitted form

select the following
  body
  raw
  JSON (application/json)
  response can be set to pretty


### testing setup
$ npm install --save-dev mocha expect supertest nodemon

update package.json to watch and run tests with npm run test-watch

### preparing for heroku

add to server.js

  const port = process.env.PORT || 3000;

  app.listen(port, () => {
    console.log(`running on ${port}`); 
  });

add to package.json with node -v on current maching

  "engines": {
    "node": "6.9.3"
  },

heroku also needs to know how to start the app

  "start": "node server/server.js",

#### set up heroku database

$ heroku create

$ heroku addons:create mongolab:sandbox

$ heroku config (gives access to MONGODB_URI)

mongoose.connect(process.env.MONGODB_URI || <dev connection>)




