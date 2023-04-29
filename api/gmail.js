import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

dotenv.config();

let transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		type: 'OAuth2',
		user: process.env.MAIL_USERNAME,
		pass: process.env.MAIL_PASSWORD,
		clientId: process.env.OAUTH_CLIENT_ID,
		clientSecret: process.env.OAUTH_CLIENT_SECRET,
		refreshToken: process.env.OAUTH_REFRESH_TOKEN,
	},
});

function sendMail(mailPayload) {
	let mailOptions = {
		from: mailPayload.name + ' <noreply.raymondleemv@gmail.com>',
		to: 'raymondleemv@gmail.com',
		subject: mailPayload.subject,
		text: `The sender\'s email is ${mailPayload.email}\n\n${mailPayload.message}`,
	};
	transporter.sendMail(mailOptions, function (err, data) {
		if (err) {
			return 'Error: ' + err;
		}
		return 'Email sent successfully';
	});
}

export { sendMail };
