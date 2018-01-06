const express = require('express');
const multer = require('multer');

const router = express.Router();

const checkAuthState = require('../middlewares/checkAuthState');
const {
	allProducts,
	createProduct,
	getSingleProduct,
	editProduct,
	deleteProduct
} = require('../controllers/productController');

const storage = multer.diskStorage({
	destination: function(req, file, cb) {
		console.log('here');
		cb(null, './uploads/');
	},
	filename: function(req, file, cb) {
		function getRandom() {
			return Math.random() * (1000000 - 10) + 10;
		}
		cb(null, Math.floor(getRandom()) + file.originalname);
	}
});

const fileFilter = (req, file, cb) => {
	// reject a file
	if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
		cb(null, true);
	} else {
		cb(null, false);
	}
};

const upload = multer({
	storage: storage,
	limits: {
		fileSize: 1024 * 1024 * 5
	},
	fileFilter: fileFilter
});

/* 
	Routes for All products endpoints
*/
router.get('/', allProducts);
router.post('/', checkAuthState, upload.single('productImage'), createProduct);
router.get('/:id', checkAuthState, getSingleProduct);
router.patch('/:id', checkAuthState, editProduct);
router.delete('/:id', checkAuthState, deleteProduct);

module.exports = router;
