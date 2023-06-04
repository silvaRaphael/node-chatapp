import { createTransport } from 'nodemailer';
import 'dotenv/config';

export const transporter = createTransport({
	host: process.env.EMAIL_HOST,
	port: 587,
	auth: {
		user: process.env.EMAIL_USER,
		pass: process.env.EMAIL_PASS,
	},
});
