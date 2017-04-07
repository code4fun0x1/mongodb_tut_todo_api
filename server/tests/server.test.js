const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

//../ to go back a direectory
const {app} = require('./../server');
const {Todo} = require('./../models/todo');
const {User} = require('./../models/user');
const {todos,populateTodos,users,populateUsers} = require('./seed/seed');

//we are specifing id manually because
//we have to test todo/:id api for which we need the id
// const todos=[
//   {_id:new ObjectID(),text:"test 1 todos"},
//   {_id:new ObjectID(),
//     text:"test 2 todos",
//     completed:true,
//     completedAt:333
//   }
// ];
//
// //insertMany() mongoose to insert many item in db
//
// //empty database before every teest
// beforeEach((done)=>{
//   Todo.remove({}).then(()=>{
//     return Todo.insertMany(todos); //this will return a promise
//     done();
//   }).then(()=>{done();});
// });

//AFTER RE-STRUCTURING seed

//middleware



describe('POST/todos',()=>{
  beforeEach(populateTodos);


  it('should create new todos',(done)=>{
    var text = 'Test todo test';

    request(app)
    .post('/todos')
    .send({text})
    .expect(200)
    .expect((res)=>{
      expect(res.body.text).toBe(text);
    })
    .end((err,res)=>{
      if(err){
        return done(err);
      }
      //model.find() fetches entirer collection
      Todo.find({text}).then((todos)=>{
        //console.log(todos);
        //we empty the database so length is 1 always
        expect(todos.length).toBe(1);
        expect(todos[0].text).toBe(text);
        done();
      }).catch((e)=>done(e));

    });
   });

   //test case for the bad request
// it('should not create a new todos',(done)=>{
//   request(app)
//   .post('/todos')
//   .send({})
//   .expect(400)
//   .expect((res)=>{
//     expect(res.body.message).toBe("Todo validation failed");
//   })
//   .end(done);

//test for bad request with database length check-0
it('should not create a new todos',(done)=>{
  request(app)
  .post('/todos')
  .send({})
  .expect(400)
  .expect((res)=>{
    expect(res.body.message).toBe("Todo validation failed");
  })
  .end((err,res)=>{
    if(err){
      return done(err);
    }
    Todo.find().then((todos)=>{
      expect(todos.length).toBe(2);
      done();
    }).catch((e)=>{
      done(e);
    });
  });
});
});


//test case for get/all todos
describe('GET/todos',()=>{
  beforeEach(populateTodos);

  it('should get all todos',(done)=>{
    request(app)
    .get('/todos')
    .expect(200)
    .expect((res)=>{
      expect(res.body.todos.length).toBe(2);
    })
    .end(done);
  });
});

describe('GET/todos/:id',()=>{
  beforeEach(populateTodos);

  it('should return todo doc',(done)=>{
    request(app)
    .get(`/todos/${todos[0]._id.toHexString()}`)
    .expect(200)
    .expect((res)=>{
      expect(res.body.todo.text).toBe(todos[0].text);
    })
    .end(done);
  });

  it('should return 404 if todo not found',(done)=>{
    var hexId=new ObjectID().toHexString();
    request(app)
    .get(`/todos/${hexId}`)
    .expect(404)
    .end(done);
  });

  it('should return 404 if non objectId',(done)=>{
    request(app)
    .get(`/todos/111`)
    .expect(404)
    .end(done);
  });

});

describe('DELETE / todos /:id',()=>{
  beforeEach(populateTodos);

  it('should delete a todo',(done)=>{
    var hexId=todos[0]._id.toHexString();
    request(app)
    .delete(`/todos/${hexId}`)
    .expect(200)
    .expect((res)=>{
      expect(res.body.todo._id).toBe(hexId);
    })
    .end((err,res)=>{
      if(err){
        return done(err);
      }
      Todo.findById(hexId).then((todo)=>{
        expect(todo).toNotExist();
        done();
      }).catch((err)=>{
        done(err);
      });
    });
  });


    it('should return 404 if todo not found',(done)=>{
      var hexId=new ObjectID().toHexString();
      request(app)
      .delete(`/todos/${hexId}`)
      .expect(404)
      .end(done);
    });

    it('should return 404 if non objectId',(done)=>{
      request(app)
      .delete(`/todos/111`)
      .expect(404)
      .end(done);
    });

});

describe('GET/todos/:id',()=>{
  beforeEach(populateTodos);

  it('should return todo doc',(done)=>{
    request(app)
    .get(`/todos/${todos[0]._id.toHexString()}`)
    .expect(200)
    .expect((res)=>{
      expect(res.body.todo.text).toBe(todos[0].text);
    })
    .end(done);
  });

  it('should return 404 if todo not found',(done)=>{
    var hexId=new ObjectID().toHexString();
    request(app)
    .get(`/todos/${hexId}`)
    .expect(404)
    .end(done);
  });

  it('should return 404 if non objectId',(done)=>{
    request(app)
    .get(`/todos/111`)
    .expect(404)
    .end(done);
  });

});

describe('UPDATE / todos /:id',()=>{
  beforeEach(populateTodos);

  it('should update a todo',(done)=>{
    var hexId=todos[0]._id.toHexString();
    var text='unit test updated text';
    request(app)
    .patch(`/todos/${hexId}`)
    .send({
      text:text,
      completed:true
    })
    .expect(200)
    .expect((res)=>{
      expect(res.body.todo.text).toBe(text);
      expect(res.body.todo.completed).toBe(true);
      expect(res.body.todo.completedAt).toBeA('number');
    })
    .end(done);
  });

  it('should clear completedAt when todo is not completed',(done)=>{
    var hexId=todos[1]._id.toHexString();
    var text='unit test updated text for false';
    request(app)
    .patch(`/todos/${hexId}`)
    .send({
      text:text,
      completed:false
    })
    .expect(200)
    .expect((res)=>{
      expect(res.body.todo.text).toBe(text);
      expect(res.body.todo.completed).toBe(false);
      expect(res.body.todo.completedAt).toNotExist();
    })
    .end(done);
  });

  });

  describe('GET /users /me',()=>{
    beforeEach(populateUsers);

    it('should return user if authneticated',(done)=>{
      request(app)
      .get('/users/me')
      .set('x-auth',users[0].tokens[0].token)
      .expect(200)
      .expect((res)=>{
        expect(res.body._id).toBe(users[0]._id.toHexString());
        expect(res.body.email).toBe(users[0].email);
      })
      .end(done);
    });

    it('should return 401 if not authenticated',(done)=>{

    });
  });
