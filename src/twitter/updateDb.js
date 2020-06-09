import shortid from 'shortid';

import { db } from '../db.js';
import { getTrends } from './getTrends.js';
import { searchTweets } from './searchTweets.js';
import { analyzeTweets } from './analyzeTweets.js';

export const updateDb = async (opts) => {
  const lastUpdated = db.get('lastUpdated').value();
  const started = Date.now();
  console.log(lastUpdated);

  // If this script is being run at start up make sure it hasn't been run in the last 5 minutes
  if (opts && opts.startUp && Date.now() - lastUpdated <= 300000) {
    return;
  }

  const trends = await getTrends();
  db.set('trending', trends).write();

  const tweetPromises = trends.trends.map(async (trend) => {
    const tweets = await searchTweets(trend.name);
    return { ...tweets, name: trend.name };
  });

  const tweetSwearches = await Promise.all(tweetPromises);

  const recordsToSet = [];
  tweetSwearches.forEach((search, i) => {
    const analyzedData = analyzeTweets(search.statuses);
    if (analyzedData) {
      // Check for a past record for this analyzed data
      const pastRecord = db.get('trends').find({ name: search.name }).value();

      // If the past record exists update that object with new data, add the avg histories together
      if (pastRecord) {
        const newRecord = {
          ...pastRecord,
          ...analyzedData,
          scoreAvgHistory: [
            ...pastRecord.scoreAvgHistory,
            ...analyzedData.scoreAvgHistory,
          ],
          createdAt: pastRecord.createdAt,
        };
        recordsToSet.push(newRecord);
      } else {
        recordsToSet.push({
          id: shortid.generate(),
          name: search.name,
          ...analyzedData,
        });
      }
    }
  });

  let total = 0;

  // Setting the new trends
  db.set('trends', []).write();
  recordsToSet.forEach((record) => {
    total += record.scoreAvg;
    db.get('trends').push(record).write();
  });
  db.set('lastUpdated', started).write();

  // Add to the history average and set in db
  const avgHistory = db.get('avgHistory').value();
  if (avgHistory.length === 100) {
    avgHistory.splice(0, 1);
  }
  const average = total / recordsToSet.length;

  if (average) {
    avgHistory.push({
      avg: total / recordsToSet.length,
      createdAt: Date.now(),
    });
  }
  db.set('avgHistory', avgHistory).write();

  return;
};
