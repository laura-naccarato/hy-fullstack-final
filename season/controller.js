var Season = require('./model');
require('../game/model')
module.exports = {
	getSeasons: (req, res, next) => {
		Season.find().then((docs) => {
			res.status(200).send(docs)
		}, (err) => {
			res.status(400).send(err)
		});
	},
	getSingleSeason: (req, res, next) => {
		id = req.params.id;
		Season.findOne({ _id: id }).populate("Games").exec().then((docs) => {
			res.status(200).send(docs)
		}, (err) => {
			res.status(400).send(err)
		});
	},
	editSeason: (req, res, next) => {
		const model = req.body;
		const season = Season.findById(req.params.id)
			.then((doc) => {
				const updatedSeason = Object.assign(doc, model)
				updatedSeason.save().then((doc) => {
					res.status(200).send(doc)
				}).catch((err) => {
					res.status(400).send(err)
				})
			})
	},
	createSeason: (req, res, next) => {
		const SeasonModel = new Season();
		const season = Object.assign(SeasonModel, req.body)

		season.save().then((doc) => {

			res.status(200).send(doc)
		}).catch((err) => {
			res.status(500).send(err)
		})
	}
}