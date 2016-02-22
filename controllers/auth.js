var db = require('../models');
var express = require('express');
var router = express.Router();
var session = require('express-session');
var bcrypt = require('bcrypt');
var bodyParser = require('body-parser');


router.use(bodyParser.urlencoded({extended: false}));

router.get('/signup', function(req, res) {
	res.render('auth/signUp');
});

router.post('/signUp', function(req, res) {
	if(req.body.password != req.body.password2) {
		console.log('Password do not match');
		res.redirect('/auth/signUp');
	} else {
		console.log(req.body);
		db.user.findOrCreate({
			where : {
				email : req.body.email
			},
			defaults : {
				email : req.body.email,
				password : req.body.password,
				age : req.body.age
			}
		}).spread(function(user, created) {
			if(created) {
				console.log('CHECKCEHCK')
				res.redirect('/');
			} else {
				console.log('User email exists error');
				res.redirect('/auth/signUp');
			}
		}).catch(function(err) {
			if(err.message) {
				console.log(err);
			} else {
				console.log(err);
			}
			req.session.user = user.id;
			res.render('results');
		});
	}
});

router.get('/signIn', function(req, res) {
	res.render('auth/signIn');
});

router.post('/signIn', function(req, res) {
	console.log(req.body.email);
	db.user.authenticate(req.body.email, req.body.password, function(err, user) {
		console.log('inside callback');
		if(err) {
			console.log('11111111111' + err);
			res.send(err);
		} else if (user) {
			req.session.user = user.id;
			console.log('Signed In');
			res.redirect('/results');
		} else {
			console.log('Invalid username or password');
			res.redirect('auth/signIn')
		}
	});
});

router.get('/logout', function(req, res) {
	console.log(req.session);
	req.session.user = undefined;
	console.log('Logging out');
	res.redirect('/');
});





module.exports = router;