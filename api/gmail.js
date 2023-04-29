import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

dotenv.config();

async function sendMail(mailPayload) {
	let transporter = nodemailer.createTransport({
		// service: 'gmail',
		host: 'smtp.gmail.com',
		port: 465,
		secure: true,
		auth: {
			type: 'OAuth2',
			user: process.env.MAIL_USERNAME,
			pass: process.env.MAIL_PASSWORD,
			clientId: process.env.OAUTH_CLIENT_ID,
			clientSecret: process.env.OAUTH_CLIENT_SECRET,
			refreshToken: process.env.OAUTH_REFRESH_TOKEN,
		},
	});

	await new Promise((resolve, reject) => {
		// verify connection configuration
		transporter.verify(function (error, success) {
			if (error) {
				console.log(error);
				reject(error);
			} else {
				console.log('Server is ready to take our messages');
				resolve(success);
			}
		});
	});

	let mailOptions = {
		from: mailPayload.name + ' <noreply.raymondleemv@gmail.com>',
		to: 'raymondleemv@gmail.com',
		subject: mailPayload.subject,
		text: `The sender\'s email is ${mailPayload.email}\n\n${mailPayload.message}`,
	};

	await new Promise((resolve, reject) => {
		// send mail
		transporter.sendMail(mailOptions, (err, info) => {
			if (err) {
				console.error(err);
				reject(err);
			} else {
				console.log(info);
				resolve(info);
			}
		});
	});

	// await transporter.sendMail(mailOptions, function (err, data) {
	// 	if (err) {
	// 		console.log('Error: ' + err);
	// 		return 'Error: ' + err;
	// 	}
	// 	console.log('Email sent successfully');
	// 	return 'Email sent successfully';
	// });
}

export { sendMail };
