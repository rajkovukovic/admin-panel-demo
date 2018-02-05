import { createAction } from 'redux-actions';
import AuthActionNames, { AuthType } from '../constants/authActionNames';
import * as Storage from '../../helpers/storage';
import * as Ajax from '../../helpers/ajax';
import StorageKeys from '../../constants/storage';
import errorTransformer from '../../helpers/errorTransformer';

const noOp = () => {};

export const checkStorageAuthToken = (callback = noOp) => {
  return async (dispatch) => {
    const token = Storage.readData(StorageKeys.TOKEN);
    if (token) {
      dispatch(createAction(AuthActionNames.AUTH_UPDATE_STATE)({
        tokenRead: true,
        token,
        authState: AuthType.TOKEN,
      }));
      try {
        const response = await Ajax.userFromToken(token);
        dispatch(createAction(AuthActionNames.AUTH_UPDATE_STATE)({
          authState: response.user ? AuthType.AUTHENTICATED : AuthType.UNAUTH,
          error:     null,
          user:      response.user || null,
        }));
        callback(true);
      }
      catch (error) {
        dispatch(createAction(AuthActionNames.AUTH_UPDATE_STATE)({
          authState: AuthType.UNAUTH,
          user:      null,
          error:     errorTransformer(error),
        }));
        callback(false);
      }
    }
    else {
      dispatch(createAction(AuthActionNames.AUTH_SET_AUTH_STATE)(AuthType.UNAUTH));
      callback(false);
    }
  };
};

export const signIn = ({
  login, password, keepMeSignIn = false, callback = noOp,
}) => {
  if (!login || !password) {
    throw new Error('login and password must be specified');
  }
  return async (dispatch) => {
    try {
      dispatch(createAction(AuthActionNames.AUTH_SET_AUTH_STATE)(AuthType.SIGNIN));
      const response = await Ajax.signIn({
        login,
        password,
      });
      if (keepMeSignIn /* && response.success && response.user && response.token */) {
        Storage.setStorageType('local');
        Storage.saveData(StorageKeys.TOKEN, response.token);
      }
      if (response.success && response.user) {
        dispatch(createAction(AuthActionNames.AUTH_UPDATE_STATE)({
          authState: AuthType.AUTHENTICATED,
          token:     response.token || null,
          user:      response.user,
          error:     null,
        }));
        callback(true);
      }
      else {
        dispatch(createAction(AuthActionNames.AUTH_UPDATE_STATE)({
          authState: AuthType.UNAUTH,
          token:     null,
          user:      null,
          error:     null,
        }));
        callback(false);
      }
    }
    catch (error) {
      dispatch(createAction(AuthActionNames.AUTH_UPDATE_STATE)({
        authState: AuthType.UNAUTH,
        user:      null,
        error:     errorTransformer(error),
      }));
      callback(false);
    }
  };
};

export const signOut = () => {
  return (dispatch) => {
    Storage.removeData(StorageKeys.TOKEN);
    dispatch(createAction(AuthActionNames.AUTH_UPDATE_STATE, {
      authState: false,
      user:      null,
      error:     null,
    }));
  };
};
