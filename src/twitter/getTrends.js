import { TwitterClient } from '../TwitterClient';

export const getTrends = () => {
  return new Promise((res, rej) => {
    TwitterClient.get('trends/place', { id: 2352824 }, (err, trends) => {
      res(trends[0]);
    });
  });
}