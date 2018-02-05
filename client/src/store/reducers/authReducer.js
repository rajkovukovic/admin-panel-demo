import AuthActionNames, { AuthType } from '../constants/authActionNames';

const initialState = {
  tokenRead: false,
  token:     null,
  authState: AuthType.NONE, // NONE | TOKEN | SIGNIN
  user:      null,
  error:     null,
};

export default function accounts(state = initialState, action) {
  switch (action.type) {
    case AuthActionNames.AUTH_SET_STATE:
      return {
        ...action.payload,
      };
    case AuthActionNames.AUTH_UPDATE_STATE:
      return {
        ...state,
        ...action.payload,
      };
    case AuthActionNames.AUTH_SET_TOKEN_READ:
      return {
        ...state,
        tokenRead: action.payload,
      };
    case AuthActionNames.AUTH_SET_TOKEN:
      return {
        ...state,
        token: action.payload,
      };
    case AuthActionNames.AUTH_SET_AUTH_STATE:
      return {
        ...state,
        authState: action.payload,
      };
    case AuthActionNames.AUTH_SER_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case AuthActionNames.AUTH_SET_USER:
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
}
