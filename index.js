var express = require('express');
var ejsLayouts = require('express-ejs-layouts');
var request = require('request');
var bodyParser = require('body-parser');
var app = express();
var db = require('./models');
var bcrypt = require('bcrypt');
var session = require('express-session');

app.set('view engine', 'ejs');
app.use(ejsLayouts);
app.use(express.static(__dirname + '/static'));
app.use(bodyParser.urlencoded({extended: false}));

app.use('/auth', require('./controllers/auth.js'));


app.use(session({
	secret: 'super duper secret words',
	resave: false,
	saveUninitialized: true
}));

// app.use(function(req, res, next) {
// 	if(req.session.user) {
// 		console.lo('MISSSS');
// 		db.user.findById(req.session.user).then(function(user) {
// 			req.currentUser = user;
// 			next();
// 		});
// 	} else {
// 		console.log('HITTT')
// 		req.currentUser = false;
// 		next();
// 	}
// })

//Home Page/Login Page 
app.get('/', function(req, res) {
  res.render('index');
});
//Favorites Page...you know for like favorites and stuff
app.get('/favorites', function(req, res) {
	console.log(req.currentUser);
	if(req.currentUser) {
		res.render('/favorites');
	} else {
		console.log('THIS SHOULD NOT HAPPEN')
		res.redirect('/')
	}
});
//Search/Results/Maps page
app.get('/results', function(req, res) {
	res.render('results');
});
//Should take in search criteria
app.post('/results', function(req, res) {
	console.log(req.body)
});







app.listen(3000);