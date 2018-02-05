import keyMirror from 'keymirror';

const authActionNames = keyMirror({
  AUTH_SET_STATE:      null,
  AUTH_UPDATE_STATE:   null,
  AUTH_SET_AUTH_STATE: null,
  AUTH_SET_TOKEN_READ: null,
  AUTH_SET_TOKEN:      null,
  AUTH_SER_ERROR:      null,
  AUTH_SET_USER:       null,
});

export const AuthType = {
  NONE:          null,
  TOKEN:         'TOKEN',
  SIGNIN:        'SIGNIN',
  AUTHENTICATED: 'AUTHENTICATED',
  UNAUTH:        'UNAUTH',
};

export default authActionNames;
