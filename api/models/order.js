const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	quantity: { type: Number, default: 1 },
	productID: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Product',
		required: 'Please pass in a product ID'
	}
});

module.exports = mongoose.model('Order', orderSchema);
