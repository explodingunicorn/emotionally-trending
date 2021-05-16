const shortid = require('shortid');

const { getTrends } = require('./getTrends.js');
const { searchTweets } = require('./searchTweets.js');
const { analyzeTweets } = require('./analyzeTweets.js');
const { Trend } = require('../models/trend.js');
const { State } = require('../models/state.js');

const updateDb = async (opts) => {
  const state = await State.findOne();
  const lastUpdated = state ? state._doc.updated : 0;
  console.log(lastUpdated);

  // If this script is being run at start up make sure it hasn't been run in the last 5 minutes
  if (opts && opts.startUp && Date.now() - lastUpdated <= 300000) {
    return;
  }

  const trends = await getTrends();

  if (trends.trends.length) {
    const twitterTrends = trends.trends.reduce((trendObj, trend) => {
      return { ...trendObj, [trend.name]: trend };
    }, {});

    const tweetPromises = trends.trends.map(async (trend) => {
      const tweets = await searchTweets(trend.name);
      return { ...tweets, name: trend.name };
    });

    const tweetSwearches = await Promise.all(tweetPromises);

    const namesAdded = [];
    let scoreTotal = 0;
    const dbUpdates = tweetSwearches.map(async (search, i) => {
      const analyzedData = analyzeTweets(search.statuses);
      if (analyzedData) {
        const tweetVolume = twitterTrends[search.name].tweet_volume;
        const { createdAt, scoreAvgHistory, ...rest } = analyzedData;
        const existingTrend = await Trend.findOneAndUpdate(
          { name: search.name },
          {
            $set: { ...rest, tweetVolume },
            $addToSet: {
              scoreAvgHistory: {
                scoreAvg: rest.scoreAvg,
                createdAt,
              },
            },
          }
        );

        if (!existingTrend) {
          const newTrend = new Trend({
            ...analyzedData,
            tweetVolume,
            name: search.name,
            id: shortid.generate(),
          });
          await newTrend.save();
        }

        namesAdded.push(search.name);
        scoreTotal += analyzedData.scoreAvg;
      }
      return;
    });

    await Promise.all(dbUpdates);
    console.log('Added these trends to DB - ', namesAdded);

    await Trend.deleteMany({ name: { $nin: namesAdded } });
    console.log('DB update done');

    const scoreAvg = scoreTotal / (namesAdded.length || 1);
    console.log(scoreAvg);
    const updateTime = Date.now();

    const pop =
      state && state._doc.avgHistory.length === 50
        ? {
            $pop: { avgHistory: -1 },
          }
        : false;
    await State.findOneAndUpdate(
      {},
      {
        updated: updateTime,
        $addToSet: { avgHistory: { scoreAvg, time: updateTime } },
      },
      { upsert: true }
    );

    if (pop) {
      await State.findOneAndUpdate(
        {},
        {
          ...pop,
        }
      );
    }
  }
  return;
};

module.exports = {
  updateDb,
};
