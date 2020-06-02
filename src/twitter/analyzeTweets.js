import * as Sentiment from "sentiment";

const sentiment = new Sentiment();
const options = {
  extras: {
    no: 0,
    yes: 0,
    like: 0
  }
};

const countWords = (words, wordDict) => {
  words.forEach(word => {
    if (!wordDict[word]) {
      wordDict[word] = 1;
    } else {
      wordDict[word] = wordDict[word] + 1;
    }
  });
};

const getMostUsedWords = wordDict => {
  const wordArr = [];
  Object.keys(wordDict).forEach(word => {
    wordArr.push({ word, count: wordDict[word] });
  });

  wordArr.sort((a, b) => {
    if (a.count < b.count) {
      return 1;
    }
    return -1;
  });

  return wordArr.slice(0, 5);
};

// A function that will analyze an array of tweets from the twitter api: https://developer.twitter.com/en/docs/tweets/search/api-reference/get-search-tweets
export const analyzeTweets = tweets => {
  let scoreCount = 0,
    comparativeCount = 0;
  const positiveWordDict = {};
  const negativeWordDict = {};

  if (!tweets) {
    return false;
  }

  // Loop over each tweest and return some analyzed data from the tweets
  const data = tweets.map(tweet => {
    const { score, comparative, positive, negative } = sentiment.analyze(
      tweet.full_text,
      options
    );
    // Keep track of added scores for average at the end
    scoreCount += score;
    comparativeCount += comparative;

    countWords(positive, positiveWordDict);
    countWords(negative, negativeWordDict);

    return {
      id: tweet.id,
      sentiment: { score, comparative, positive, negative },
      text: tweet.full_text,
      createdAt: tweet.created_at,
      user: {
        id: tweet.user.id,
        name: tweet.user.name,
        screenName: tweet.user.screen_name
      },
      retweetCount: tweet.retweet_count,
      favoriteCounte: tweet.favorite_count
    };
  });

  // Sort the data so the most positive sentiment scores are at the end: negative => positive
  data.sort((a, b) => {
    if (a.sentiment.score > b.sentiment.score) {
      return 1;
    }
    return -1;
  });

  const scoreAvg = scoreCount / data.length;
  const currentTime = Date.now();

  return {
    positiveTweets: data.slice(data.length - 1 - 10, data.length),
    negativeTweets: data.slice(0, 11),
    scoreAvg,
    comparativeAvg: comparativeCount / data.length,
    positiveWords: getMostUsedWords(positiveWordDict),
    negativeWords: getMostUsedWords(negativeWordDict),
    scoreAvgHistory: [{ scoreAvg, time: currentTime }]
  };
};
