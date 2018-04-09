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
  objToArr: (obj) => {
    const result = [];
    Object.keys(obj).forEach((key) => {
      result.push(obj[key]);
    });
    return result;
  },
};

export default arrayHelper;
