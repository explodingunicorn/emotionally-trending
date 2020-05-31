import { db } from '../db';
import { getTrends } from './getTrends';
import { searchTweets } from './searchTweets';
import { analyzeTweets } from './analyzeTweets';

export const updateDb = async () => {
  const lastUpdated = db.get('lastUpdated').value();
  const started = Date.now();
  console.log(lastUpdated);

  if (Date.now() - lastUpdated >= 300000) {
    const trends = await getTrends();
    db.set('trends', trends).write();
    
    const tweetPromises = trends.trends.map(async (trend) => {
      const tweets = await searchTweets(trend.name);
      return { ...tweets, name: trend.name };
    });

    const tweetSwearches = await Promise.all(tweetPromises);

    db.set('trend', {}).write();
    tweetSwearches.forEach((search, i) => {
      const analyzedData = analyzeTweets(search.statuses);
      db.set(`trend.${i}`, {id: i, name: search.name, ...analyzedData}).write();
    });

    db.set('lastUpdated', started).write();
  }
  return;
};
