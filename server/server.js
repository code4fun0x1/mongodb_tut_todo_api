var mongoose = require('mongoose');
//set up promise for mongoose
mongoose.Promise = global.Promise;
//give it the conneection asynchonouusly
//but mongoose handle everything
mongoose.connect('mongodb://localhost:27017/TodoApp');

//create model
var Todo = mongoose.model('Todo',{
  text:{
    type:String
  },
  completed:{
    type:Boolean
  },
  completedAt:{
    type:Number
  }
});
//craete a object from model and save it
var newTodo = new Todo({
  text:'Cook Dinner'
});
newTodo.save().then((doc)=>{
  console.log('Saved to database');
  console.log(doc);
},(e)=>{
  console.log('unable to save',e);
});

//second object
var secondTodo = new Todo({
  text:'Paying Game',
  completed:false,
  completedAt:123
});

secondTodo.save().then((doc)=>{
  console.log('Saved Successful');
  console.log(doc);
},(e)=>{
  console.log(e);
});
