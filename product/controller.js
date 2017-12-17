var Product = require('./model');

module.exports = {
	getProducts: (req, res, next) => {
		Product.find().then((docs) => {
			res.status(200).send(docs)
		}, (err) => {
			res.status(400).send(err)
		});
	},
	getSingleProduct: (req, res, next) => {
		id = req.params.id;
		Product.find({ _id: id }).then((docs) => {
			res.status(200).send(docs)
		}, (err) => {
			res.status(400).send(err)
		});
	},
	editProduct: (req, res, next) => {
		const model = req.body;
		const product = Product.findById(req.params.id)
			.then((doc) => {
				const updatedProduct = Object.assign(doc, model)
				updatedProduct.save().then((doc) => {
					res.status(200).send(doc)
				}).catch((err) => {
					res.status(400).send(err)
				})
			})
	},
	createProduct: (req, res, next) => {
		const ProductModel = new Product();

		const product = Object.assign(ProductModel, req.body)

		product.save().then((doc) => {

			res.status(200).send(doc)
		}).catch((err) => {
			res.status(500).send(err)
		})
	}
}
