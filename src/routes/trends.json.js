import { db } from "../db";

export async function get(req, res, next) {
	// the `slug` parameter is available because this file
	// is called [slug].json.js

	if (true) {
    res.setHeader('Content-Type', 'application/json');
    const trends = db.get('trend').value();
		res.end(JSON.stringify(trends));
	} else {
		next();
	}
}