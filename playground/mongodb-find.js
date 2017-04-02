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

//Reading from DB
//find() returns the cursor(a pointer) not he actul data
//toArray() returns a promise
//below fetches entire collection
  // db.collection('Todos').find().toArray().then((docs)=>{
  //   console.log('Todos');
  //   console.log(JSON.stringify(docs,undefined,2));
  // },(err)=>{
  //   console.log(err);
  // });

//use query to find only those whose 'completed' is false
  // db.collection('Todos').find({completed:false}).toArray().then((docs)=>{
  //   console.log(JSON.stringify(docs,undefined,2));
  // },(err)=>{
  //   console.log(err);
  // });

//query by _id property
//_id is ObjectID() object not a string
// db.collection('Todos').find({
//   _id:new ObjectID("58e0d2feae68c704dc4013ee")
// }).toArray().then((docs)=>{
//   console.log(JSON.stringify(docs,undefined,2));
// },(err)=>{
//   console.log(err);
// });

//use count() to find no of documents with promise
db.collection('Todos').find().count().then((count)=>{
  console.log(`Todos count ${count}`);
},(err)=>{
  console.log(err);
});

//test to query all users with given names

db.collection('Users').find({name:'Shashank Yadav'}).toArray().then((docs)=>{
  console.log(JSON.stringify(docs,undefined,3));
},(err)=>{});
console.log(err);

//b.close();
});
