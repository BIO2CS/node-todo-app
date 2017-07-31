var request = require("supertest");
var expect = require("expect");
const { ObjectID } = require("mongodb");

var app = require("../server");
var Todo = require("../models/todos");

const todos = [
  {
    text: "Initial test todo text",
    _id: new ObjectID()
  },
  {
    text: "Some other text",
    _id: new ObjectID()
  }
];

beforeEach(done => {
  Todo.remove({}).then(() => {
    return Todo.insertMany(todos);
  }).then(() => done());
});

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
