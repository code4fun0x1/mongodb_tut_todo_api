const {SHA256} = require('crypto-js');
const jwt= require('jsonwebtoken');
const bcrypt = require('bcryptjs');


//below for crypto-js
// var message='i am user 3';
// var hash=SHA256(message).toString();
//
// console.log(hash);
//
// var data={
//   id:4
// };
// var token={
//   data,
//   hash:SHA256(JSON.stringify(token.data)+'somesecret').toString();
// };
//
// var resultHash=SHA256(JSON.stringify(token.data)).toString();
//
// if(hash ===resultHash){
//   console.log('correct data');
// }else{
//   console.log('tampered data');
// }



//sign the token and send
//jwt.sign
//verify the receiverd token
//jwt.verify

// var data={
//   id:10
// };
//
// //here 123abc is the secret code
// var token=jwt.sign(data,'123abc');
// console.log(token);
//
// var decoded=jwt.verify(token,'123abc');
// console.log(decoded);

//bcryptjs
var password='123abc';
 //10 rounds for salt generation
// bcrypt.genSalt(10,(err,salt)=>{
//   bcrypt.hash(password,salt, (err,hash)=>{
//     console.log(hash);
//   });
// });
var hashedPassword= '$2a$10$Wed.d4/xC1Wr2Rkatj.4Yeu7CnkgYqUlaVRzSBFrLJIv.xEP3Wm/e';
bcrypt.compare(password , hashedPassword, (err,res)=>{
  console.log(res);
});
