import { db } from "../db.js";

export async function get(req, res, next) {
	// the `slug` parameter is available because this file
	// is called [slug].json.js

	if (true) {
    res.setHeader('Content-Type', 'application/json');
		const trends = db.get('trend').value();
		db.get('trends.trends').value().forEach((trend, i) => {
			trends[i] = { ...trends[i], ...trend };
		});
		res.end(JSON.stringify(trends));
	} else {
		next();
	}
}