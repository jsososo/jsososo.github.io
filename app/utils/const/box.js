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
      url: '#/kit/calendar/',
    },
    {
      name: '账单统计',
      type: 'kit',
      img: imgUrl('cashbook.png'),
      color: 'rgb(202, 189,238)',
      keyWords: '记账jizhangzhangbentongji账本账单统计cashbook',
      url: '#/kit/cashbook/',
    },
    {
      name: '记事本',
      type: 'kit',
      img: imgUrl('notebook.png'),
      color: 'rgb(239, 210, 99)',
      keyWords: '笔记本记事本notebook备忘录工作效率jishiben',
      url: '#/kit/notebook/',
    },
    {
      name: '里程碑',
      type: 'kit',
      img: imgUrl('milestone.png'),
      color: 'rgb(239, 39, 99)',
      keyWords: '里程碑milestone时间线timeline时间轴',
      url: '#/kit/milestone/?id=today',
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
