import { db } from '../db.js';

export async function get(req, res, next) {
  // the `slug` parameter is available because this file
  // is called [slug].json.js

  if (true) {
    res.setHeader('Content-Type', 'application/json');
    const trends = db.get('trends').value();
    Object.keys(trends).forEach((trend) => {
      const trendInfo = db
        .get('trending.trends')
        .find({ name: trends[trend].name })
        .value();
      trends[trend].tweetVolume = trendInfo.tweet_volume;
    });

    const avgHistory = db.get('avgHistory').value();
    res.end(JSON.stringify({ trends, avgHistory }));
  } else {
    next();
  }
}
