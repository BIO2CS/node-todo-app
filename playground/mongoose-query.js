const { ObjectID } = require("mongodb");

const mongoose = require("../server/db/mongoose");
const Todo = require("../server/models/todos");

const id = "597e5ff8a76ba64c64407592";

if (!ObjectID.isValid(id)) {
  console.log("Id is not valid");
}

Todo.findById(id).then(todo => {
  if (!todo) {
    return console.log("Id not found");
  }
  console.log("Todo by Id", todo);
}).catch(error => {
  console.log(error);
})
