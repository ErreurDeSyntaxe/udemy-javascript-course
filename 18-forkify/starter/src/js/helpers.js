// a file for function that we use often in the project
import { async } from 'regenerator-runtime';
import { TIMEOUT_SEC } from './config.js';

// prevents a request to last forever if bad internet connection
const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const getJSON = async function (url) {
  try {
    // const res = await fetch(url);
    const res = await Promise.race([fetch(url), timeout(TIMEOUT_SEC)]);
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} (${res.status})`);
    return data;
  } catch (err) {
    // rethrow the error so it is handled by controller.js
    throw err;
  }
};
