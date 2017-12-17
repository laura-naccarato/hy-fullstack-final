var Game = require('./model');
var Season = require('../season/model');

module.exports = {
	getGames: (req, res, next) => {
		Game.find().then((docs) => {
			res.status(200).send(docs)
		}, (err) => {
			res.status(400).send(err)
		});
	},
	getSingleGame: (req, res, next) => {
		id = req.params.id;
		Game.find({ _id: id }).then((docs) => {
			res.status(200).send(docs)
		}, (err) => {
			res.status(400).send(err)
		});
	},
	editGame: (req, res, next) => {
		const model = req.body;
		const game = Game.findById(req.params.id)
			.then((doc) => {
				const updatedGame = Object.assign(doc, model)
				updatedGame.save().then((doc) => {
					res.status(200).send(doc)
				}).catch((err) => {
					res.status(400).send(err)
				})
			})
	},
	createGame: (req, res, next) => {
		Season.findById(req.body.Season, (err, season) => {
			if (err) throw new Error(err);
			const GameModel = new Game();

			const game = Object.assign(GameModel, req.body)
			
			game.save().then((doc) => {
				season.Games.push(doc)
				season.save()
				res.status(200).send(doc)
			}).catch((err) => {
				res.status(500).send(err)
			})
		})

	}
}
