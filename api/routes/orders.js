const express = require('express');
const router = express.Router();

const checkAuthState = require('../middlewares/checkAuthState');
const {
	createOrder,
	getSingleOrder,
	getAllOrders,
	deleteOrder
} = require('../controllers/orderController');

router.get('/', getAllOrders);
router.post('/', checkAuthState, createOrder);
router.get('/:id', checkAuthState, getSingleOrder);
router.delete('/:id', deleteOrder);

module.exports = router;
