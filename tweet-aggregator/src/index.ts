import * as Realm from 'realm-web';
import * as utils from './utils';
import { analyzeTweets } from './analyzeTweets';

// The Worker's environment bindings. See `wrangler.toml` file.
interface Bindings {
  // MongoDB Realm Application ID
  REALM_APPID: string;
  C_KEY: string;
  C_SECRET: string;
  REALM_API_KEY: string;
}

// Define type alias; available via `realm-web`
type Document = globalThis.Realm.Services.MongoDB.Document;

interface State extends Document {
  updated: number;
  avgHistory: { score: number; time: number }[];
}

interface Tweet {
  id: number;
  sentiment: {
    score: number;
    comparitive: number;
    positive: string[];
    negative: string[];
  };
  text: string;
  createdAt: Date;
  user: {
    id: number;
    name: string;
    screenName: string;
  };
  retweetCount: number;
  favoriteCount: number;
}

interface WordStructure {
  word: string;
  count: number;
}

interface ScoreStructure {
  scoreAvg: number;
  time: number;
}

interface Trend extends Document {
  id: string;
  name: string;
  positiveTweets: Tweet[];
  negativeTweets: Tweet[];
  scoreAvg: number;
  comparativeAvg: number;
  positiveWords: WordStructure[];
  negativeWords: WordStructure[];
  scoreAvgHistory: ScoreStructure[];
  createdAt: number;
  tweetVolume: number;
}

let App: Realm.App;

const populateDb = async (env: Bindings) => {
  App = App || new Realm.App(env.REALM_APPID);
  let twitterApiBearer: string;
  try {
    const credentials = Realm.Credentials.apiKey(env.REALM_API_KEY);
    // Attempt to authenticate
    var user = await App.logIn(credentials);
    var client = user.mongoClient('mongodb-atlas');
    const response = await fetch(
      'https://api.twitter.com/oauth2/token?grant_type=client_credentials',
      {
        method: 'post',
        headers: {
          Authorization: `Basic ${btoa(`${env.C_KEY}:${env.C_SECRET}`)}`,
        },
      }
    );
    const { access_token } = await response.json();
    if (access_token) {
      twitterApiBearer = access_token;
    } else {
      throw new Error();
    }
  } catch (err) {
    return utils.toError('Error with authentication.', 500);
  }

  // Grab a reference to the "cloudflare.todos" collection
  const stateCollection = client
    .db('myFirstDatabase')
    .collection<State>('states');
  const trendCollection = client
    .db('myFirstDatabase')
    .collection<Trend>('trends');

  const state = await stateCollection.findOne();
  const lastUpdated = state ? state.updated : 0;
  if (Date.now() - lastUpdated <= 240000) {
    return utils.toError('Cannot make the calls to twitter at this time');
  }
  let trends = await utils.getTrends(twitterApiBearer);
  trends = trends.splice(0, 20);
  const twitterTrends: {
    [key: string]: utils.TwitterTrend;
  } = trends.reduce((trendObj, trend) => {
    return { ...trendObj, [trend.name]: trend };
  }, {});
  const tweetPromises = trends.map(async (trend) => {
    const tweets = await utils.searchTweets(twitterApiBearer, trend.name);
    return { statuses: tweets, name: trend.name };
  });
  const tweetSwearches = await Promise.all(tweetPromises);
  const namesAdded: string[] = [];
  let scoreTotal = 0;
  const currentTrends = await trendCollection.find();
  const existingTrends: { [key: string]: boolean } = currentTrends.reduce(
    (dict, trend) => {
      return { ...dict, [trend.name]: true };
    },
    {}
  );
  const trendTweets: any[] = [];
  const dbUpdates = tweetSwearches.map(async (search, i) => {
    const analyzedData = analyzeTweets(search.statuses);

    if (analyzedData) {
      console.log(analyzedData.negativeTweets.length);
      trendTweets.push(analyzedData);
      const tweetVolume = twitterTrends[search.name].tweet_volume;
      const { createdAt, scoreAvgHistory, ...rest } = analyzedData;
      if (existingTrends[search.name]) {
        await trendCollection.findOneAndUpdate(
          { name: search.name },
          {
            $set: { ...rest, tweetVolume },
            $push: {
              scoreAvgHistory: {
                scoreAvg: rest.scoreAvg,
                createdAt,
              },
            },
          }
        );
      } else {
        const newTrend = {
          ...analyzedData,
          tweetVolume,
          name: search.name,
          id: crypto.randomUUID(),
        };
        await trendCollection.insertOne(newTrend);
      }

      namesAdded.push(search.name);
      scoreTotal += analyzedData.scoreAvg;
    }
    return;
  });

  await Promise.all(dbUpdates);
  console.log('Added these trends to DB - ', namesAdded);

  await trendCollection.deleteMany({ name: { $nin: namesAdded } });
  console.log('DB update done');

  const scoreAvg = scoreTotal / (namesAdded.length || 1);
  console.log(scoreAvg);
  const updateTime = Date.now();

  const pop =
    state && state.avgHistory.length === 50
      ? {
          $pop: { avgHistory: -1 },
        }
      : false;
  await stateCollection.findOneAndUpdate(
    {},
    {
      $set: {
        updated: updateTime,
      },
      $push: { avgHistory: { scoreAvg, time: updateTime } },
    },
    { upsert: true }
  );

  if (pop) {
    await stateCollection.findOneAndUpdate(
      {},
      {
        ...pop,
      }
    );
  }
  return utils.reply({ twitterTrends, trendTweets });
};

// Define the Worker logic
const worker: ExportedHandler<Bindings> = {
  async fetch(req, env) {
    const method = req.method;

    try {
      if (method === 'GET') {
        return await populateDb(env);
      }

      // unknown method
      return utils.toError('Method not allowed.', 405);
    } catch (err) {
      const msg = (err as Error).message || 'Error with query.';
      return utils.toError(msg, 500);
    }
  },
  async scheduled(ev, env, ctx) {
    ctx.waitUntil(populateDb(env));
  },
};

// Export for discoverability
export default worker;
