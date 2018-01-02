const User = require('../models/user');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

router.post('/signup', (req, res, next) => {
	const email = req.body.email;
	User.findOne({ email })
		.exec()
		.then(user => {
			if (user) {
				let error = new Error('Mail already exist');
				error.status = 422;
				return next(error);
			} else {
				bcrypt.hash(req.body.password, 10, (err, hash) => {
					if (err) {
						return res.status(422).json({
							error: err
						});
					} else {
						const newUser = new User({
							_id: mongoose.Types.ObjectId(),
							email: req.body.email,
							password: hash
						});
						newUser
							.save()
							.then(createdUser => {
								res.status(201).json({
									message: 'User created',
									createdUser
								});
							})
							.catch(err => {
								next(err);
							});
					}
				});
			}
		});
});

router.delete('/:id', (req, res, next) => {
	const userID = req.params.id;
	User.findByIdAndRemove(userID)
		.then(result => {
			if (!result) {
				return res.status(404).json({
					message: 'No User found'
				});
			}
			res.status(200).json({
				result,
				message: 'User Deleted'
			});
		})
		.catch(err => next(err));
});

module.exports = router;
