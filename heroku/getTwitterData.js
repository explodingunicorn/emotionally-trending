const dotenv = require('dotenv');
const mongoose = require('mongoose');
const { updateDb } = require('../src/twitter/updateDb');

dotenv.config();

const { MONGO_URL, MONGO_USER_PWD } = process.env;

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
    await updateDb({ startUp: true });
    console.log('updated db before server');
    mongoose.disconnect();
  });
};

module.exports = {
  getTwitterData: main,
};
