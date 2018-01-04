const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
	try {
		const bearer = req.headers.authorization.split(' ')[1];
		console.log(req.headers);

		console.log(bearer);
		const token = jwt.verify(
			bearer,
			process.env.SECRET || 'thisismeanttobeareallylongsecret'
		);
		req.userData = token;
		next();
	} catch (err) {
		res.status(401).json({
			message: 'Authentication failed'
		});
	}
};
