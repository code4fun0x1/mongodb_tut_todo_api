const {ObjectID} = require('mongodb');

const {mongoose} =require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

//Todo.remove({}) remove all data
//Todo.remove({key:value}) remove multiple item
//findOneAndremove and remove one item and return the deleted iteem
//Todo.findOneAndRemove({key:value})
//Todo.findByIdandRemove('id')  returns the deleted item

// Todo.remove({}).then(()=>{
//   consoole.log('Removed all document');
// });
//3
// //deleted item gets returned
// Todo.findOneAndRemove({text:'play games'}).then((todo)=>{
//   console.log(todo);
// });

//deleted item gets returned
//id should be valid
//if not found then 'null' returned
Todo.findByIdAndRemove('58e3a51fa0b2c6001179a2f0').then((todo)=>{
  console.log(todo);
});
