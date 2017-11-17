var mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

//schema HERE
const User = new mongoose.Schema({
	//username: String,
	//hash: String,
	name:String,
	// tournaments: Object,
	// isAdmin: Boolean,
});

User.plugin(passportLocalMongoose);
mongoose.model('User',User);


const Tournament = new mongoose.Schema({
	users: [User],
	title: String
});

Tournament.plugin(passportLocalMongoose);

mongoose.model('Tournament',Tournament);

let dbconf;
if (process.env.NODE_ENV === 'PRODUCTION') {
	 const fs = require('fs');
	 const path = require('path');
	 const fn = path.join(__dirname, 'config.json');
	 const data = fs.readFileSync(fn);
	 const conf = JSON.parse(data);
	  dbconf = conf.dbconf;
} 
else {
 dbconf = 'mongodb://localhost/ik1025';
}

mongoose.connect(dbconf);



// is the environment variable, NODE_ENV, set to PRODUCTION? 
// if we're in PRODUCTION mode, then read the configration from a file
// use blocking file io to do this...
// our configuration file will be in json, so parse it and set the
// conenction string appropriately!
// if we're not in PRODUCTION mode, then use

// {"dbconf":"mongodb://ik1025:XDsd5mZy@class-mongodb.cims.nyu.edu/ik1025"}


// PORT=14433 NODE_ENV=PRODUCTION node app.js

//export PORT=14433; export NODE_ENV=PRODUCTION; ~/usr/local/lib/node_modules/.bin/forever -o ~/var/log/app.log -e ~/var/log/app_error.log start app.js