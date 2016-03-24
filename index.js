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
<<<<<<< HEAD
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
=======
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
>>>>>>> 3076cd1053d58c35b24a42948ca0204b1e537cba
})
app.use(function(req,res,next){
  res.locals.currentUser = req.currentUser;
  next();
})

<<<<<<< HEAD
//Home Page/Login Page
=======
//Home Page/Login Page 
>>>>>>> 3076cd1053d58c35b24a42948ca0204b1e537cba
app.get('/', function(req, res) {
  console.log(req.session.currentUser)
  res.render('index');
});

//Gets favorites, but only for logged in user
app.get('/favorites', function(req, res) {
<<<<<<< HEAD
    if(typeof req.session.user === 'undefined') {
        res.redirect('/');
        return
    } else {
        db.user.findOne({where: {id: req.session.user}}).then(function(user) {
            user.getFavorites().then(function(favorites) {
                res.render('favorites', {favorites: favorites})
            })
        })
    }
=======
	if(typeof req.session.user === 'undefined') {
		res.redirect('/');
		return
	} else {
		db.user.findOne({where: {id: req.session.user}}).then(function(user) {
			console.log('WHAT THE FUCK')
			user.getFavorites().then(function(favorites) {
				res.render('favorites', {favorites: favorites})
			})
		})
	}
>>>>>>> 3076cd1053d58c35b24a42948ca0204b1e537cba
});

//Delete route for favorites
app.get('/favorites/:name', function(req, res) {
<<<<<<< HEAD
    db.favorite.destroy({
        where : {
            name : req.params.name
        }
    }).then(function() {
        res.redirect('/favorites')
    }).catch(function(e) {
        res.send({'msg': 'error', 'error': e})
    });
=======
	db.favorite.destroy({
		where : {
			name : req.params.name
		}
	}).then(function() {
		res.redirect('/favorites')
	}).catch(function(e) {
		res.send({'msg': 'error', 'error': e})
	});
>>>>>>> 3076cd1053d58c35b24a42948ca0204b1e537cba
});

//Search/Results/Maps page
app.get('/results', function(req, res) {
<<<<<<< HEAD
    console.log('session users = '+req.session.user)
    res.render('results');
});

app.get('/edit/:id', function(req, res) {
    work = parseInt(req.params.id);
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
=======
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
>>>>>>> 3076cd1053d58c35b24a42948ca0204b1e537cba
})

//Takes location title and takes you to comment page
app.post('/results', function(req, res) {
<<<<<<< HEAD
    if(typeof req.session.user === 'undefined') {
        res.redirect('/results');
        return
    } else {
        console.log(req.body.title)
        res.render('notes', {title: req.body.title})
    };
=======
	console.log('hello');
	console.log(req.body.title)
	res.render('notes', {title: req.body.title})
>>>>>>> 3076cd1053d58c35b24a42948ca0204b1e537cba
});

// Posts takes title and comments and adds it to db
app.post('/notes', function(req, res) {
<<<<<<< HEAD
    var newFav = {
        name: req.body.title,
        comment : req.body.comment,
        userId : req.session.user
    }
    db.favorite.create(newFav).then(function() {
        res.redirect('/favorites')
    })
=======
	var newFav = {
		name: req.body.title,
		comment : req.body.comment,
		userId : req.session.user
	}
	db.favorite.create(newFav).then(function() {
		res.redirect('/favorites')
	})
>>>>>>> 3076cd1053d58c35b24a42948ca0204b1e537cba
});


app.use('/auth', require('./controllers/auth.js'));






app.listen(process.env.PORT || 3000);





