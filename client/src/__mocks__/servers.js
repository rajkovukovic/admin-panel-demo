/* eslint-disable */
import * as moment from 'moment';
import ServerStates from '../constants/serverState';
import cities from './cities';

function generateIP() {
  let result = '';
  for (let i = 0; i < 4; i += 1) {
    result += `${i !== 0 ? '.' : ''}${1 + Math.floor(254 * Math.random())}`;
  }
  return result;
}

// const currentTime = moment();
const availableStateValues = [];
for (let i = 0; i < 100; i += 1) { availableStateValues.push(ServerStates.ACTIVE) };
for (let i = 0; i < 20; i += 1) { availableStateValues.push(ServerStates.INACTIVE) };
for (let i = 0; i < 10; i += 1) { availableStateValues.push(ServerStates.PANIC) };
const servers = new Map();

for (let i = 0; i < 30; i += 1) {
  const stateIndex = Math.floor(Math.random() * availableStateValues.length);
  const serverId = `${i + 1}`;
  const unavailable = Math.random() < 0.05;
  servers.set(serverId, {
    serverId:     serverId,
    name:         `Server ${i + 1}`,
    uptime:       0.99 + (Math.random() * 0.01),
    state:        unavailable ? ServerStates.UNAVAILABLE : availableStateValues[stateIndex],
    ip:           generateIP(),
    lastTimeSeen: unavailable
      ? moment().subtract({minutes: Math.floor(60 * Math.random())})
      : null,
    lastMessage:  `Last message ${i + 1}`,
    location:     cities[i],
  });
}

export default servers;