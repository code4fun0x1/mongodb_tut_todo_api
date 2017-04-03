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
  //deleteMany()
  // db.collection('Todos').deleteMany({text:'eat lunch'}).then((result)=>{
  //   console.log(result);
  // });
  //deleteOne()
  // db.collection('Todos').deleteOne({text:'eat lunch'}).then((result)=>{
  //   console.log(result);
  // });
  //findOneAndDelete()
  db.collection('Todos').findOneAndDelete({completed:false}).then((result)=>{
    console.log(result);
  });

//b.close();
});
