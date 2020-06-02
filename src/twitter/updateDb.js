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
    db.set("trends", trends).write();

    const tweetPromises = trends.trends.map(async trend => {
      const tweets = await searchTweets(trend.name);
      return { ...tweets, name: trend.name };
    });

    const tweetSwearches = await Promise.all(tweetPromises);

    db.set("trend", {}).write();
    tweetSwearches.forEach((search, i) => {
      const analyzedData = analyzeTweets(search.statuses);
      if (analyzedData) {
        db.set(`trend.${i}`, {
          id: i,
          name: search.name,
          ...analyzedData
        }).write();
      }
    });

    db.set("lastUpdated", started).write();
  }
  return;
};
