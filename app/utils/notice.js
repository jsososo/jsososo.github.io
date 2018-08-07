import React from 'react';
import Storage from './Storage';
import timer from './timer';
import { notification } from 'antd';

const today = timer();
const username = Storage.get('user').split('-')[0] || '';

const Notice = {
  // 来自主动创建的提醒（如评论）
  create: (val) => {
    Storage.createBmob(
      'Notice',
      val,
    );
  },
  // 获取提醒 (获取主动创建的提醒)
  get: (id, cb, isRead = false, type) => {
    Storage.queryBmob(
      'Notice',
      (q) => {
        q.equalTo('username', username);
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
  findNotice: () => {
    // 今天提醒过就不提醒了
    if (!username || Storage.get(`notice-record-${username}`) === today.str()) {
      return;
    }
    baseQuery('Piggy', 'username', piggyCb);
    // 标志今天提醒过了
    Storage.set(`notice-record-${username}`, today.str());
  },
};


// 存钱罐相关的函数

// 存钱罐的回调
const piggyCb = (res) => {
  const nArr = [];
  res.forEach((p) => {
    // 过滤掉过期或未开始的
    if (today.time > p.endTime || today.time < p.startTime) {
      return;
    }
    // 如果这段范围内已经完成任务了
    if ((p.record[getPiggyKey(p.type)] || 0) > p.average) {
      return;
    }
    if (!checkPiggyTime(p)) {
      return;
    }
    nArr.push(p);
  });
  const key = `piggy-${timer().time}`;
  notification.open({
    key,
    message: '存钱啦',
    duration: 10,
    description: (
      <div>
        别忘了给
        { nArr.map((n, i) => (
          <a
            key={`piggy-notice-${i}`}
            onClick={() => notification.close(key)}
            href={`#/kit/piggy/?id=${n.objectId}`}
            className="fc_blue"
          >{i !== 0 && '、'}{n.title}</a>
        )) }
        存钱呀～
      </div>
    ),
  });
};
// 根据时间判断是否提醒
const checkPiggyTime = (piggy) => {
  // 每周的周三之后提醒
  if (piggy.type === 'W') {
    return today.day.value > 3;
  }
  // 20号之后提醒
  if (piggy.type === 'M') {
    return today.date > 20;
  }
  // 如果是天的话每天提醒
  return true;
};
// 获取存钱罐的record key值
const getPiggyKey = (type) => {
  if (type === 'W') {
    return today.week();
  }
  if (type === 'M') {
    return today.str('YYYYMM');
  }
  return today.str('YYYYMMDD');
};

const baseQuery = (table, key, cb) => {
  Storage.queryBmob(
    table,
    (q) => {
      q.equalTo(key, username);
      return q;
    },
    (res) => res && cb(res),
    null,
    'find',
  );
};

export default Notice;
