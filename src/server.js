import sirv from 'sirv';
import polka from 'polka';
import compression from 'compression';
import * as sapper from '@sapper/server';
import cron from 'node-cron';
import { updateDb } from './twitter/updateDb';

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';

const main = async () => {
	await updateDb();
	cron.schedule('*/5 * * * *', async () => {
		await updateDb();
	});

	polka() // You can also use Express
		.use(
			compression({ threshold: 0 }),
			sirv('static', { dev }),
			sapper.middleware()
		)
		.listen(PORT, err => {
			if (err) console.log('error', err);
		});
	};

main();
