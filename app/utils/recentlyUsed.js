import Storage from './Storage';
import timer from './timer';
import getBox from './const/box';

const recentlyUsed = {
  get: (type, rUObj, boxes) => {
    try {
      const rU = JSON.parse(rUObj.value);
      const count = {};
      // 仅保留15天内的访问数据
      const newRU = {};
      Object.keys(rU).forEach((date) => {
        if(timer(date, 'YYYYMMDD').to(timer(), 'num', 2) > -15) {
          newRU[date] = rU[date];
          Object.keys(newRU[date]).forEach((name) => {
            if (newRU[date][name].type === type) {
              if (!count[name]) {
                count[name] = 0;
              }
              count[name] += Number(newRU[date][name].count);
            }
          });
        }
      });

      // 更新Bmob中的访问数据，清除15天以上数据
      if (JSON.stringify(newRU) !== JSON.stringify(rU)) {
        rUObj.value = newRU;
        Storage.setBmob(
          'RecentlyUsed',
          rUObj.objectId,
          {
            value: JSON.stringify(newRU),
          },
        );
      }
      const result = Object.keys(count).map((name) => {
        const box = boxes.find(b => b.name === name);
        if (box) {
          box.count = count[name];
          return box;
        }
      });
      result.sort((a, b) => b.count - a.count);
      return result;
    } catch (err) {
      console.log(err);
      return [];
    }
  },
  set: (name, type, username) => {
    Storage.queryBmob(
      'RecentlyUsed',
      (q) => {
        q.equalTo('user', username);
        return q;
      },
      (res) => {
        const rU = res || { user: username, value: '{}' };
        rU.value = JSON.parse(rU.value);

        const date = timer().str('YYYYMMDD');
        if (!rU.value[date]) {
          rU.value[date] = {};
        }
        if (!rU.value[date][name]) {
          rU.value[date][name] = {
            count: 0,
            name,
            type,
          };
        }
        rU.value[date][name].count += 1;
        rU.value = JSON.stringify(rU.value);
        Storage.setBmob(
          'RecentlyUsed',
          res.objectId,
          rU,
        );
      }
    );
  },
};

export default recentlyUsed;
