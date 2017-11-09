const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const path = require('path');
app.use(bodyParser.urlencoded({extended: false}));
const publicPath = path.resolve(__dirname,"public");
app.use(express.static(publicPath));

app.set('view engine', 'hbs');

require('./db');
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

var User = mongoose.model('User');
var Tournament = mongoose.model('Tournament');


app.get('/bracket',(req,res) =>{

	Tournament.find({},function(err,x,count) {
		var a = x[x.length-1];
		//console.log(a);
		res.render('adding',{"info":a});
	});
});

app.get('/',(req,res) => {
	let title = req.query.title;
	var x = [];

	for(let i = 1; i < 9; i++) {
		x.push(req.query['Seed' + i]);
	}

	var tourny = new Tournament({
		users: x,
		title: title
	});

	tourny.save(function(err,tournament,count) {
		//console.log(tourny);
	});

	if(req.query.title === undefined) {
		//console.log('true');

		res.render('index');
	}
	else {
		//console.log('false');
		res.redirect('/bracket');
	}
});


app.listen(process.env.PORT || 3000);