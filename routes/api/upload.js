const express = require('express');
const mysql = require('mysql');
const path = require('path');
const logger = require('../../logger/index');
const router = express.Router();
const multer = require('multer');
const db = require('../../db');

router.get('/createuploadtable', (req, res) => {
	let sql =
		'CREATE TABLE uploads(id int AUTO_INCREMENT, title VARCHAR(255), body BINARY, PRIMARY KEY (id))';
	db.query(sql, (err, result) => {
		if (err) {
			logger.error(err);
		}
		console.log(result);
		res.send('Uploads table created');
	});
});

const fileStorage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'images');
	},
	filename: (req, file, cb) => {
		cb(null, Date.now() + '--' + file.originalname);
	},
});

// Create upload engine
const upload = multer({ storage: fileStorage });

router.post('/single', upload.single('file'), (req, res) => {
	let sql = 'INSERT INTO uploads SET ?';
	let data = {
		title: req.file.originalname,
		body: req.file.buffer,
	};
	db.query(sql, data, (err, result) => {
		if (err) {
			logger.error(err);
		}
		console.log(req.file);
		res.send('File uploaded');
	});
});

module.exports = router;
