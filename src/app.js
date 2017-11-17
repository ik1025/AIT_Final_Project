
//----------------------------------IMPORTING STUFF-----------------------------
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
const session = require('express-session');

//--------------------------------DB STUFF---------------------------------------
require('./db');
require('./auth');
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var User = mongoose.model('User');
var Tournament = mongoose.model('Tournament');

//-------------------------------MIDDLEWARE-------------------------------------
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

//----------------------------------ROUTE HANDLERS--------------------------------
app.get('/',function(req,res) {
  res.render('welcome');
});

app.get('/login', function(req, res) {
  res.render('login');
});

app.post('/login', function(req,res,next) {
  passport.authenticate('local', function(err,user) {
    if(user) {
      req.logIn(user, function(err) {
        res.redirect('/createTourny');
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
        res.redirect('/createTourny');
      });
    }
  });   
});



app.get('/createTourny',function(req,res) {
  res.render('index');
});


app.post('/createTourny', function(req,res) {
   let title = req.body.title;
   var x = [];
   if(req.body['Seed1'] !== undefined) {
     for(let i = 1; i < 9; i++) {
      // create a list of new User objects
      var UserObj = new User({
        name: req.body['Seed' + i]
      });
       x.push(UserObj);
     }

     var tourny = new Tournament({
       users: x,
       title: title
     });

     tourny.save(function(err,tournament,count) {
      console.log('Tournament Saved');
      console.log(tourny);
      res.redirect('/bracket');
     });
   }
});

  var winners = [];

app.get('/bracket',function(req,res) {
 Tournament.find({},function(err,x,count) {
    var a = x[x.length-1];
   console.log('From DB');
   console.log(x);
   res.render('adding',{"info":a, "FirstWin":winners});
 });
});

app.post('/bracket',function(req,res) {
  for(let i = 1; i < 5; i++) {
    winners.push(req.body['Winner' + i]);
  }
  res.redirect('/bracket');
});

//------------------------------PORT LISTENING-------------------------------
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














// app.get('/', function(req, res) {
//   res.render('index');
// });

// app.get('/login', function(req, res) {
//   res.render('login');
// });

// app.post('/login', function(req,res,next) {
//   passport.authenticate('local', function(err,user) {
//     if(user) {
//       req.logIn(user, function(err) {
//         res.redirect('/');
//       });
//     } else {
//       res.render('login', {message:'Your login or password is incorrect.'});
//     }
//   })(req, res, next);
// });



// app.get('/register', function(req, res) {
//   res.render('register');
// });

// app.post('/register', function(req, res) {
//   User.register(new User({username:req.body.username}), 
//       req.body.password, function(err, user){
//     if (err) {
//       res.render('register',{message:'Your registration information is not valid'});
//     } else {
//       passport.authenticate('local')(req, res, function() {
//         res.redirect('/');
//       });
//     }
//   });   
// });

























//app.get('/createTourny',function(req,res) {
//    let title = req.query.title;
//    var x = [];
//    if(req.query['Seed1'] !== undefined) {
//      for(let i = 1; i < 9; i++) {
//        x.push(req.query['Seed' + i]);
//      }

//      var tourny = new Tournament({
//        users: x,
//        title: title
//      });

//      tourny.save(function(err,tournament,count) {
//       console.log('Tournament Saved');
//       console.log(tourny);
//      });
//    }

//    if(req.query.title === undefined) {
//      res.render('index');
//    }
//    else {
//      res.redirect('/bracket');
//    }
// });


// app.get('/bracket',function(req,res) {
//  Tournament.find({},function(err,x,count) {
//    var a = x[x.length-1];
//    console.log('From DB');
//    console.log(a);
//    res.render('adding',{"info":a});
//  });
// });