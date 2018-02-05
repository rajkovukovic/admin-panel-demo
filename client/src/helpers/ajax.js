import fetchRetry from 'fetch-retry';
import { UserBackend } from '../config';

const FETCH_RETRIES = 2;
const FETCH_RETTRY_DELAY = 800;
const FETCH_DEFAULTS = {
  // mode:       'no-cache',
  retries:    FETCH_RETRIES,
  retryDelay: FETCH_RETTRY_DELAY,
};

// const objectToFormData = (obj) => {
//   const data = new FormData();
//   Object.keys(data).forEach(key => data.append(key, obj[key]));
//   return data;
// };

const authHeader = (token, contentType) => {
  return new Headers({
    Accept:         'application/json, text/plain',
    'Content-Type': typeof contentType === 'string' && contentType !== '' ? contentType : undefined,
    Authorization:  typeof token === 'string' && token !== '' ? `JWT ${token}` : undefined,
  });
};

/*
  expected result: {
    success: boolean,
    token: string,
    user: Object
  }
*/
export const signIn = async (data) => {
  try {
    const response = await fetchRetry(UserBackend.LOGIN, {
      ...FETCH_DEFAULTS,
      headers: new Headers({
        Accept:         'application/json, text/plain',
        'Content-Type': 'application/json',
      }),
      method: 'POST',
      body:   JSON.stringify(data),
    });
    const json = await response.json();
    if (!json.success) {
      throw new Error(json.message || json);
    }
    if (!json.user) {
      throw new Error('Server error. Missing user field on response object.');
    }
    return json;
  }
  catch (e) {
    throw new Error(e.message);
  }
};

export const userFromToken = async (token) => {
  try {
    const response = await fetchRetry(UserBackend.AUTH, {
      ...FETCH_DEFAULTS,
      method:  'GET',
      headers: authHeader(token),
    });
    const json = await response.json();
    return json;
  }
  catch (e) {
    throw new Error(e.message);
  }
};
