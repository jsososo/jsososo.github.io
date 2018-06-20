const getBox = (type, search, isName = false, boxInfo) => {
  const boxLen = JSON.parse(JSON.stringify(boxInfo));
  let result = {};
  if (type) {
    result[type] = boxLen[type];
  } else {
    result = boxLen;
  }

  if (isName) {
    Object.keys(result).forEach((key) => {
      result = result[key].find((b) => b.name === search);
      if (result) {
        return result;
      }
    });
  } else if (search) {
    Object.keys(result).forEach((key) => {
      result[key] = result[key].filter((b) => b.keyWords.indexOf(search) > -1);
    });
  }
  return result;
};

export default getBox;
