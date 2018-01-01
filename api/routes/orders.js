const express = require('express');
const mongoose = require('mongoose');
const Order = require('../models/order');
const Product = require('../models/product');

const router = express.Router();

router.get('/', (req, res, next) => {
	Order.find()
		//This populates the Product Field and the select only the field specified in the second argument
		.populate('productID', '_id name price')
		.then(orders => {
			console.log(orders);
			res.status(200).json({
				status: 'success',
				message: 'Getting All Orders',
				orders: orders.map(order => {
					return {
						_id: order._id,
						quantity: order.quantity,
						product: order.productID,
						request: {
							type: 'GET',
							url: 'http://localhost:3000/orders/' + order._id
						}
					};
				}),
				count: orders.length
			});
		})
		.catch(err => {
			next(err);
		});
});

router.post('/', (req, res, next) => {
	const newOrder = new Order({
		_id: mongoose.Types.ObjectId(),
		productID: req.body.productID,
		quantity: req.body.quantity
	});

	const pid = req.body.productID;
	console.log('pid', pid, 'newOrder', newOrder);
	Product.findById(pid)
		.exec()
		.then(product => {
			if (product) {
				newOrder.save().then(result => {
					console.log(result);
					return res.status(201).json({
						message: 'Saved new Order 🙋',
						status: 'Success',
						result
					});
				});
			} else {
				res.status(422).json({
					status: 'failed',
					message: 'Unable to Post, Check form data'
				});
			}
		})
		.catch(err => {
			next(err);
		});
});

router.get('/:id', (req, res, next) => {
	let orderID = req.params.id;
	Order.findById(orderID)
		.populate('productID', '_id name price')
		.select('_id productId quantity')
		.exec()
		.then(result => {
			res.status(200).json({
				_id: result._id,
				quantitiy: result.quantity,
				productDetails: result.productID,
				Request: {
					type: 'DELETE/PATCH',
					url: `http://localhost:3000/orders/${result._id}`
				}
			});
		})
		.catch(err => {
			next(err);
		});
});

router.delete('/:id', (req, res, next) => {
	let orderID = req.params.id;
	Order.findByIdAndRemove(orderID)
		.then(result => {
			if (!result) {
				return res.status(404).json({
					status: 'Failed',
					message: 'invalid Delete Request'
				});
			}
			res.status(200).json({
				status: 'success',
				result,
				message: 'Order Deleted',
				Request: {
					Type: 'Post',
					url: 'http://localhost:3000/orders'
				}
			});
		})
		.catch(err => {
			next(err);
		});
});

module.exports = router;
