const mongoose=require('mongoose');
const validator=require('validator');
const jwt= require('jsonwebtoken');
const _ = require('lodash');
const bcrypt= require('bcryptjs');

var UserSchema=new mongoose.Schema({
    email:{
      type:String,
      required:true,
      minlength:1,
      trim:true,
      unique:true,
      validate:{
        validator:(value)=>{
          //returns true or false
          return validator.isEmail(value);
        },
        message:'{VALUE} is not a valid email'
      }
    },
    password:{
      type:String,
      require:true,
      minlength:6
    },
    tokens:[{
      access:{
        type:String,
        require:true
      },
      token:{
        type:String,
        require:true
      }
    }]
});

//to limit the data send in the response
//this method defines the data that is send back to server.js
UserSchema.methods.toJSON = function(){
  var user = this;
  var userObject = user.toObject();
  return _.pick(userObject,['_id','email']);
};

//we are adding a instance method to individual user object
UserSchema.methods.generateAuthToken = function(){
  //function() binds to this keyword
  //'this' is neeed to get individual users
  var user = this;
  var access = 'auth';
  var token = jwt.sign({_id:user._id.toHexString(),access:access} , 'abc123').toString();
  user.tokens.push({access,token});
  //we are returning a promise so that seerver.js can chain on a then() call
  //for custom logic
  return user.save().then(()=>{
    //this will be retuurned as the argument to the next chained promise
    return token;
  });
};
//for Model method which do task common to all user
UserSchema.statics.findByToken=function(token){
  //model reference
  var User = this;
  var decoded;//store decoded jwt
  try{
    decoded = jwt.verify(token,'abc123');
  }catch(e){
    //return a promise so that success case never occure
    return Promise.reject();
  }

//mongoose functions to search
//return the promise for chaining in server.js
  return User.findOne({
    '_id':decoded._id,
    'tokens.token':token,
    'tokens.access':'auth'
  });

};
//we are using a mongoose middleware
//dont use arrow function cz we need 'this' for user
UserSchema.pre('save',function(next){
  var user=this;
  if(user.isModified('password')){
    bcrypt.genSalt(10,(err,salt)=>{
      bcrypt.hash(user.password,salt, (err,hash)=>{
        user.password=hash;
        next();
      });
    });
  }else{
    next();
  }
});


//mongoose.model('User'
//here User defines the actual db collection
var User = mongoose.model('User',UserSchema);

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
