import Storage from './Storage';
import timer from './timer';
import getBox from './const/box';
import DataSaver from './hydrogen';

const userId = Storage.get('uId');

const recentlyUsed = {
  create: () => {
    DataSaver.create({
      table: 'RecentlyUsed',
      obj: {
        userId,
        value: '{}',
      },
    });
  },
  query: async (type, boxes) => {
    const res = await DataSaver.query({
      table: 'RecentlyUsed',
      e: { userId },
      single: true,
    });
    if (res) {
      return recentlyUsed.get(type, res, boxes);
    } else {
      recentlyUsed.create();
      return [];
    }
  },
  get: (type, rUObj, boxes) => {
    try {
      const rU = JSON.parse(rUObj.value);
      const count = {};
      // 仅保留15天内的访问数据
      const newRU = {};
      Object.keys(rU).forEach((date) => {
        if (timer(date, 'YYYYMMDD').to(timer(), 'num', 2) > -15) {
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
        DataSaver.set({
          table: 'RecentlyUsed',
          id: rUObj.objectId,
          obj: {
            value: JSON.stringify(newRU),
          },
        });
      }
      const result = Object.keys(count).map((name) => {
        const box = boxes.find((b) => b.name === name);
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
  set: async (name, type) => {
    const res = await DataSaver.query({
      table: 'RecentlyUsed',
      e: { userId },
      single: true,
    });

    const rU = res || { userId, value: '{}' };
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

    DataSaver.set({ table: 'RecentlyUsed', id: res.objectId, obj: rU });
  },
};

export default recentlyUsed;
