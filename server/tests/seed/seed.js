const { ObjectID } = require("mongodb");
const jwt = require("jsonwebtoken");

const Todo = require("../../models/todos");
const User = require("../../models/user");

const userOneId = new ObjectID();
const userTwoId = new ObjectID();

const users = [
  {
    _id: userOneId,
    email: "hgu@buffalo.edu",
    password: "userOnePass",
    tokens: [
      {
        access: "auth",
        token: jwt.sign({_id: userOneId, access: "auth"}, "abc123").toString()
      }
    ]
  },
  {
    _id: userTwoId,
    email: "jen@example.com",
    password: "userTwoPass",
    tokens: [
      {
        access: "auth",
        token: jwt.sign({_id: userTwoId, access: "auth"}, "abc123").toString()
      }
    ]
  }
];

const todos = [
  {
    text: "Learn NodeJS",
    _id: new ObjectID()
  },
  {
    text: "Find a better job",
    _id: new ObjectID(),
    completed: false
  }
];

const populateTodos = done => {
  Todo.remove({}).then(() => {
    return Todo.insertMany(todos);
  }).then(() => done());
};

const populateUsers = done => {
  User.remove({}).then(() => {
    var userOne = new User(users[0]).save();
    var userTwo = new User(users[1]).save();
    return Promise.all([userOne, userTwo]);
  }).then(() => {
    done();
  });
};

module.exports = {
  todos,
  populateTodos,
  users,
  populateUsers
}
