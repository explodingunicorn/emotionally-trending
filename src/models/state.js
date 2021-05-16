const { Schema, model } = require('mongoose');

const StateSchema = new Schema({
  updated: 'number',
  avgHistory: [{ scoreAvg: 'number', time: 'number' }],
});

const State = model('State', StateSchema);

module.exports = {
  State,
};
