var express = require('express');
var app = express();
var path = require('path');
const mongoose = require('mongoose');
const passport = require('passport');
const User = require('./user/model');
const products = require('./product/controller');
const seasons = require('./season/controller');
const users = require('./user/controller');
const games = require('./game/controller');
const bodyParser = require('body-parser');
const session = require('express-session');
const requireLogin = require('./require_login');

passport.use(User.createStrategy());
app.use(bodyParser.json());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(session({ secret: process.env.COOKIE_SECRET, resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());


// This serves all files placed in the /public
mongoose.connect(process.env.MONGODB_SERVER, {
	useMongoClient: true,
});
// directory (where gulp will build all React code)
app.use(express.static('public'));

// Also serve everything from our assets directory (static
// assets that you want to manually include)
app.use(express.static('assets'));

// Include your own logic here (so it has precedence over the wildcard
// route below)

// User controller
app.post('/api/signup', users.signUp);
app.post('/api/login', passport.authenticate('local'), (req, res) => {
	res.send(req.user);
});
app.get('/api/logout', (req, res) => {
	req.logout();
	res.json('User logged out.');
});
app.get('/api/me', (req, res) => {
	if (req.user) {
		res.status(200).send(req.user)
	} else {
		res.status(401).json({ message: "Unauthorized." });
	}
});


// Season controller
app.get('/api/seasons', requireLogin,  seasons.getSeasons);
app.get('/api/seasons/:id', requireLogin,  seasons.getSingleSeason);
app.put('/api/seasons/:id', requireLogin,  seasons.editSeason);
app.post('/api/seasons', requireLogin,  seasons.createSeason);

// Product controller
app.get('/api/products',  products.getProducts);
app.get('/api/products/:id',  products.getSingleProduct);
app.put('/api/products/:id',  products.editProduct);
app.post('/api/products',  products.createProduct);

// Product controller
app.get('/api/games', requireLogin,  games.getGames);
app.get('/api/games/:id', requireLogin,  games.getSingleGame);
app.put('/api/games/:id', requireLogin,  games.editGame);
app.post('/api/games', requireLogin,  games.createGame);

// This route serves your index.html file (which
// initializes React)
app.get('*', function (req, res, next) {
	res.sendFile(path.join(__dirname, 'index.html'));
});

// Start your server, and listen on port 8080.
app.listen(8080, function () {
	console.log(`App is now listening on port ${process.env.PORT}!`);
})
