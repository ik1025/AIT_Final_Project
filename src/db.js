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

mongoose.connect('mongodb://localhost/hw05',{useMongoClient:true});