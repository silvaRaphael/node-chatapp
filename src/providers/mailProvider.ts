import { createTransport } from 'nodemailer';

export const transporter = createTransport({
	host: 'smtp.ethereal.email',
	port: 587,
	auth: {
		user: 'miles.barrows@ethereal.email',
		pass: '8K9MDZreNV9wzRrrzc',
	},
});
