//const MongoClient=require('mongodb').MongoClient;

//new ES6 feature object destructuring
//var user={name:'ABC',age:22};
//var {name}=user;
//here we extracted the 'name' property of user and stored
//it in anew name variable

const {MongoClient,ObjectID}=require('mongodb');

//id are auto generated but we can create it manually
// var id=new ObjectID();
// console.log(id);

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db)=>{
  if(err){
    return console.log('Connection Error for MongoDB');
  }
  console.log('Connected to MongoDB');
  // db.collection('Todos').findOneAndUpdate(
  //   {
  //     _id:new ObjectID('58e105f9cd45b8089ac4b9fc')
  //   },{
  //     $set:{
  //       completed:true
  //     }
  //   },{
  //     returnOriginal:false
  //   }
  // ).then((result)=>{
  //   console.log(result);
  // },(err)=>{
  //   console.log(err);
  // });

  //test update 'Users' increment users age by une bu using $inc opeprator
  db.collection('Users').findOneAndUpdate(
    {
      _id:new ObjectID('58e0dcc1a16cb818c463892b')
    },{
      $inc:{
        age:3
      }
    },{
      returnOriginal:false
    }
  ).then((result)=>{
    console.log(result);
  });

});
