const express = require('express');
const router = express.Router();
const _ = require('lodash');
const mysql = require('mysql');
const logger = require('../../logger');

// Create DB connection
const db = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'root',
	database: 'next_learning',
});

// @route GET api/getPosts
// @desc Get all posts
// @access Public

router.get('/', (req, res) => {
	let sql = `SELECT * FROM posts`;
	let query = db.query(sql, (err, results) => {
		if (err) throw err;
		res.send(results);
		logger.info('Posts fetched');
	});
});

// @route GET api/getPosts
// @desc Get all posts
// @access Public

router.get('/:id', (req, res) => {
	let id = req.params.id;
	let sql = `SELECT * FROM posts WHERE id = ${id}`;
	let query = db.query(sql, (err, results) => {
		if (_.isEmpty(results)) {
			res.status(400);
			logger.error('Post not found');
			res.send(`404 -  Post index number ${id} not found!`);
		} else {
			res.send(results);
			logger.info(`Post index number ${id} fetched!`);
		}
	});
});

module.exports = router;
