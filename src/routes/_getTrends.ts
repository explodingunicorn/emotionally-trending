import type { State, Trend } from 'src/types';
import { login } from '../utils/login';

export const getTrends = async () => {
	const client = await login();
	if (client === false) {
		return client;
	}
	const trendCollection = client.db('myFirstDatabase').collection('trends');
	const stateCollection = client.db('myFirstDatabase').collection('states');
	const trends = (await trendCollection.find()) as Trend[];

	const state = (await stateCollection.findOne()) as State;
	return {
		trends,
		avgHistory: state ? state.avgHistory : []
	};
};
