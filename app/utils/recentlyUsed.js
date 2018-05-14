import storage from './localStorage';
import timer from './timer';
import getBox from './const/box';

const recentlyUsed = {
  clearExpire: () => {
    const rU = storage.get('p_box_recent', true, '{}');
    const newRU = {};
    Object.keys(rU).forEach((date) => {
      // 保留15天内的访问数据
      if (timer(date, 'YYYYMMDD').to(timer(), 'num', 2) > -15) {
        newRU[date] = rU[date];
      }
    });
    storage.set('p_box_recent', newRU, true);
  },
  get: (type, showBox) => {
    const result = {};
    const rU = storage.get('p_box_recent', true, '{}');
    Object.values(rU).forEach((v) => {
      Object.keys(v).forEach((b) => {
        if (!result[b]) {
          result[b] = {
            count: 0,
            name: v[b].name,
            type: v[b].type,
          };
        }
        result[b].count += v[b].count;
      });
    });
    const resultArr = Object.values(result);
    resultArr.sort((a, b) => a.count - b.count < 0);
    if (showBox) {
      const boxArr = [];
      resultArr.forEach((b) => {
        if ((type && b.type === type) || !type) {
          boxArr.push(getBox('', b.name, true));
        }
      });
      return boxArr;
    }
    return resultArr;
  },
  set: (name, type) => {
    const rU = storage.get('p_box_recent', true, '{}');
    const date = timer().str('YYYYMMDD');
    if (!rU[date]) {
      rU[date] = {};
    }
    if (!rU[date][name]) {
      rU[date][name] = {
        count: 0,
        name,
        type,
      };
    }
    rU[date][name].count += 1;
    storage.set('p_box_recent', rU, true);
  },
};

export default recentlyUsed;
