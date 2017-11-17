const express = require('express');
const app = express();
const router = express.Router();
const passport = require('passport');

const bodyParser = require('body-parser');
const path = require('path');
app.use(bodyParser.urlencoded({extended: false}));
const publicPath = path.resolve(__dirname,"public");
app.use(express.static(publicPath));

app.set('view engine', 'hbs');

require('./db');
require('./auth');
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

var User = mongoose.model('User');
var Tournament = mongoose.model('Tournament');

const session = require('express-session');
const sessionOptions = {
	secret: 'secret cookie thang (store this elsewhere!)',
	resave: true,
	saveUninitialized: true
};
app.use(session(sessionOptions));

app.use(passport.initialize());
app.use(passport.session());

app.use(function(req, res, next){
	res.locals.user = req.user;
	next();
});


app.get('/', function(req, res) {
  res.render('index');
});

app.get('/login', function(req, res) {
  res.render('login');
});

app.post('/login', function(req,res,next) {
  passport.authenticate('local', function(err,user) {
    if(user) {
      req.logIn(user, function(err) {
        res.redirect('/');
      });
    } else {
      res.render('login', {message:'Your login or password is incorrect.'});
    }
  })(req, res, next);
});



app.get('/register', function(req, res) {
  res.render('register');
});

app.post('/register', function(req, res) {
  User.register(new User({username:req.body.username}), 
      req.body.password, function(err, user){
    if (err) {
      res.render('register',{message:'Your registration information is not valid'});
    } else {
      passport.authenticate('local')(req, res, function() {
        res.redirect('/');
      });
    }
  });   
});
// route handlers go above
module.exports = router;
app.listen(process.env.PORT || 3000);
//app.listen(3000);















//---------------APP.JS---------------------------------
// app.get('/bracket',(req,res) =>{

// 	Tournament.find({},function(err,x,count) {
// 		var a = x[x.length-1];
// 		//console.log(a);
// 		res.render('adding',{"info":a});
// 	});
// });

// app.get('/',(req,res) => {
// 	let title = req.query.title;
// 	var x = [];
// 	for(let i = 1; i < 9; i++) {
// 		x.push(req.query['Seed' + i]);
// 	}
// 	var tourny = new Tournament({
// 		users: x,
// 		title: title
// 	});
// 	tourny.save(function(err,tournament,count) {
// 		console.log('Tournament Saved');
// 	});

// 	if(req.query.title === undefined) {
// 		res.render('index');
// 	}
// 	else {
// 		res.redirect('/bracket');
// 	}
// });

