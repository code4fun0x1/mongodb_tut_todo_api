const {ObjectID} = require('mongodb');
const {Todo} = require('./../../models/todo');

const todos=[
  {_id:new ObjectID(),text:"test 1 todos"},
  {_id:new ObjectID(),
    text:"test 2 todos",
    completed:true,
    completedAt:333
  }
];

//insertMany() mongoose to insert many item in db

//empty database before every teest
const populateTodos = (done)=>{
  Todo.remove({}).then(()=>{
    return Todo.insertMany(todos); //this will return a promise
    done();
  }).then(()=>{done();});
};

module.exports = {todos,populateTodos};
