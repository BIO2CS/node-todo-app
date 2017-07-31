const { MongoClient, ObjectID } = require("mongodb");

const url = "mongodb://localhost:27017/TodoApp";

MongoClient.connect(url, (err, db) => {
  if (err) {
    return console.log("Unable to connect to MongoDB server");
  }
  console.log("Connected to MongoDB server");

  // db.collection("Todos").find({
  //   _id: new ObjectID("597256da01a58a69e8001aae")
  // }).toArray().then(docs => {
  //   console.log("Todos");
  //   console.log(JSON.stringify(docs, undefined, 2));
  // }, err => {
  //   console.log(err);
  // });

  // db.collection("Todos").find().count().then(count => {
  //   console.log(`Todos count: ${count}`);
  // }, err => {
  //   console.log(err);
  // });

  db.collection("Users").find({
    name: "Joan Gu"
  }).count().then(count => {
    // console.log(JSON.stringify(docs, undefined, 2));
    console.log("count: ", count);
  }, err => {
    console.log(err);
  });

  // db.close();
});
