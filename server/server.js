var express = require('express');
var bodyParser = require('body-parser');
var {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();

app.use(bodyParser.json());

app.get('/todos', (req, res) => {
  Todo.find().then((todos) => {
    res.send({todos});
  }, (e) => {
    res.status(400).send(e);
  });
});

app.get('/todos/:id', (req, res) => {
  var id = req.params.id;

  if (!ObjectID.isValid(id)) {
    return res.status(404).send('id is invalid format');
  }

  Todo.findById(req.params.id).then((todo) => {
    if (!todo) {
      return res.status(404).send('todo is not in the database');
    }
    console.log(todo)
    res.status(200).send({todo});
  }).catch((e) => {
    res.status(400).send();
  });
});

app.post('/todos', (req, res) => {
  console.log(req.body); 
  var todo = new Todo({
    text: req.body.text
  });

  todo.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });
});

app.listen(3000, () => {
  console.log('running on 3000'); 
});

module.exports = {app};
