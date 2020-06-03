import shortid from 'shortid';

import { db } from "../db.js";
import { getTrends } from "./getTrends.js";
import { searchTweets } from "./searchTweets.js";
import { analyzeTweets } from "./analyzeTweets.js";

export const updateDb = async () => {
  const lastUpdated = db.get("lastUpdated").value();
  const started = Date.now();
  console.log(lastUpdated);

  if (Date.now() - lastUpdated >= 300000) {
    const trends = await getTrends();
    db.set("trending", trends).write();

    const tweetPromises = trends.trends.map(async trend => {
      const tweets = await searchTweets(trend.name);
      return { ...tweets, name: trend.name };
    });

    const tweetSwearches = await Promise.all(tweetPromises);

    const recordsToSet = [];
    tweetSwearches.forEach((search, i) => {
      const analyzedData = analyzeTweets(search.statuses);
      if (analyzedData) {
        const pastRecord = db.get('trends').find({name: search.name}).value();

        if (pastRecord) {
          const newRecord = {
            ...pastRecord,
            ...analyzedData,
            scoreAvgHistory: [...pastRecord.scoreAvgHistory, ...analyzedData.scoreAvgHistory],
            createdAt: pastRecord.createdAt
          }
          recordsToSet.push(newRecord);
        } else {
          recordsToSet.push({
            id: shortid.generate(),
            name: search.name,
            ...analyzedData
          });
        }
      }
    });

    db.set('trends', []).write();
    recordsToSet.forEach(record => {
      db.get('trends').push(record).write();
    })

    db.set("lastUpdated", started).write();
  }
  return;
};
