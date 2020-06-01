import { TwitterClient } from '../twitterClient.js';

export const searchTweets = (q) => {
  return new Promise((res, rej) => {
    TwitterClient.get('search/tweets', { 
      q: `${q} exclude:retweets`, 
      result_type: 'mixed', 
      count: 100, 
      lang: 'en',
      tweet_mode: 'extended' 
    }, (err, tweets) => {
      res(tweets);
    });
  });
};