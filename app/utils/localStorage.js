const localStorage = window.localStorage;

const Storage = {
  get: (key, toObj = false, d = '') => {
    let result = localStorage.getItem(key) || d;

    if (toObj) {
      result = JSON.parse(result);
    }

    return result;
  },

  set: (key, value, toStr = false) => {
    let v = value;
    if (toStr) {
      v = JSON.stringify(v);
    }
    localStorage.setItem(key, v);
  },
};

export default Storage;
