var request = require("supertest");
var expect = require("expect");
const { ObjectID } = require("mongodb");

var app = require("../server");
var Todo = require("../models/todos");
const User = require("../models/user");

const {todos, populateTodos, users, populateUsers} = require("./seed/seed");

beforeEach(populateUsers);
beforeEach(populateTodos);

describe("POST /todos", () => {
  it("should create a new todo", (done) => {
    var text = "Some test todo text ";
    var expectedText = text.trim();
    request(app)
      .post("/todos")
      .send({text})
      .expect(200)
      .expect(res => {
        expect(res.body.text).toEqual(expectedText);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        Todo.find({text: expectedText}).then(todos => {
          expect(todos.length).toEqual(1);
          expect(todos[0].text).toEqual(expectedText);
          done();
        }).catch(err => {
          done(err);
        });
      });
  });

  it("should not create a new todo with invalid data", (done) => {
    request(app)
      .post("/todos")
      .send({})
      .expect(400)
      .expect(res => {
        expect(res.body).toIncludeKey("errors")
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        Todo.find().then(todos => {
          expect(todos.length).toEqual(2);
          done();
        }).catch(err => {
          done(err);
        });
      });
  });
});

describe("GET /todos", () => {
  it("should get all todos", done => {
    request(app)
      .get("/todos")
      .expect(200)
      .expect(res => {
        expect(res.body.todos.length).toEqual(2);
      })
      .end(done);
  });
});

describe("GET /todos/:id", () => {
  it("should return todo doc", (done) => {
    request(app)
      .get(`/todos/${todos[0]._id.toHexString()}`)
      .expect(200)
      .expect(res => {
        expect(res.body.todo.text).toEqual(todos[0].text);
      })
      .end(done);
  });

  it("should return 404 if todo not found", (done) => {
    var id = new ObjectID().toHexString();
    request(app)
      .get(`/todos/${id}`)
      .expect(404)
      .end(done);
  });

  it("should return 404 for non-object id", (done) => {
    request(app)
      .get("/todos/123abc")
      .expect(404)
      .end(done);
  });
});

describe("GET /users/me", () => {
  it("should return user if authenticated", (done) => {
    request(app)
      .get("/users/me")
      .set("x-auth", users[0].tokens[0].token)
      .expect(200)
      .expect(res => {
        expect(res.body._id).toEqual(users[0]._id.toHexString());
        expect(res.body.email).toEqual(users[0].email);
      })
      .end(done);
  });

  it("should return 401 if not authenticated", (done) => {
    request(app)
      .get("/users/me")
      .expect(401)
      .expect(res => {
        expect(res.body).toEqual({});
      })
      .end(done);
  });
})

describe("POST /users", () => {
  it("should create a user", (done) => {
    var email = "example@example.com";
    var password = "123abc";

    request(app)
      .post("/users")
      .send({email, password})
      .expect(200)
      .expect((res) => {
        expect(res.headers["x-auth"]).toExist();
        expect(res.body._id).toExist();
        expect(res.body.email).toEqual(email);
      })
      .end(err => {
          if (err) {
            return done(err);
          }
          User.findOne({email}).then((user) => {
            expect(user).toExist();
            expect(user.password).toNotBe(password);
            done();
          });
      });
  });

  it("should return validation errors if request invalid", (done) => {
    request(app)
      .post("/users")
      .send({email: "and", password: "123"})
      .expect(400)
      .end(done);
  });

  it("should not create user if email in use", (done) => {
    request(app)
      .post("/users")
      .send({
        email: users[0].email,
        password: "secret"
      })
      .expect(400)
      .end(done);
  });
});
