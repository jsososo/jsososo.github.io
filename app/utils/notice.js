import Storage from './Storage';
import timer from './timer';

const today = timer();

const Notice = {
  // 来自主动创建的提醒（如评论）
  create: (val) => {
    Storage.createBmob(
      'Notice',
      val,
    );
  },
  // 获取提醒
  get: (user, id, cb, isRead = false, type) => {
    Storage.queryBmob(
      'Notice',
      (q) => {
        q.equalTo('username', user);
        if (id) {
          q.equalTo('id', id);
        }
        if (isRead !== null) {
          q.equalTo('isRead', isRead);
        }
        if (type) {
          q.equalTo('type', type);
        }
        return q;
      },
      cb,
      null,
      'find',
    );
  },
  // 提醒设置为已读
  read: (id) => {
    Storage.setBmob(
      'Notice',
      id,
      {
        isRead: true,
      },
    );
  },
  // 寻找提醒（不计入数据存储，调各个应用的接口拉数据去判断是否要提醒）
  findNotice: (user) => {
    // 今天提醒过就不提醒了
    if (Storage.get('notice-record') === today.str()) {
      return;
    }
    baseQuery('piggy', 'username', piggyCb);
  },
  showNotice: (info) => {
    console.log(info);
  },
};

const piggyCb = (res) => {
  res.forEach((p) => {
    if (today.time > p.endTime || today.time < p.startTime) {
      return;
    }
    if ((p.record[getPiggyKey(p.type)] || 0) > p.average) {
      return;
    }
    if (checkPiggyTime()) {
      return;
    }
  });
};

const checkPiggyTime = () => {
  return false;
};

const getPiggyKey = (type) => {
  if (type === 'W') {
    return today.week();
  }
  if (tpye === 'M') {
    return today.str('YYYYMM');
  }
  return today.str('YYYYMMDD');
};

const baseQuery = (table, key, user, cb) => {
  Storage.queryBmob(
    table,
    (q) => {
      q.equalTo(key, user);
      return q;
    },
    (res) => res && cb(res),
    null,
    'find',
  );
};

export default Notice;
