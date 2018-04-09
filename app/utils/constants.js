export const RESTART_ON_REMOUNT = '@@saga-injector/restart-on-remount';
export const DAEMON = '@@saga-injector/daemon';
export const ONCE_TILL_UNMOUNT = '@@saga-injector/once-till-unmount';

// 大数字
const MAX = 20000 * 365 * 24 * 3600 * 1000;
const CASHBOOK_DATA_HELPER = {
  // stringify避免指向同一类型
  rawDataStr: JSON.stringify({
    days: {
      type: 'days',
      first: MAX,
      last: 0,
      data: {},
    },
    months: {
      type: 'months',
      first: MAX,
      last: 0,
      data: {},
    },
    years: {
      type: 'years',
      first: MAX,
      last: 0,
      data: {},
    },
  }),
};
export const CASH_BOOK_DATA = {
  allData: {},
  // 初始化所有类型记录
  // allData: {
  //   eatRecords: JSON.parse(CASHBOOK_DATA_HELPER.rawDataStr),
  //   trafficRecords: JSON.parse(CASHBOOK_DATA_HELPER.rawDataStr),
  //   amusementRecords: JSON.parse(CASHBOOK_DATA_HELPER.rawDataStr),
  //   studyRecords: JSON.parse(CASHBOOK_DATA_HELPER.rawDataStr),
  //   otherRecords: JSON.parse(CASHBOOK_DATA_HELPER.rawDataStr),
  //   shoppingRecords: JSON.parse(CASHBOOK_DATA_HELPER.rawDataStr),
  //   travelRecords: JSON.parse(CASHBOOK_DATA_HELPER.rawDataStr),
  //   outcomeRecords: JSON.parse(CASHBOOK_DATA_HELPER.rawDataStr),
  //   incomeRecords: JSON.parse(CASHBOOK_DATA_HELPER.rawDataStr),
  //   defaultRecords: JSON.parse(CASHBOOK_DATA_HELPER.rawDataStr),
  //   mobileRecords: JSON.parse(CASHBOOK_DATA_HELPER.rawDataStr),
  //   surplusRecords: JSON.parse(CASHBOOK_DATA_HELPER.rawDataStr),
  //   totalRecords: JSON.parse(CASHBOOK_DATA_HELPER.rawDataStr),
  // },
  // 中文名对应的类型记录
  dataMap: {
    '餐饮': 'eatRecords',
    '淘宝': 'shoppingRecords',
    '一般': 'otherRecords',
    '交通': 'trafficRecords',
    '衣服鞋包': 'shoppingRecords',
    '零食': 'shoppingRecords',
    '生活用品': 'shoppingRecords',
    '旅游': 'travelRecords',
    '房租': 'defaultRecords',
    '学习': 'studyRecords',
    '水果': 'eatRecords',
    '电影': 'amusementRecords',
    '娱乐': 'amusementRecords',
    '话费': 'mobileRecords',
    '工资': 'incomeRecords',
    '生活费': 'incomeRecords',
    '零花钱': 'incomeRecords',
    '奖金': 'incomeRecords',
    '报销': 'incomeRecords',
    '投资收入': 'incomeRecords',
    '余额变更': 'otherRecords',
    '红包': 'otherRecords',
  },
  // 英文类型对应的中文名
  typeMap: {
    eatRecords: '吃的',
    shoppingRecords: '剁手',
    otherRecords: '其他',
    trafficRecords: '交通',
    travelRecords: '旅游',
    defaultRecords: '房租水电',
    studyRecords: '学习',
    amusementRecords: '浪',
    mobileRecords: '话费',
    incomeRecords: '收入',
    outcomeRecords: '支出',
    surplusRecords: '盈余',
    totalRecords: '总额',
  },
  // 英文时间类型对应的中文名
  dateMap: {
    years: '年',
    months: '月',
    days: '日',
  },
};
