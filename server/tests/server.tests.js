const expect = require('expect');
const {ObjectID} = require('mongodb');
const request = require('supertest');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');

const todos = [
  {
    _id: new ObjectID(),
    text: 'Go to the store',
    completed: false
  }, 
  {
    _id: new ObjectID(),
    text: 'Walk the dog',
    completed: true,
    completedAt: 333
  }
]

beforeEach((done) => {
  Todo.remove({}).then(() => {
    return Todo.insertMany(todos);
  }).then(() => done());
});

describe('POST /todos', () => {
  it('should create a new todo', (done) => {
    var text = 'Test todo test';

    request(app)
      .post('/todos')
      .send({text})
      .expect(200)
      .expect((res) => {
        expect(res.body.text).toBe(text);
      })
      .end((err, res) => {
        if (err) return done(err);

        Todo.find({text}).then((todos) => {
          expect(todos.length).toBe(1);
          expect(todos[0].text).toBe(text);
          done();
        }).catch((e) => done(e));
      });
  });

  it('should not create todo with invalid body', (done) => {
    request(app)
      .post('/todos')
      .send({})
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);

        Todo.find({}).then((todos) => {
          expect(todos.length).toBe(2);
          done();
        }).catch((e) => done(e));
      });
  });
});

describe('GET /todos', () => {
  it('should get all todos', (done) => {
    request(app)
      .get('/todos')
      .expect(200)
      .expect((res) => {
        expect(res.body.todos.length).toBe(2);
      })
      .end(done);
  });
});

describe('GET /todos/:id', () => {
  it('should return todo doc', (done) => {
    request(app)
      .get('/todos/' + todos[0]._id)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.text).toBe(todos[0].text);
      })
      .end(done);
  });

  it('should return 404 when todo ObjectId wrong format', (done) => {
    request(app)
      .get('/todos/' + todos[0]._id + '!')
      .expect(404)
      .end(done);
  });

  it('should return 404 when todo is not found', (done) => {
    request(app)
      .get('/todos/' + '123abc')
      .expect(404)
      .end(done);
  });
});

describe('DELETE /todos/:id', () => {
  it('should delete the todo doc', (done) => {
    request(app)
      .delete('/todos/' + todos[0]._id)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.text).toBe(todos[0].text);
      })
      .end((err, res) => {
        if (err) return done(err);

        Todo.findById(todos[0]._id).then((todo) => {
          expect(todo).toNotExist();
          done();
        }).catch((e) => done(e));
      });
  });

  it('should return 404 when todo ObjectId wrong format', (done) => {
    request(app)
      .delete('/todos/' + todos[0]._id + '!')
      .expect(404)
      .end(done);
  });

  it('should return 404 when todo is not found', (done) => {
    request(app)
      .delete('/todos/' + '123abc')
      .expect(404)
      .end(done);
  });
});

describe('PATCH /todos/:id', () => {
  it('should update the todo text', (done) => {
    var id = todos[0]._id;
    request(app)
      .patch('/todos/' + todos[0]._id)
      .send({
        text: 'clean the sink',
        completed: true
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.completed).toBe(true);
        expect(res.body.todo.text).toBe('clean the sink');
        expect(res.body.todo.completedAt).toBeA('number');
      }).end(done);
  });

  it('should clear compltedAt when todo is not completed', (done) => {
    var id = todos[1]._id;
    request(app)
      .patch('/todos/' + todos[0]._id)
      .send({
        completed: false
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.completed).toBe(false);
        expect(res.body.todo.completedAt).toNotExist();
      }).end(done);
  });

  it('should return 404 when todo ObjectId wrong format', (done) => {
    request(app)
      .patch('/todos/' + todos[0]._id + '!')
      .expect(404)
      .end(done);
  });

  it('should return 404 when todo is not found', (done) => {
    request(app)
      .patch('/todos/' + '123abc')
      .expect(404)
      .end(done);
  });
});
