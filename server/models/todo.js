var mongoose=require('mongoose');

var Todo = mongoose.model('Todo',{
  text:{
    type:String,
    required:true,
    minlength:1,
    trim:true
  },
  completed:{
    type:Boolean,
    default:false
  },
  completedAt:{
    type:Number,
    default:null
  }
});

module.exports={
  Todo
};


//create model

//craete a object from model and save it
// var newTodo = new Todo({
//   text:'Cook Dinner'
// });
// newTodo.save().then((doc)=>{
//   console.log('Saved to database');
//   console.log(doc);
// },(e)=>{
//   console.log('unable to save',e);
// });

//second object
// var secondTodo = new Todo({
//   text:'Paying Game',
//   completed:false,
//   completedAt:123
// });
//
// secondTodo.save().then((doc)=>{
//   console.log('Saved Successful');
//   console.log(doc);
// },(e)=>{
//   console.log(e);
// });
