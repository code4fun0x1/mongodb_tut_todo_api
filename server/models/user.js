var mongoose=require('mongoose');

//mongoose.model('User'
//here User defines the actual db collection
var User = mongoose.model('User',{
  email:{
    type:String,
    required:true,
    minlength:1,
    trim:true,
  }
});

//
// var newUser=new User({
//   email:'abc@abc.com'
// });
// newUser.save().then((doc)=>{
//   console.log('Saved Succefully');
//   console.log(doc);
// },(e)=>{console.log(e);});

module.exports={
  User
};
