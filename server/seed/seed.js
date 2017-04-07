const {ObjectID} = require('mongodb');
const jwt = require('jsonwebtoken');

const {Todo} = require('./../../models/todo');
const {User} = require('./../../models/user');

const userOneId = new ObjectID();
const userTwoId = new ObjectID();

//user array for unit toHexString
const users = [{
    _id:userOneId,
    email:'test@test.com',
    password:'1234567',
    tokens:[{
      access:'auth',
      token: jwt.sign({_id:userOneId,access:'auth'},'abc123').toString()
    }]
  },{
    _id:userTwoId,
    email:'testtwo@test.com',
    password:'1234567'
  }
];


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
  }).then(()=>{done();});
};

const populateUsers = (done)=>{
  User.remove({}).then(()=>{
    //will reeturn the promise
    var userOne = new User(users[0]).save();
    var userTwo = new User(users[1]).save();

//return the promise
//chain a new then
    return Promise.all([userOne,userTwo]);
  }).then(()=>done());
};

module.exports = {todos,populateTodos,users,populateUsers};
