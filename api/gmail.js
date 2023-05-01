import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

dotenv.config();

// https://stackoverflow.com/questions/65631481/nodemailer-in-vercel-not-sending-email-in-production
async function sendMail(mailPayload) {
	let transporter = nodemailer.createTransport({
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
		from: 'Raymond Lee <noreply.raymondleemv@gmail.com>',
		to: ['raymondleemv@gmail.com', mailPayload.email],
		subject: mailPayload.subject,
		text:
			`Hi ${mailPayload.name},\n\n` +
			`Thank you for reaching out, I have got your message below and I will get back to you soon.\n\n` +
			`Best Regards,\n` +
			`Raymond Lee\n\n` +
			`The sender\'s email is ${mailPayload.email}\n\n${mailPayload.message}`,
	};

	await new Promise((resolve, reject) => {
		console.log(mailOptions.to);
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
}

export { sendMail };
