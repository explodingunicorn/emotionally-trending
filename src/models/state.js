import { Schema, model } from 'mongoose';

const StateSchema = new Schema({
  updated: 'number',
  avgHistory: [{ scoreAvg: 'number', time: 'number' }],
});

export const State = model('State', StateSchema);
