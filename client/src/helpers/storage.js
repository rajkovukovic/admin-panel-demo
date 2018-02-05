const PREFERRED_STORAGE = 'PREFERRED_STORAGE';
let useSessionStorage = true;
let mainStorage = window.sessionStorage;

// some basic additional XSS protection
// encrypt - decrypt keys
const ak = {};
const bk = {};
const ascii = ' !"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~';
const shuff = '5I}J%#"^+`nb_(.{tdXj:&fY6Z]3S7esMLc\\[q @V-\'HUlBA>~pi|FRNQy=whGPK;$g2Cr!x<01uzk/4aWEo,OTvD?8m*9)';
for (let i = 0; i < ascii.length; i += 1) {
  ak[ascii[i]] = shuff[i];
  bk[shuff[i]] = ascii[i];
}

// encrypt string to be stored in localStorage
const af = (a) => {
  let result = '';
  for (let i = 0; i < a.length; i += 1) {
    const char = ak[a[i]];
    result = (typeof char === 'undefined' ? a[i] : char) + result;
  }
  return encodeURIComponent(result);
};

// decrypt string from localStorage
const bf = (c) => {
  const a = decodeURIComponent(c);
  let result = '';
  for (let i = 0; i < a.length; i += 1) {
    const char = bk[a[i]];
    result = (typeof char === 'undefined' ? a[i] : char) + result;
  }
  return result;
};

export const setStorageType = (localOrSession) => {
  if (localOrSession !== 'local' && localOrSession !== 'session') {
    throw new Error('localOrSession must be \'local\' or \'session\'');
  }
  const shouldUseSessionStorage = localOrSession === 'session';
  if (useSessionStorage === !!shouldUseSessionStorage) {
    return;
  }
  useSessionStorage = !!shouldUseSessionStorage;
  mainStorage = useSessionStorage ? window.sessionStorage : window.localStorage;
  window.localStorage.clear();
  window.sessionStorage.clear();
  mainStorage.setItem(PREFERRED_STORAGE, true);
};

export const saveData = (key, data) => {
  try {
    mainStorage.setItem(af(key), af(JSON.stringify(data)));
    return true;
  }
  catch (error) {
    // eslint-disable-next-line
    console.error(error);
    return false;
  }
};

export const readData = (key) => {
  let result = null;
  try {
    result = bf(mainStorage.getItem(af(key)));
    if (result) {
      return JSON.parse(result);
    }
  }
  catch (error) {
    return null;
  }
  return result;
};

export const removeData = (key) => {
  try {
    mainStorage.removeItem(af(key));
    return true;
  }
  catch (error) {
    // eslint-disable-next-line
    console.error(error);
    return false;
  }
};

if (localStorage.getItem(PREFERRED_STORAGE)) {
  useSessionStorage = false;
  mainStorage = window.localStorage;
}
