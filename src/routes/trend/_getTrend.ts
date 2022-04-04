import type { Trend } from 'src/types';
import { login } from '../../utils/login';

export const getTrend = async (id: string) => {
	const client = await login();
	if (client === false) {
		return client;
	}
	const trendCollection = client.db('myFirstDatabase').collection('trends');
	const trend = (await trendCollection.findOne({ id })) as Trend;
	return trend;
};
