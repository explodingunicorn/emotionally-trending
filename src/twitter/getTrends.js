import { TwitterClient } from '../twitterClient.js';

export const getTrends = () => {
  return new Promise((res, rej) => {
    TwitterClient.get('trends/place', { id: 23424977 }, (err, trends) => {
      res(trends[0]);
    });
  });
}