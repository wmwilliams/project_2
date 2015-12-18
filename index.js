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



app.use(session({
	secret: 'super duper secret words',
	resave: false,
	saveUninitialized: true
}));

app.use(function(req, res, next) {
	if(req.session.user) {
		db.user.findById(req.session.user).then(function(user) {
			req.currentUser = user;
			next();
		});
	} else {
		req.currentUser = false;
		next();
	}
})
app.use(function(req,res,next){
  res.locals.currentUser = req.currentUser;
  next();
})

//Home Page/Login Page 
app.get('/', function(req, res) {
  console.log(req.session.currentUser)
  res.render('index');
});

//Gets favorites, but only for logged in user
app.get('/favorites', function(req, res) {
	if(typeof req.session.user === 'undefined') {
		res.redirect('/');
		return
	} else {
		db.user.findOne().then(function(user) {
			console.log('WHAT THE FUCK')
			user.getFavorites().then(function(favorites) {
				res.render('favorites', {favorites: favorites})
			})
		})
	}
});

//Delete route for favorites
app.get('/favorites/:name', function(req, res) {
	db.favorite.destroy({
		where : {
			name : req.params.name
		}
	}).then(function() {
		res.redirect('/favorites')
	}).catch(function(e) {
		res.send({'msg': 'error', 'error': e})
	});
});

//Search/Results/Maps page
app.get('/results', function(req, res) {
	console.log('session users = '+req.session.user)
	if(typeof req.session.user === 'undefined') {
		res.redirect('/');
		return
	} else {
		res.render('results');
	}
});

//FUCK EVERYTHING
app.get('/edit/:id', function(req, res) {
	work = parseInt(req.params.id);
	console.log("TTTTTTTTTTTTTTTTTTTTTTTTTTT" + work);
	db.favorite.findOne({where : {id : work}}).then(function(favorites) {
		res.render('edit', {favorites: favorites}).then(function(){
			db.destroy({where: {id: work}})
		})
	})
});

app.post('/edit', function(req, res) {
	db.favorite.findOrCreate({
		where : {
			name : req.body.name
		}
	}).spread(function(user, created) {
		if(created) {
			console.log("WHATS GOING ON");
			res.redirect('/favorites');
		} else {
			console.log('FAILUUUUUUUURE');
			res.redirect('/');
		}
	}).catch(function(err) {
		if(err.message) {
			console.log(err);
		} else {
			console.log('UNDEFINED I HOPE' + err)
		}
		req.session.user = user.id;
		res.render('favorites');
	})
})

//Takes location title and takes you to comment page
app.post('/results', function(req, res) {
	console.log('hello');
	console.log(req.body.title)
	res.render('notes', {title: req.body.title})
});

// Posts takes title and comments and adds it to db
app.post('/notes', function(req, res) {
	var newFav = {
		name: req.body.title,
		comment : req.body.comment,
		userId : req.session.user
	}
	db.favorite.create(newFav).then(function() {
		res.redirect('/favorites')
	})
});


app.use('/auth', require('./controllers/auth.js'));






app.listen(process.env.PORT || 3000);





