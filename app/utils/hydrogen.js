import Bmob from 'hydrogen-js-sdk';
import Storage from "./Storage";
import { allUserInfo } from "./constants";

const eMap = {
  e: '==',
  b: '>',
  s: '<',
  n: '!=',
  be: '>=',
  se: '<=',
};

const create = ({ table, obj }) => {
  const query = Bmob.Query(table);
  return set({ q: query, obj });
};

const set = async ({ q, obj, table, id }) => {
  const query = q || await get({ table, id });
  delete obj.createdAt;
  delete obj.updatedAt;
  delete obj.objectId;
  Object.keys(obj).forEach((k) => query.set(k, obj[k]));
  return query.save();
};
/*
*  @e, b, s, n, be, se: equalTo 方法支持的比较
*
* */
const query = async (param) => {
  const { select, table, count, pageNo, pageSize, order, query, or, single } = param;
  let result = {};
  const q = Bmob.Query(table);

  if (or) {
    const qArr = or.map((orInfo) => q.equalTo(...orInfo));
    q.or(...qArr);
  }
  setQuery(q, param)

  if (pageNo && pageSize) {
    q.limit(pageSize);
    q.skip(pageSize * (pageNo - 1));
  }
  if (order) {
    typeof order === 'string' ?
      (q.order(order)) :
      (q.order(...order));
  }
  if (select) {
    typeof select === 'string' ?
      q.select(select) :
      q.select(...select);
  }

  if (count) {
    await q.count()
      .then((res) => {
        result.count = res;
      });
  }
  await q.find()
    .then((res) => {
      result.list = res;
      if (!count) {
        result = res;
      }
    });
  return single ? result[0] : result;
};

const get = ({ table, id, select }) => {
  const q = Bmob.Query(table);
  return q.get(id);
};

const queryObj = (q, obj, type) => {
  Object.keys(obj).forEach((k) => {
    q.equalTo(k, type, obj[k] === undefined ? ' ' : obj[k]);
  });
};

const del = ({ table, id }) => {
  const q = Bmob.Query(table);
  return q.destroy(id);
};

const setQuery = (q, param) => {
  Object.keys(eMap).forEach((k) => {
    if (param[k]) {
      queryObj(q, param[k], eMap[k]);
    }
  });
  return q;
};

const queryOr = (param) => {
  const { table, or } = param;
  const q = Bmob.Query(table);

  const qArr = or.map((orInfo) => q.equalTo(...orInfo));
  q.or(...qArr);

  param.query = q;
  return query(param);
};

const login = async (userInfo) => {
  if (!userInfo) {
    const storageInfo = Storage.get('user');
    if (!storageInfo) {
      return;
    }
    userInfo = {
      username: storageInfo.split('-')[0],
      password: storageInfo.split('-')[1].split('').reverse().join(''),
    };
  }
  const { username, password } = userInfo;
  return Bmob.User.login(username, password)
    .then((res) => {
      allUserInfo.id[res.objectId] = res;
      allUserInfo.name[res.username] = res;
      return res;
    });
};

const getUser = (val, key = 'objectId') => {
  const e = {};
  e[key] = val;
  return query({
    table: '_User',
    e,
    single: true,
  });
};

const arrAdd = ({ table, id, key, arr }) => {
  get({ table, id })
    .then((res) => {
      res.add(key, arr);
      return res.save();
    });
};

const resetPassword = (data) => Bmob.updateUserPassword(Storage.get('uId'), data);

export default {
  set,
  get,
  create,
  query,
  del,
  queryOr,
  login,
  register: (info) => Bmob.User.register(info),
  user: () => Bmob.User.current(),
  getUser,
  arrAdd,
  resetPassword,
};
