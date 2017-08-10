### Mongoose connection and models
connect to mongoose

create users and todos models

mongoose.Promise = global.Promise -> for enabling promises

create first get.post() route

#### Postman
input a dummy json object that mimicks the object that would be the result of a submitted form

select the following

  body

  raw

  JSON (application/json)

  response can be set to pretty

explore environments and collections to automate requests and switch between production and dev envrionments

### Testing setup
$ npm install --save-dev mocha expect supertest nodemon

update package.json to watch and run tests with npm run test-watch

Todo.findByIdAndUpdate example uses lodash to pick values from patch request wich allows you to specify the values that the user is allowed to update.

This example also sets the {new: true} optoin which returns the modified document instead of the original document by default

### Preparing for heroku

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

#### Set up heroku database

$ heroku create

$ heroku addons:create mongolab:sandbox

$ heroku config (gives access to MONGODB_URI)

mongoose.connect(process.env.MONGODB_URI || <dev connection>)

$ git push

$ git push heroku master

$ heroku logs

$ heroku open


