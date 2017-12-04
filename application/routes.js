module.exports = function(app,passport) {

	function Tournament(title, users) {
		this.title = title;
		this.users = users;
	}

	app.get('/',function(req,res) {
		res.render('index.hbs');
	});

	app.get('/login',function(req,res) {
		res.render('login.hbs', {message: req.flash('loginMessage')});
	});

    // process the login form
    app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/createBracket', // redirect to the secure profile section
        failureRedirect : '/login', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));


	app.get('/signup',function(req,res) {
		res.render('signup.hbs', {message: req.flash('signupMessage')});
	});

    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/createBracket', // redirect to the secure profile section
        failureRedirect : '/signup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    app.get('/auth/facebook', passport.authenticate('facebook', { 
      scope : ['public_profile', 'email']
    }));

    // handle the callback after facebook has authenticated the user
    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect : '/createBracket',
            failureRedirect : '/'
        }));

	app.get('/createBracket', isLoggedIn, function(req,res) {
		if(req.user.Tournament === undefined) {
			res.render('createBracket.hbs', {user: req.user});
		}
		
		else {
			res.redirect('/bracketDisplay');
		}
	});

	app.post('/createBracket', isLoggedIn,function(req,res) {
		let tName = req.body.bracketTitle;
		var tUsers = [];

		for(let i = 1; i < 9; i++) {
			tUsers.push(req.body['User' + i]);
		}

		curTournament = new Tournament(tName,tUsers);

		req.user.Tournament = curTournament;

		req.user.save();

		// console.log('In the Post:');
		// console.log(req.user);
		// console.log();

		res.redirect('/bracketDisplay');		
	});

	app.get('/bracketDisplay',isLoggedIn,function(req,res) {
		var Gizone = [];
		let UnoaDos = OnetoTwo;
		console.log(OnetoTwo);
		console.log(UnoaDos);
		Gizone.push(OnetoTwo);
		res.render('bracketDisplay.hbs', {user:req.user, tourny: req.user.Tournament, gone: OnetoTwo});
	});

	let OnetoTwo = '';

	app.post('/bracketDisplay',function(req,res) {
		var ROWinners = [];
		
		if(req.body.G1 === 'top') {
			req.user.Tournament.users.push(req.user.Tournament.users[0]);
			req.user.markModified('Tournament');
			req.user.save();
		}
		if(req.body.G1 === 'Bottom') {
			req.user.Tournament.users.push(req.user.Tournament.users[7]);
			req.user.markModified('Tournament');
			req.user.save();
		}
		if(req.body.G2 === 'top') {
			req.user.Tournament.users.push(req.user.Tournament.users[3]);
			req.user.markModified('Tournament');
			req.user.save();
		}
		if(req.body.G2 === 'Bottom') {
			req.user.Tournament.users.push(req.user.Tournament.users[4]);
			req.user.markModified('Tournament');
			req.user.save();
		}
		if(req.body.G3 === 'top') {
			req.user.Tournament.users.push(req.user.Tournament.users[2]);
			req.user.markModified('Tournament');
			req.user.save();
		}
		if(req.body.G3 === 'Bottom') {
			req.user.Tournament.users.push(req.user.Tournament.users[5]);
			req.user.markModified('Tournament');
			req.user.save();
		}
		if(req.body.G4 === 'top') {
			req.user.Tournament.users.push(req.user.Tournament.users[1]);
			req.user.markModified('Tournament');
			req.user.save();
		}
		if(req.body.G4 === 'Bottom') {
			req.user.Tournament.users.push(req.user.Tournament.users[6]);
			req.user.markModified('Tournament');
			req.user.save();
		}
		if(req.body.G5 === 'top') {
			req.user.Tournament.users.push(req.user.Tournament.users[8]);
			req.user.markModified('Tournament');
			req.user.save();
		}
		if(req.body.G5 === 'Bottom') {
			req.user.Tournament.users.push(req.user.Tournament.users[9]);
			req.user.markModified('Tournament');
			req.user.save();
		}
		if(req.body.G6 === 'top') {
			req.user.Tournament.users.push(req.user.Tournament.users[10]);
			req.user.markModified('Tournament');
			req.user.save();
		}
		if(req.body.G6 === 'Bottom') {
			req.user.Tournament.users.push(req.user.Tournament.users[11]);
			req.user.markModified('Tournament');
			req.user.save();
		}
		if(req.body.G7 === 'top') {
			req.user.Tournament.users.push(req.user.Tournament.users[12]);
			req.user.markModified('Tournament');
			req.user.save();
		}
		if(req.body.G7 === 'Bottom') {
			req.user.Tournament.users.push(req.user.Tournament.users[13]);
			req.user.markModified('Tournament');
			req.user.save();
		}

		req.user.save();
		res.redirect('/bracketDisplay');
	});

	app.get('/logout', function(req,res) {
		req.logout();
		res.redirect('/');
	});


	//make sure User is logged in
	function isLoggedIn(req,res,next) {
		if(req.isAuthenticated()) {
			return next();
		}

		res.redirect('/');
	}


}