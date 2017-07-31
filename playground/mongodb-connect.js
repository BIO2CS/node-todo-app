const { MongoClient } = require("mongodb");

const url = "mongodb://localhost:27017/TodoApp";

MongoClient.connect(url, (err, db) => {
  if (err) {
    return console.log("Unable to connect to MongoDB server");
  }
  console.log("Connected to MongoDB server");

  // db.collection("Todos").insertMany([
  //   {
  //     text: "Learn NodeJS",
  //     completed: false
  //   },
  //   {
  //     text: "Find a better-paid job",
  //     completed: false
  //   },
  //   {
  //     text: "Read Professional Web Developer Javascript",
  //     completed: false
  //   }
  // ], (err, result) => {
  //   if (err) {
  //     return console.log("Unable to insert todo", err);
  //   }
  //   console.log(JSON.stringify(result.ops, undefined, 2));
  // });
  //
  // db.collection("Users").insertMany([
  //   {
  //     name: "Joan Gu",
  //     age: 31
  //   },
  //   {
  //     name: "John Smith",
  //     age: 30
  //   }
  // ], (err, result) => {
  //   if (err) {
  //     return console.log("Unable to insert user", err);
  //   }
  //   console.log(JSON.stringify(result.ops, undefined, 2));
  // });

  db.close();
});
