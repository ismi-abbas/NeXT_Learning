const express = require('express');
const mysql = require('mysql');
const path = require('path');
const logger = require('../../logger/index');
const router = express.Router();
const nodemailer = require('nodemailer');

router.post('/', (req, res) => {
	const output = `
		<p>You have a new contact request</p>
		<h3>Contact Details</h3>
		<ul>
			<li>Name: ${req.body.name}</li>
			<li>Company: ${req.body.company}</li>
			<li>Email: ${req.body.email}</li>
			<li>Phone Number: ${req.body.phone}</li>
			</ul>
			<h3>Message</h3>
			<p>${req.body.message}</p>
			`;

	async function main() {
		const testAccount = await nodemailer.createTestAccount();

		// create reusable transporter object using the default SMTP transport
		const transporter = nodemailer.createTransport({
			host: 'smtp.ethereal.email',
			port: 587,
			auth: {
				user: 'evelyn.greenholt4@ethereal.email',
				pass: 'sDgHwt88QSZW3AXeEY',
			},
		});

		// send mail with defined transport object
		const info = await transporter.sendMail({
			from: '"Muhammad Abbas" <muhdabbas98@gmail.com>', // sender address
			to: 'abbaspuzi6079@gmail.com', // list of receivers
			subject: 'Hello ✔', // Subject line
			text: output, // plain text body
			html: output, // html body
		});

		console.log('Message sent: %s', info.messageId);
		console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
	}

	main().catch(console.error);
	res.render('contact', { msg: 'Email has been send' });
});

module.exports = router;
