import { Bmob } from './bmob';
const localStorage = window.localStorage;

const saveBmob = (obj, cb, errCb) => {
  obj.save(null, {
    success: (res) => cb && cb(res),
    error: (err) => errCb && errCb(err),
  });
};

const setBmobValue = (bmob, obj) => {
  Object.keys(obj).forEach((key) => {
    bmob.set(key, obj[key]);
  });
  return bmob;
};

const getQueryBmob = (table, func) => {
  const Table = Bmob.Object.extend(table);
  const Query = new Bmob.Query(Table);
  return func ? func(Query) : Query;
};

const Storage = {
  // 获取localStorage
  get: (key, toObj = false, d = '') => {
    let result = localStorage.getItem(key) || d;

    if (toObj) {
      result = JSON.parse(result);
    }

    return result;
  },

  // 设置localStorage
  set: (key, value, toStr = false) => {
    let v = value;
    if (toStr) {
      v = JSON.stringify(v);
    }
    localStorage.setItem(key, v);
  },

  // 获取Bmob数据
  getBmob(table, id, key, cb = (v) => v, errCb) {
    const Obj = Bmob.Object.extend(table);
    const query = new Bmob.Query(Obj);
    query.get(id, {
      success: (res) => key ? cb(res[key]) : cb(res),
      error: (err) => errCb && errCb(err),
    });
  },

  // 修改Bomb数据
  setBmob(table, id, value, cb, errCb) {
    const setFunc = (res) => {
      saveBmob(setBmobValue(res, value), cb, errCb);
    };
    this.getBmob(table, id, null, setFunc, errCb);
  },

  // 创建Bmob数据
  createBmob(table, value, cb, errCb) {
    const Obj = Bmob.Object.extend(table);
    const obj = new Obj();
    saveBmob(setBmobValue(obj, value), cb, errCb);
  },

  // 删除一行数据
  delBmob(table, id, cb, errCb) {
    const delFunc = (res) => {
      res.destroy({
        success: (r) => cb && cb(r),
        error: (err) => errCb && errCb(err),
      });
    };
    this.getBmob(table, id, null, delFunc, errCb);
  },

  /*
  *  @params: table 表
  *  @params: fun   查询条件
  *  @params: type  查询方式：（first, find, count）
  * */
  queryBmob(table, fun, cb, errCb, type = 'first') {
    const query = getQueryBmob(table, fun);
    query[type]({
      success: (res) => cb && cb(res),
      error: (err) => errCb && errCb(err),
    });
  },
};

export default Storage;
