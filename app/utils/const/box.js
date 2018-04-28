const imgUrl = (str) => {
  if (window.location.origin.indexOf('jsososo.github.io') > -1) {
    return `/person-web/app/resources/img/${str}`;
  }
  return `/app/resources/img/${str}`;
};

const boxInfo = {
  kit: [
    {
      name: '日历',
      type: 'kit',
      img: imgUrl('calendar.png'),
      color: '#3089DC',
      keyWords: '日历calendar里程碑milestone万年历计划表rili',
      url: '#/kit/calendar',
    },
    {
      name: '账单统计',
      type: 'kit',
      img: imgUrl('cashbook.png'),
      color: '#FFA033',
      keyWords: '记账jizhangzhangbentongji账本账单统计cashbook',
      url: '#/kit/cashbook',
    },
    {
      name: '记事本',
      type: 'kit',
      img: imgUrl('notebook.png'),
      color: '#1DC11D',
      keyWords: '记事本notebook备忘录工作效率jishiben',
      url: '#/kit/notebook',
    },
  ],
};

const getBox = (type, search, isName = false) => {
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
