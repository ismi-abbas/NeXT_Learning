const express = require('express');
const router = express.Router();
const _ = require('lodash');
const mysql = require('mysql');

// Create DB connection
const db = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'root',
	database: 'next_learning',
});

// @route GET api/insertData
// @desc Insert data to database
// @access Public

router.get('/:id', (req, res) => {
	let id = req.params.id;
	let post = {
		title: `Post ${id}`,
		body: `This is a sample post number ${id}.`,
	};
	let sql = 'INSERT INTO posts SET ?';
	let query = db.query(sql, post, (err, result) => {
		if (err) throw err;
		console.log(result);
		res.send(`Post number ${id} table created`);
	});
});

// Hardcoded get request
// ================================================
// router.get('/1', (req, res) => {
// 	let post = { title: 'Post 1', body: 'This is a sample post number one.' };
// 	let sql = 'INSERT INTO posts SET ?';
// 	let query = db.query(sql, post, (err, result) => {
// 		if (err) throw err;
// 		console.log(result);
// 		res.send('Post table created');
// 	});
// });
// =================================================

module.exports = router;
