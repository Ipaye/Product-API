const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
	_id: mongoose.SchemaTypes.ObjectId,
	quantity: {type: Number,required: true },
	productID: {type: mongoose.SchemaTypes.ObjectId, ref: 'Product'}
});

module.exports = mongoose.model('Order', orderSchema);
