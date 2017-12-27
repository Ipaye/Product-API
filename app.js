const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

const productRoutes = require('./api/routes/product');
const orderRoutes = require('./api/routes/orders');

mongoose.Promise = global.Promise;
//mongoose connection to DB
mongoose.connect('mongodb://127.0.0.1:27017/ProductDB', {useMongoClient : true});
mongoose.connection.on('connected', ()=>{
	console.log('Conncected to the DB');
	
});

app.use(require('morgan')('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());

app.use('/products', productRoutes);
app.use('/orders', orderRoutes);

app.use((req, res, next) => {
	const error = new Error('End-point not found');
	error.status = 404;
	next(error);
});

app.use((error, req, res, next) => {
	res.status(error.status || 500);
	res.json({
		error: {
			message: error.message
		}
	});
	next();
});

module.exports = app;
