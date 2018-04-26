const arrayHelper = {
  delDuplicate: (arr1, arr2 = []) => {
    const arr = [...arr1, ...arr2];
    const result = [];
    arr.forEach((item) => {
      if (result.indexOf(item) < 0) {
        result.push(item);
      }
    });
    return result;
  },
  delDuplicateObj: (arr, keys) => {
    const arrLen = [];
    const result = [];
    arr.forEach((item) => {
      let valLen = item;
      for (let i = 0; i < keys.length; i += 1) {
        valLen = valLen[keys[i]];
      }
      if (arrLen.indexOf(valLen) === -1) {
        arrLen.push(valLen);
        result.push(item);
      }
    });
    return result;
  },
  objToArr: (obj) => {
    const result = [];
    Object.keys(obj).forEach((key) => {
      result.push(obj[key]);
    });
    return result;
  },
  hasDuplicate: (arr1, arr2) => {
    return arrayHelper.getDuplicate(arr1, arr2).length !== 0;
  },
  getDuplicate: (arr1, arr2) => {
    const result = [];
    arr1.forEach((item) => {
      if (arr2.indexOf(item) > -1) {
        result.push(item);
      }
    });
    return result;
  },
};

export default arrayHelper;
