const { Schema, model } = require('mongoose');

const tweetStructure = {
  id: 'number',
  sentiment: {
    score: 'number',
    comparative: 'number',
    positive: ['string'],
    negative: ['string'],
  },
  text: 'string',
  createdAt: 'date',
  user: {
    id: 'number',
    name: 'string',
    screenName: 'string',
  },
  retweetCount: 'number',
  favoriteCount: 'number',
};

const wordStructure = {
  word: 'string',
  count: 'number',
};

const scoreStructure = {
  scoreAvg: 'number',
  time: 'number',
};

const TrendSchema = new Schema({
  id: 'string',
  name: 'string',
  positiveTweets: [tweetStructure],
  negativeTweets: [tweetStructure],
  scoreAvg: 'number',
  comparativeAvg: 'number',
  positiveWords: [wordStructure],
  negativeWords: [wordStructure],
  scoreAvgHistory: [scoreStructure],
  createdAt: 'number',
  tweetVolume: 'number',
});

const Trend = model('Trend', TrendSchema);

module.exports = {
  Trend,
};
