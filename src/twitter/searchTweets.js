import { TwitterClient } from '../twitterClient';

export const searchTweets = (q) => {
  return new Promise((res, rej) => {
    TwitterClient.get('search/tweets', { 
      q, 
      result_type: 'popular', 
      count: 100, 
      include_entities: false, 
      tweet_mode: 'extended' 
    }, (err, tweets) => {
      res(tweets);
    });
  });
};