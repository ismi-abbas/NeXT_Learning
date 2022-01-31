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

router.get('/getposts', (req, res) => {
	let sql = `SELECT * FROM posts`;
	let query = db.query(sql, (err, results) => {
		if (err) throw err;
		res.send(results);
		logger.info('Posts fetched');
	});
});

// @route GET api/getPosts/:id
// @desc Get single post
// @access Public

router.get('/getposts/:id', (req, res) => {
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

// @route GET api/insertData
// @desc Insert data to database
// @access Public

router.get('/addpost/:id', (req, res) => {
	let id = req.params.id;
	let post = {
		title: `Post ${id}`,
		body: `This is a sample post number ${id}.`,
	};
	let sql = 'INSERT INTO posts SET ?';
	let query = db.query(sql, post, (err, result) => {
		if (err) throw err;
		console.log(result);
		res.send(`Post number ${id} created`);
	});
});

// @route GET api/updatepost/:id
// @desc Update individual post to database
// @access Public

router.get('/updatepost/:id', (req, res) => {
	let newTitle = req.params.title;
	let newBody = req.params.body;
	let id = req.params.id;
	let sql = `UPDATE posts SET title = '${newTitle}', body = '${newBody}' WHERE id=${id}`;
	let query = db.query(sql, (err, result) => {
		if (err) throw err;
		console.log(result);
		res.send(`Post number ${id} updated`);
	});
});

// @route GET api/deletepost/:id
// @desc Delete individual post to database
// @access Public

router.get('/deletepost/:id', (req, res) => {
	let id = req.params.id;
	let sql = `DELETE FROM posts WHERE id = ${id}`;
	let query = db.query(sql, (err, result) => {
		if (!id) {
			res.status(404);
			logger.error('Post has been deleted!');
			res.send(`404 Not Found -  Post index number ${id} has been deleted!`);
		} else {
			res.send(`Post index number ${id} deleted!`);
			logger.info(`Post index number ${id} deleted!`);
		}
	});
});

// @route GET api/deleteposts
// @desc Delete all posts to database
// @access Public

router.get('/deleteposts', (req, res) => {
	let sql = `DELETE FROM posts`;
	let query = db.query(sql, (err, result) => {
		if (err) {
			res.status(400);
			logger.error('Posts have been deleted!');
			res.send(`404 -  Posts have been deleted!`);
		} else {
			res.send(`All posts deleted!`);
			logger.info('All posts deleted!');
		}
	});
});

module.exports = router;
