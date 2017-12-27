const express = require('express');
const mongoose = require('mongoose');
const Order = require('../models/order');
const Product = require('../models/product');

const router = express.Router();

router.get('/', (req, res, next) => {
	Order.find().populate('Product').then((orders) => {
		console.log(orders);		
		res.status(200).json({
			status: 'success',
			message: 'Getting All Orders',
			orders : orders.map((order) => {
				return {
					_id: order._id,
					quantity: order.quantity,
					productID: order.productID,
					request : {
						type: 'GET',
						url: 'http://localhost:3000/orders/'+order._id
					}				
				};
			}),
			count: orders.length
		});
	})
		.catch((err)=>{
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
	console.log('pid', pid);
	Product.findById(pid)
		.exec()
		.then( product => {
			if(product){
				newOrder.save()
					.then( (result) => {
						console.log(result);					
						return res.status(201).json({
							message: 'Saved new Order 🙋',
							status: 'Success',
							result
						});
					});
			}
			else{
				res.status(404).json({
					status: 'failed',
					message: 'Unable to Post, Check form data'
				});
			}
		})
		.catch( err => {
			next(err);
		});
});

router.get('/:id', (req, res, next) => {
	let orderID = req.params.id;
	res.status(200).json({
		message: 'handling GET request /orders/:id',
		id: orderID
	});
});

router.delete('/:id', (req, res, next) => {
	let productID = req.params.id;
	res.status(200).json({
		message: 'handling Delete request /orders/:id',
		id: productID,
		status: 'Delete Order'
	});
});

module.exports = router;
