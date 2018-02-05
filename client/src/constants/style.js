import ServerStates from './serverState';

export const Colors = {
  primary: '#F3C46E',
};

export const ServerStatesColor = {
  [ServerStates.ACTIVE]:      '#17a2b8',
  [ServerStates.INACTIVE]:    '#dddddd',
  [ServerStates.PANIC]:       '#ffc107',
  [ServerStates.UNAVAILABLE]: '#dc3545',
};
