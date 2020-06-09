import { db } from '../../db.js';

export function get(req, res, next) {
  // the `slug` parameter is available because
  // this file is called [slug].json.js
  const { trend } = req.params;

  const dbTrend = db.get('trends').find({ id: trend }).value();

  if (dbTrend) {
    res.writeHead(200, {
      'Content-Type': 'application/json',
    });

    res.end(JSON.stringify({ ...dbTrend }));
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
