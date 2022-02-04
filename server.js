const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const path = require('path');
const logger = require('./logger');
const { engine } = require('express-handlebars');
const nodemailer = require('nodemailer');

const app = express();
app.use(express.json({ extended: false }));

// Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Routes
app.use('/login', require('./routes/api/login'));
app.use('/randomUser', require('./routes/api/getRandomJson'));
app.use('/posts', require('./routes/api/posts'));
app.use('/contact', require('./routes/api/contact'));

// Handlebars - View Engine
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

// Render Home Page
app.get('/', (req, res) => {
	res.render('home');
});

// Render contact page
app.get('/contact', (req, res) => {
	res.render('contact');
});

// Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// Create DB
app.get('/createdb', (req, res) => {
	let sql = 'CREATE DATABASE next_learning';
	db.query(sql, (err, result) => {
		if (err) {
			logger.error(err);
		}
		res.send('Database created');
		console.log(result);
	});
});

const db = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'root',
	database: 'next_learning',
});

// Create table
app.get('/createpoststable', (req, res) => {
	let sql =
		'CREATE TABLE posts(id int AUTO_INCREMENT, title VARCHAR(255), body VARCHAR(255), PRIMARY KEY (id))';
	db.query(sql, (err, result) => {
		if (err) {
			logger.error(err);
		}
		console.log(result);
		res.send('Posts table created');
	});
});

// connect
db.connect((err) => {
	if (err) {
		logger.error(err);
	}
	logger.info('Connected to database');
});

// Html path
app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, 'index.html'));
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
	logger.info(`Listening on port ${PORT}`);
});
