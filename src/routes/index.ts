import type { RequestHandler } from '@sveltejs/kit';
import { getTrends } from './_getTrends';

export const get: RequestHandler = async () => {
	const trendData = await getTrends();
	if (!trendData) {
		return { status: 500, body: { trends: [], avgHistory: [] } };
	}
	return { body: { ...trendData } };
};
