var mongoose = require('mongoose');

//schema HERE
const User = new mongoose.Schema({
	username: String,
	hash: String,
	tournaments: Object,
	isAdmin: Boolean,
});

mongoose.model('User',User);


const Tournament = new mongoose.Schema({
	users: Object,
	title: String
});

mongoose.model('Tournament',Tournament);

let dbconf;
// is the environment variable, NODE_ENV, set to PRODUCTION? 
if (process.env.NODE_ENV === 'PRODUCTION') {
 // if we're in PRODUCTION mode, then read the configration from a file
 // use blocking file io to do this...
 const fs = require('fs');
 const path = require('path');
 const fn = path.join(__dirname, 'config.json');
 const data = fs.readFileSync(fn);

 // our configuration file will be in json, so parse it and set the
 // conenction string appropriately!
 const conf = JSON.parse(data);

  dbconf = conf.dbconf;
} else {
 // if we're not in PRODUCTION mode, then use
 dbconf = 'mongodb://localhost/ik1025';
}

mongoose.connect(dbconf);

// {"dbconf":"mongodb://ik1025:XDsd5mZy@class-mongodb.cims.nyu.edu/ik1025"}


// PORT=14433 NODE_ENV=PRODUCTION node app.js