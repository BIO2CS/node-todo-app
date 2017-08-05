var mongoose = require("mongoose");

const localUrl = "mongodb://localhost:27017/TodoApp";

// const mlabUrl = "mongodb://hgu29:anhui14004@ds127783.mlab.com:27783/hgu-node-todo-app";
// $ heroku config:set MONGODB_URI=yourUrlHere

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || localUrl);

module.exports = {
  mongoose
};
