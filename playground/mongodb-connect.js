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
  //insert a new record
  // db.collection('Todos').insertOne({
  //   text:'Something to do',
  //   completed:false
  // },(err,result)=>{
  //   //callback for success or error
  //   //table is called collection
  //   //row or record is called document
  //   if(err){
  //     return console.log('Unable to insert',err);
  //   }
  //   console.log(JSON.stringify(result.ops, undefined,4));
  // });

  //test insert name,age,locatioon
  db.collection('Users').insertOne({
    name:'Shashank Yadav',
    age:22,
    location:'Delhi, India'
  },(err,res)=>{
    if(err){
      return console.log('Error Occured',err);
    }
    //console.log(JSON.stringify(res.ops,undefined,2));
    //print any specific field
    console.log(res.ops[0].age);
  });


  db.close();
});
