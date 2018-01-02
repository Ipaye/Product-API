const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
	_id: mongoose.SchemaTypes.ObjectId,
	name: { type: String, required: 'Name is required' },
	price: Number,
	productImage: { type: String, required: 'Product Image is Required' }
});

module.exports = mongoose.model('Product', productSchema);
