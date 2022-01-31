const express = require('express');
const mysql = require('mysql');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const logger = require('./logger');
const { engine } = require('express-handlebars');

const app = express();
app.use(express.json({ extended: false }));

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

app.get('/home', (req, res) => {
	res.render('home');
});

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

// Routes
app.use('/login', require('./routes/api/login'));
app.use('/randomUser', require('./routes/api/getRandomJson'));
app.use('/addPost', require('./routes/api/addPost'));
app.use('/getPosts', require('./routes/api/getPosts'));

// Html path
app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, 'index.html'));
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
	logger.info(`Listening on port ${PORT}`);
});
