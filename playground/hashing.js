const { SHA256 } = require("crypto-js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const password = "123abc";

// bcrypt.genSalt(10, (err, salt) => {
//   bcrypt.hash(password, salt, (err, hash) => {
//     console.log(hash);
//   });
// });

const hashedPassword = "$2a$10$LewWwRdDdOpiRlEFr.6JEOhlw2B.pc4JbtSDKTjT2StTnB6VBsUtm";

bcrypt.compare(password, hashedPassword, (err, result) => {
  console.log(result);
});

// const data = {
//   id: 10
// }
//
// const token = jwt.sign(data, "123abc");
// console.log(token);
//
// const decoded = jwt.verify(token, "123abc");
// console.log(decoded);

// const message = "I am Joan Gu";
// const hashedMessage = SHA256(message).toString();
//
// console.log(`Message is ${message}`);
// console.log(`Hashed message is ${hashedMessage}`);
//
// var data = {
//   id: 4
// };
//
// var token = {
//   data,
//   hash: SHA256(JSON.stringify(data) + "somesecret").toString()
// };
//
// var resultHash = SHA256(JSON.stringify(token.data) + "somesecret").toString();
//
// if (resultHash === token.hash) {
//   console.log("Data was not changed");
// } else {
//   console.log("Data was changed. Dont' trust!");
// }
