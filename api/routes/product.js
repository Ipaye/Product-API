const Product = require('../models/product');
const mongoose = require('mongoose');
const express = require('express');
const multer = require('multer');

const storage = multer.diskStorage({
	destination: function(req, file, cb) {
		cb(null, './uploads/');
	},
	filename: function(req, file, cb) {
		cb(null, new Date().toISOString() + file.originalname);
	}
});

const upload = multer({ storage: storage });

const router = express.Router();

router.get('/', (req, res, next) => {
	Product.find()
		.then(products => {
			res.status(200).json({
				status: 'success',
				message: 'Getting All products',
				products: products.map(product => {
					return {
						_id: product._id,
						name: product.name,
						price: product.price,
						request: {
							type: 'GET',
							url: 'http://localhost:3000/products/' + product._id
						}
					};
				}),
				count: products.length
			});
		})
		.catch(err => {
			next(err);
		});
});

router.post('/', upload.single('productImage'), (req, res, next) => {
	console.log(req.file);
	const newProduct = new Product({
		_id: mongoose.Types.ObjectId(),
		name: req.body.name,
		price: req.body.price,
		productImage: req.file.path
	});

	newProduct
		.save()
		.then(function(result) {
			res.status(201).json({
				message: 'Saved new Product 🙋',
				status: 'Success',
				result
			});
			console.log(result);
		})
		.catch(err => {
			next(err);
		});
});

router.get('/:id', (req, res, next) => {
	let productID = req.params.id;

	Product.findById(productID)
		.select('name price _id')
		.exec()
		.then(product => {
			res.status(200).json({
				message: 'handling GET request /products/:id',
				product,
				request: {
					type: 'Get',
					url: 'http://localhost:3000/products'
				}
			});
		})
		.catch(err => {
			next(err);
		});
});

router.patch('/:id', (req, res, next) => {
	const id = req.params.id;
	const updateOps = {};
	for (const ops of req.body) {
		updateOps[ops.propName] = ops.value;
	}
	Product.update({ _id: id }, { $set: updateOps })
		.exec()
		.then(result => {
			console.log(updateOps);
			res.status(200).json({
				result
			});
		})
		.catch(err => next(err));
});

router.delete('/:id', (req, res, next) => {
	const ProductID = req.params.id;
	Product.findByIdAndRemove(ProductID)
		.then(result => {
			if (!result) {
				return res.status(404).json({
					message: 'No Product found'
				});
			}
			res.status(200).json({
				result,
				message: 'product Deleted'
			});
		})
		.catch(err => next(err));
});

module.exports = router;
