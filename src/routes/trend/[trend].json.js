import { Trend } from '../../models/trend.js';

export async function get(req, res, next) {
  // the `slug` parameter is available because
  // this file is called [slug].json.js
  const { trend } = req.params;

  const dbTrend = await Trend.findOne({ id: trend });

  if (dbTrend) {
    res.writeHead(200, {
      'Content-Type': 'application/json',
    });

    res.end(JSON.stringify({ ...dbTrend._doc }));
  } else {
    res.writeHead(404, {
      'Content-Type': 'application/json',
    });

    res.end(
      JSON.stringify({
        message: `Not found`,
      })
    );
  }
}
