import { set, connect, connection } from 'mongoose';
require('dotenv').config({ path: 'src/config/.env' });
import { redBright, greenBright, yellowBright } from 'chalk';

// Database Name & URL
const DATABASE_NAME = process.env.DATABASE_NAME;
export const CONNECTION_URL = process.env.CONNECTION_URL + DATABASE_NAME;
(async () => {
	try {
		//Connection establishment
		connect(CONNECTION_URL, {
			useNewUrlParser: true,
			useCreateIndex: true,
			useUnifiedTopology: true,
		});

		const db = connection;

		// Event Listener
		db.on('disconnected', (err) => {
			console.error(redBright(`MongoDB-> disconnected: ${DATABASE_NAME}`));
		});

		db.on('reconnected', (err) => {
			console.info(yellowBright(`MongoDB-> reconnected: ${DATABASE_NAME}`));
		});

		db.on('error', (error) => {
			console.error(redBright('Error occured in db connection', error));
		});

		db.on('open', () => {
			console.info(greenBright(`DB Connection with ${DATABASE_NAME} established successfully.`));
		});
	} catch (error) {
		console.error(redBright('Error occured in db connection', error));
		process.exit(-1);
	}
})();
