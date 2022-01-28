const express = require('express');
const mysql = require('mysql');
const path = require('path');
const logger = require('../../logger/index');
const router = express.Router();

router.get('/', (req, res) => {
	response.sendFile(path.join(__dirname + '/login.html'));
});

module.exports = router;
