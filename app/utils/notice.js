import React from 'react';
import Storage from './Storage';
import timer from './timer';
import { notification } from 'antd';

const today = timer();

let NoticeSetting = [];

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
    const username = Storage.get('user').split('-')[0]
    // 今天提醒过就不提醒了
    if (!username || Storage.get(`notice-record-${username}`) === today.str()) {
      return;
    }
    baseQuery('Piggy', { username }, null, ['total', 'current', 'endTime', 'startTime', 'title', 'average', 'type', 'record'], piggyCb);
    baseQuery('NoticeSetting', { username }, null, null, noticeSettingCb);
    // 标志今天提醒过了
    Storage.set(`notice-record-${username}`, today.str());
  },
};


// 一个基础Bmob find的请求
const baseQuery = (table, eq, nEq, s, cb) => {
  Storage.queryBmob(
    table,
    (q) => {
      eq && Object.keys(eq).forEach((k) => q.equalTo(k, eq[k]));
      nEq && Object.keys(nEq).forEach((k) => q.notEqualTo(k, nEq[k]));
      s && q.select(...[s]);
      return q;
    },
    (res) => res && cb(res),
    null,
    'find',
  );
};

// NoticeSetting相关
const noticeSettingCb = (res) => {
  const username = Storage.get('user').split('-')[0];
  // 如果发现他没有noticeSetting，给他创建三个系统的提醒
  if (!res.length) {
    const sysSetting = [
      {
        tag: '生日',
        rules: [{ type: 'MMDD', count: 0 }, { type: 'MMDD', count: 1 }, { type: 'MMDD', count: 3 }, { type: 'MMDD', count: 7 }],
      },
      {
        tag: '远方',
        rules: [{ type: 'YYYYMMDD', count: 1 }, { type: 'YYYYMMDD', count: 5 }, { type: 'YYYYMMDD', count: 10 }],
      },
      {
        tag: '纪念',
        rules: [{ type: 'Date', count: 100 }],
      },
    ];
    sysSetting.forEach((item) => {
      item.isSys = true;
      item.type = 'thing';
      item.username = username;
      Storage.createBmob('NoticeSetting', item);
    });
    return;
  }
  NoticeSetting = res;
  baseQuery('Thing', { user: username }, { tag: '' }, ['title', 'tag', 'time'], thingCb);
};

// 事件的回调
const thingCb = (res) => {
  res.forEach((item) => {
    if (!item.tag) {
      return;
    }
    const notice = NoticeSetting.find((ns) => ns.tag === item.tag);
    if (!notice) {
      return;
    }
    let showNotice = false;
    let noticeText = '';
    notice.rules.forEach((rule) => {
      if (rule.type === 'Date') {
        const dayCount = -1 * Number(timer().time > item.time) * timer(item.time).to(today, 'num', 2);
        if (dayCount && rule.count && !(dayCount % rule.count)) {
          showNotice = true;
          noticeText = `${dayCount}天了，纪念纪念～`;
        }
      } else if (timer(item.time).from(-1 * rule.count).str(rule.type) === today.str(rule.type)) {
        showNotice = true;
        if (rule.count === 0) {
          noticeText = '就是今天啦,';
        } else if (rule.count === 1) {
          noticeText = '明天明天！';
        } else if (rule.count === 2) {
          noticeText = '后天就是啦，';
        } else {
          noticeText = `还有${rule.count}天，`;
        }
      }
    });
    if (showNotice) {
      notification.open({
        key: `notice-${item.objectId}`,
        message: `【${item.tag}】提醒：${item.title || '没起名字诶'}`,
        duration: null,
        description: (
          <div>
            {noticeText}
            <a
              className="fc_blue"
              href={`#/kit/calendar/?date=${timer(item.time).str()}&id=${item.objectId}`}
              onClick={() => notification.close(`notice-${item.objectId}`)}
            >看看去</a>
          </div>
        ),
      });
  }
  });
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
    // 如果存完了
    if (p.current > p.total) {
      return;
    }
    if (!checkPiggyTime(p)) {
      return;
    }
    nArr.push(p);
  });
  if (nArr.length === 0) {
    return;
  }
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

export default Notice;
