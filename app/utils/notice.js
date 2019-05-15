import React from 'react';
import Storage from './Storage';
import timer from './timer';
import { notification } from 'antd';
import { shortString } from './stringHelper';
import DataSaver from './hydrogen';

const today = timer();

let NoticeSetting = [];

const noticeMap = {
  ARTICLE_COMMENT: {
    title: '新的评论',
    content: (content) => (
      <div>
        你在
        <a onClick={() => Notice.commentRead(content.articleId)} className="fc_blue" href={`#/article/?id=${content.articleId}&l=${content.location}`}>{content.title}</a>
        中被提到啦～
      </div>
    ),
  },
};

let NoticeList = [];

const Notice = {
  // 来自主动创建的提醒（如评论）
  create: (obj) => {
    DataSaver.create({ table: 'Notice', obj });
  },
  // 创建评论提醒
  createComment: (articleInfo, remind) => {
    remind.forEach(async (name) => {
      const u = await DataSaver.getUser(name, 'username');
      Notice.create({
        userId: u.objectId,
        type: 'ARTICLE_COMMENT',
        content: {
          title: shortString(decodeURI(decodeURI(articleInfo.title || '')) || '无题', 7),
          articleId: articleInfo.objectId,
          location: articleInfo.comment.length,
        },
        time: timer().time,
        isRead: false,
      });
    });
  },
  // 获取提醒 (获取主动创建的提醒)
  get: (param = {}) => {
    const uId = Storage.get('uId');
    if (!uId) {
      cb();
      return;
    }
    return DataSaver.query({
      table: 'Notice',
      e: { isRead: false, ...param, userId: uId },
    });
  },
  // 循环调用，每两分钟查询一次
  getInfo: () => {
    Notice.get({})
      .then((res) => {
        if (res && res.length > 0) {
          NoticeList = res;
          res.forEach((n) => {
            notification.open({
              key: `notice-${n.objectId}`,
              message: noticeMap[n.type].title,
              duration: null,
              onClose: () => Notice.read(n.objectId),
              description: noticeMap[n.type].content(n.content),
            });
          });
        }
        setTimeout(() => {
          Notice.getInfo();
        }, 1000 * 120);
      }).catch((err) => {
        console.log(err);
        setTimeout(() => {
          Notice.getInfo();
        }, 1000 * 120);
      });
  },
  // 评论设置为已读
  commentRead: (aId) => {
    NoticeList.forEach((n) => {
      if (n.content.articleId === aId) {
        Notice.read(n.objectId);
      }
    });
  },
  // 提醒设置为已读
  read: (id) => {
    notification.close(`notice-${id}`);
    DataSaver.set({
      table: 'Notice',
      id,
      obj: {
        isRead: true,
      },
    });
  },
  // 寻找提醒（不计入数据存储，调各个应用的接口拉数据去判断是否要提醒）
  findNotice: () => {
    const userId = Storage.get('uId');
    // 今天提醒过就不提醒了
    if (!userId || Storage.get(`notice-record-${userId}`) === today.str()) {
      return;
    }
    DataSaver.query({
      table: 'Piggy',
      e: { userId },
      select: ['total', 'current', 'endTime', 'startTime', 'title', 'average', 'type', 'record'],
    }).then(piggyCb);
    DataSaver.query({
      table: 'NoticeSetting',
      e: { userId },
    }).then(noticeSettingCb);
    // 标志今天提醒过了
    Storage.set(`notice-record-${userId}`, today.str());
  },
};

// NoticeSetting相关
const noticeSettingCb = (res) => {
  const userId = Storage.get('uId');
  if (!userId) {
    return;
  }
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
      item.userId = userId;
      DataSaver.create({
        table: 'NoticeSetting',
        obj: item,
      });
    });
    return;
  }
  NoticeSetting = res;
  DataSaver.query({
    table: 'Thing',
    e: { userId },
    n: { tag: '' },
    select: ['title', 'tag', 'time'],
  }).then(thingCb);
};

const noticeStr = (num, t = false) => {
  if (num) {
    return `${num}周年${t ? '了' : '啦'}`;
  }
  return t ? '了' : '到了';
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
        const isYMD = (rule.type === 'YYYYMMDD');
        switch (rule.count) {
          case 0:
            noticeText = isYMD ? '就是今天啦,' : `今天就是${noticeStr((today.year - timer(item.time).year), true)}，`;
            return;
          case 1:
            noticeText = isYMD ? '明天明天！' : `明天就要${noticeStr(today.year - timer(item.time).year)}，`;
            return;
          case 2:
            noticeText = isYMD ? '后天就是啦，' : `后天就要${noticeStr(today.year - timer(item.time).year)}，`;
            return;
          default:
            noticeText = isYMD ? `还有${rule.count}天，` : `还有${noticeStr(today.year - timer(item.time).year)}，`;
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
            key={key}
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
