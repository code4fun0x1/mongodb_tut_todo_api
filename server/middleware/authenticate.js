var {User} = require('./../models/user');

var authenticate = (req,res,next)=>{
  var token=req.header('x-auth');
  User.findByToken(token).then((user)=>{
    if(!user){
      //valid auth token but for some reason cannot find the user
      //401 means auth requires
      return Promise.reject();
      //or
    }
    req.user=user;
    req.token=token;
    next();
  }).catch((err)=>{
    res.status(401).send();
  });
};

module.exports={authenticate};
