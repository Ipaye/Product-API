const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
	_id: mongoose.SchemaTypes.ObjectId,
	name: {type:String, required: true},
	price: Number
});

module.exports = mongoose.model('Product', productSchema);
