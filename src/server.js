import sirv from 'sirv';
import polka from 'polka';
import * as dotenv from 'dotenv';
import compression from 'compression';
import * as sapper from '@sapper/server';
import mongoose from 'mongoose';

dotenv.config();

const { PORT, NODE_ENV, MONGO_URL, MONGO_USER_PWD } = process.env;
const dev = NODE_ENV === 'development';

const mongoConnectStr =
  MONGO_URL && MONGO_USER_PWD
    ? `mongodb+srv://${MONGO_USER_PWD}@${MONGO_URL}`
    : 'mongodb://localhost:27017';

console.log(mongoConnectStr);

mongoose.connect(encodeURI(mongoConnectStr), {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

const main = () => {
  const db = mongoose.connection;
  db.on('error', () => {
    console.error('DB connection failed');
  });

  db.once('open', async () => {
    polka() // You can also use Express
      .use(
        compression({ threshold: 0 }),
        sirv('static', { dev }),
        sapper.middleware()
      )
      .listen(PORT, (err) => {
        if (err) console.log('error', err);
      });
  });
};

main();
