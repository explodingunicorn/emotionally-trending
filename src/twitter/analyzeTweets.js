import * as Sentiment from 'sentiment';

const sentiment = new Sentiment();

export const analyzeTweets = (tweets) => {
  let scoreCount = 0, comparativeCount = 0;
  const data = tweets.map(tweet => {
    const { score, comparative, positive, negative } = sentiment.analyze(tweet.full_text);
    // Keep track of added scores for average at the end
    scoreCount += score;
    comparativeCount += comparative;
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

  data.sort((a, b) => {
    if (a.sentiment.score > b.sentiment.score) {
      return 1;
    }
    return -1;
  });

  return {
    positiveTweets: data.slice((data.length - 1) - 10, data.length),
    negativeTweets: data.slice(0, 11),
    scoreAvg: scoreCount/data.length,
    comparativeAvg: comparativeCount/data.length 
  };
}