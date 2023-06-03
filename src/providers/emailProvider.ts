import { createTransport } from 'nodemailer';

export const transporter = createTransport({
	host: 'smtp.ethereal.email',
	port: 587,
	auth: {
		user: 'israel42@ethereal.email',
		pass: '9xWWFNpxnm7ZpGf3Kr',
	},
});
