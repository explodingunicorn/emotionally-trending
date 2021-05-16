const amqp = require('amqp-connection-manager');
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

const getTweets = () => {
  return new Promise((resolve) => {
    console.log('Opening DB');
    const db = mongoose.connection;

    if (db.readyState) {
      console.log('Getting twitter data');
      updateDb({ startUp: true }).then(resolve).catch(resolve);
    }
  });
};

const AMQP_URL = process.env.CLOUDAMQP_URL || 'amqp://localhost';
if (!AMQP_URL) process.exit(1);

const WORKER_QUEUE = 'worker-queue';

// Create a new connection manager from AMQP
var connection = amqp.connect([AMQP_URL]);
console.log('[AMQP] - Connecting....');

connection.on('connect', function () {
  process.once('SIGINT', function () {
    // Close conn on exit
    connection.close();
  });
  return console.log('[AMQP] - Connected!');
});

connection.on('disconnect', function (params) {
  return console.error('[AMQP] - Disconnected.', params.err.stack);
});

// ---------- To receive the execution task messages
let channelWrapper = connection.createChannel({
  json: true,
  setup: function (channel) {
    return Promise.all([
      channel.assertQueue(WORKER_QUEUE, { autoDelete: false, durable: true }),
      channel.prefetch(1),
      channel.consume(WORKER_QUEUE, onMessage),
    ]);
  },
});

channelWrapper
  .waitForConnect()
  .then(function () {
    console.log('[AMQP] - Listening for messages on queue => ' + WORKER_QUEUE);
  })
  .catch(function (err) {
    console.error('[AMQP] - Error! ', err);
  });

// Process message from AMQP
async function onMessage(data) {
  let message;
  try {
    message = JSON.parse(data.content.toString());
  } catch (e) {
    console.error('[AMQP] - Error parsing message... ', data);
  }

  console.log('[AMQP] - Message incoming... ', message);
  channelWrapper.ack(data);
  if (!message) {
    return;
  }

  switch (message.taskName) {
    case 'getTweets':
      await getTweets();
      break;

    default:
      console.error('No task was found with name => ' + message.taskName);
  }
}
