module.exports = function(app,passport) {

	function Tournament(title, users) {
		this.title = title;
		this.users = users;
	}

	app.get('/',function(req,res) {
		res.render('index');
	});

	app.get('/login',function(req,res) {
		res.render('login', {message: req.flash('loginMessage')});
	});

    // process the login form
    app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/createBracket', // redirect to the secure profile section
        failureRedirect : '/login', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));


	app.get('/signup',function(req,res) {
		res.render('signup', {message: req.flash('signupMessage')});
	});

    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/createBracket', // redirect to the secure profile section
        failureRedirect : '/signup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
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
		var tusersCopy = [];

		for(let i = 1; i < 9; i++) {
			tUsers.push(req.body['User' + i]);
		}

		tUsers.forEach(function(x) {
			tusersCopy.push(x);
		});

		curTournament = new Tournament(tName,tusersCopy);
		req.user.Tournament = curTournament;
		req.user.save();
		res.redirect('/bracketDisplay');		
	});

	function notSpace(value) {
		return value !== undefined;
	}

	app.get('/bracketDisplay',isLoggedIn,function(req,res) {
		var tourny2 = [];
		req.user.Tournament.users.forEach(function(x) {
			tourny2.push(x);
		});

		var tourny3 = tourny2.filter(notSpace);
		res.render('bracketDisplay', {user:req.user, titlez: req.user.Tournament.title, other: tourny3});
	});

	app.post('/bracketDisplay',function(req,res) {
		var AvgSeed = [];

			if(req.body.G1 === 'top') {
				AvgSeed.push(1);
				req.user.Tournament.users.push(req.user.Tournament.users[0]);
				req.user.markModified('Tournament');
				req.user.save();
			}
			if(req.body.G1 === 'Bottom') {
				AvgSeed.push(8);
				req.user.Tournament.users.push(req.user.Tournament.users[7]);
				req.user.markModified('Tournament');
				req.user.save();
			}

			if(req.body.G2 === 'top') {
				AvgSeed.push(4);
				req.user.Tournament.users.push(req.user.Tournament.users[3]);
				req.user.markModified('Tournament');
				req.user.save();
			}
			if(req.body.G2 === 'Bottom') {
				AvgSeed.push(5);
				req.user.Tournament.users.push(req.user.Tournament.users[4]);
				req.user.markModified('Tournament');
				req.user.save();
			}

			if(req.body.G3 === 'top') {
				AvgSeed.push(3);
				req.user.Tournament.users.push(req.user.Tournament.users[2]);
				req.user.markModified('Tournament');
				req.user.save();
			}
			if(req.body.G3 === 'Bottom') {
				AvgSeed.push(6);
				req.user.Tournament.users.push(req.user.Tournament.users[5]);
				req.user.markModified('Tournament');
				req.user.save();
			}

			if(req.body.G4 === 'top') {
				AvgSeed.push(2);
				req.user.Tournament.users.push(req.user.Tournament.users[1]);
				req.user.markModified('Tournament');
				req.user.save();
			}
			if(req.body.G4 === 'Bottom') {
				AvgSeed.push(7);
				req.user.Tournament.users.push(req.user.Tournament.users[6]);
				req.user.markModified('Tournament');
				req.user.save();
			}

			if(req.body.G5 === 'top') {
				AvgSeed.push(AvgSeed[0]);
				req.user.Tournament.users.push(req.user.Tournament.users[8]);
				req.user.markModified('Tournament');
				req.user.save();
			}
			if(req.body.G5 === 'Bottom') {
				AvgSeed.push(AvgSeed[1]);
				req.user.Tournament.users.push(req.user.Tournament.users[9]);
				req.user.markModified('Tournament');
				req.user.save();
			}

			if(req.body.G6 === 'top') {
				AvgSeed.push(AvgSeed[2]);
				req.user.Tournament.users.push(req.user.Tournament.users[10]);
				req.user.markModified('Tournament');
				req.user.save();
			}
			if(req.body.G6 === 'Bottom') {
				AvgSeed.push(AvgSeed[3]);
				req.user.Tournament.users.push(req.user.Tournament.users[11]);
				req.user.markModified('Tournament');
				req.user.save();
			}

			if(req.body.G7 === 'top') {
				AvgSeed.push(AvgSeed[4]);
				req.user.Tournament.users.push(req.user.Tournament.users[12]);
				req.user.markModified('Tournament');
				req.user.save();
			}
			if(req.body.G7 === 'Bottom') {
				AvgSeed.push(AvgSeed[5]);
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