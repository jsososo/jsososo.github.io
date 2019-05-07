import Bmob from 'hydrogen-js-sdk';

const create = ({ table, obj }) => {
  const query = Bmob.Query(table);
  return set({ q: query, obj });
};

const set = ({ q, obj }) => {
  delete obj.createdAt;
  delete obj.updatedAt;
  delete obj.objectId;
  Object.keys(obj).forEach((k) => q.set(k, obj[k]));
  return q.save();
};
/*
*  @e, b, s, n, be, se: equalTo 方法支持的比较
*
* */
const query = async (param) => {
  const { select, table, count, pageNo, pageSize, order } = param;
  let result = {};
  const q = Bmob.Query(table);
  const eMap = {
    e: '==',
    b: '>',
    s: '<',
    n: '!=',
    be: '>=',
    se: '<=',
  };
  Object.keys(eMap).forEach((k) => {
    if (param[k]) {
      queryObj(q, param[k], eMap[k]);
    }
  });
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
  return result;
};

const get = (param) => {
  const { table, id } = param;
  const q = Bmob.Query(table);
  return q.get(id);
}

const queryObj = (q, obj, type) => {
  Object.keys(obj).forEach((k) => {
    q.equalTo(k, type, obj[k]);
  });
};

export default {
  set,
  get,
  create,
  query,
};
