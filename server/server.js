var express = require("express");
var bodyParser = require("body-parser");
const { ObjectID } = require("mongodb");

const { mongoose } = require("./db/mongoose");
const Todo = require("./models/todos");
const User = require("./models/user");

const port = process.env.PORT || 3000;

var app = express();

app.use(bodyParser.json());

app.post("/todos", (req, res) => {
  var todo = new Todo({
    text: req.body.text
  });
  todo.save().then(doc => {
    res.send(doc);
  }, err => {
    res.status(400).send(err);
  });
});

app.get("/todos", (req, res) => {
  Todo.find().then(todos => {
    res.send({todos});
  }, err => {
    res.status(400).send(err);
  });
});

app.get("/todos/:id", (req, res) => {
  var id = req.params.id;
  if (!ObjectID.isValid(id)) {
    res.status(404).send({});
  } else {
    Todo.findById(id).then(todo => {
      if (!todo) {
        return res.status(404).send({});
      }
      res.status(200).send({todo});
    }).catch(err => {
      res.status(400).send({});
    });
  }
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

module.exports = app;