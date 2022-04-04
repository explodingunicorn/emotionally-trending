import type { RequestHandler } from '@sveltejs/kit';
import { getTrend } from './_getTrend';

export const get: RequestHandler = async ({ params }) => {
	const id = params.trend;
	const trend = await getTrend(id);
	if (!trend) {
		return {
			status: 500,
			body: null
		};
	}
	return {
		body: {
			trend
		}
	};
};
