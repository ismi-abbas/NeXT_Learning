// This middleware is use to protect the JWT
const jwt = require('jsonwebtoken');
const config = require('config');
const logger = require('../logger/index');

module.exports = function (req, res, next) {
	const token = req.header('x-auth-token');
	const secret = 'mySecret';

	if (!token) {
		return res.status(401).json({ msg: 'No token authorization denied' });
	}
	try {
		const decoded = jwt.verify(token, secret);
		req.user = decoded.user;
		next();
	} catch (err) {
		logger.error(err);
		res.status(401).json({ msg: 'Token is not valid' });
	}
};
