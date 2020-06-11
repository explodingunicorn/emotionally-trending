import { Trend } from '../models/trend.js';
import { State } from '../models/state.js';

export async function get(req, res, next) {
  // the `slug` parameter is available because this file
  // is called [slug].json.js

  if (true) {
    res.setHeader('Content-Type', 'application/json');
    const trends = await Trend.find();
    const newTrends = trends.map((trend) => {
      return { ...trend._doc };
    });

    const state = await State.findOne();
    res.end(
      JSON.stringify({
        trends: newTrends,
        avgHistory: state ? state._doc.avgHistory : [],
      })
    );
  } else {
    next();
  }
}
