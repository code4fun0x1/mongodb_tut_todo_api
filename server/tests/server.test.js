const expect = require('expect');
const request = require('supertest');

//../ to go back a direectory
const {app} = require('./../server');
const {Todo} = require('./../models/todo');

//empty database before every teest
beforeEach((done)=>{
  Todo.remove({}).then(()=>done());
});

describe('POST/todos',()=>{
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
      Todo.find().then((todos)=>{
        //console.log(todos);
        //we empty the database so length is 1 always
        expect(todos.length).toBe(1);
        expect(todos[0].text).toBe(text);
        done();
      }).catch((e)=>{
        done(e);
      });

    });
   });

   //test case for the bad request



});
