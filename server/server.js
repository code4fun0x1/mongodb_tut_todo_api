var express = require('express');
var bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

//Object destructuring
var {mongoose}=require('./db/mongoose');
var {Todo}=require('./models/todo');
var {User}=require('./models/user');

var app=express();

//set upt he bodyParser middleware

app.use(bodyParser.json());

//to create new todos
app.post('/todos',(req,res)=>{
 //console.log(req.body);
 var todo = new Todo({
   text:req.body.text
 });
 todo.save().then((doc)=>{
   res.send(doc);

 },(err)=>{
   res.status(400).send(err);
 });
});

//reetrun all the todos
app.get('/todos',(req,res)=>{
  Todo.find().then((todos)=>{
    //send as an object
    res.send({todos});
  },(e)=>{
    res.status(400).send(e);
  });
});

//retrun by id
app.get('/todos/:id',(req,res)=>{
  var id=req.params.id;
  if(!ObjectID.isValid(id)){
    return res.status(404).send();
  }
  Todo.findById({_id:id}).then((todo)=>{
    if(!todo){
      return res.status(404).send();
    }
    //send as object
    res.status(200).send({todo});
  }).catch((e)=>{
    res.status(404).send();
  });
});


app.listen(3000,()=>{
  console.log("Server Started");
});

module.exports={app};
