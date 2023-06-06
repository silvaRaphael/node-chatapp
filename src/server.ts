import 'dotenv/config';
import './websocket';
import { server } from './app';
import { connect } from 'mongoose';

const port = process.env.PORT || 3000;

const main = async () => {
	try {
		await connect(process.env.DB_HOST || '');

		server.listen(port, () => console.log(`Server is running on port ${port}`));
	} catch (error: any) {
		console.log(error.message);
	}
};

main();
