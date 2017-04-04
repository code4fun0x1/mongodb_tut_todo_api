const {ObjectID} = require('mongodb');

const {mongoose} =require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

var id='58e37652e6cce6161ce50ba7';

if(!ObjectID.isValid(id)){
  console.log('Id not valid');
}

//find all document
//Todo.find()
//Quesry on basis of key value pair
//Todo.find({key:value})

//mongoose does not require ObjectID('58e37652e6cce6161ce50ba7') etc
//ew can query __id as string
// Todo.find({
//   _id:id
// }).then((todos)=>{
//   console.log(todos);
// });
//
// Todo.findOne({_id:id}).then((todo)=>{
//   console.log(todo);
// });
//
// //query by id if it is correct
// Todo.findById({_id:id}).then((todo)=>{
//   console.log(todo);
// });
//
// //query by id if it is INCORRECT
// Todo.findById({_id:id}).then((todo)=>{
//   if(!todo){
//     return console.log('Id not found');
//   }
//   console.log(todo);
// }).catch((e)=>{
//   console.log(e);
// });

var uid='58e37dcc56b8051e2cef2559';
//to find User by id
User.findById({_id:uid}).then((todo)=>{
  if(!todo){
    return console.log('user not found');
  }
  console.log(JSON.stringify(todo,undefined,3));
}).catch((e)=>{
  console.log('Invalid User Id');
});
