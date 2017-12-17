var User = require('./model');

module.exports = {
	signUp: (req, res, next) => {
		const newUser = new User({
			Name: req.body.Name,
			Email: req.body.Email,
		});

		User.register(newUser, req.body.Password, (err, user) => {
			if (err) {
				res.status(400).send(err)
			} else {
				req.logIn(user, (err) => {
					res.send(user);
				});

			}
		});
	}
}