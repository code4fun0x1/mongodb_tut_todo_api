var mongoose = require('mongoose');
//set up promise for mongoose
mongoose.Promise = global.Promise;
//give it the conneection asynchonouusly
//but mongoose handle everything
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/TodoApp');


module.exports={mongoose};
