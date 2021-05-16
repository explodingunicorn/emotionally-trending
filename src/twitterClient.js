const dotenv = require('dotenv');
const Twitter = require('twitter');

dotenv.config();

const TwitterClient = new Twitter({
  consumer_key: process.env.C_KEY,
  consumer_secret: process.env.C_SECRET,
  access_token_key: process.env.A_T_KEY,
  access_token_secret: process.env.A_T_SECRET,
});

module.exports = {
  TwitterClient,
};
