import { TwitterClient } from '../../twitterClient';

const getTrends = () => {
  return new Promise((res, rej) => {
    TwitterClient.get('trends/place', { id: 2352824 }, (err, trends, response) => {
      res(trends);
    });
  });
}

export async function get(req, res, next) {
	// the `slug` parameter is available because this file
	// is called [slug].json.js

	if (true) {
    res.setHeader('Content-Type', 'application/json');
    const trends = await getTrends();
		res.end(JSON.stringify(trends));
	} else {
		next();
	}
}