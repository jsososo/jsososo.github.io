import marked from 'marked';

/*
* 从浏览器url的search里获取query值
*
* @params search: url的search（ 包括 '?' ）, 必填
* @params key: 想要筛选得到的值， 选填（如果未填，返回一个包含所有query信息的object）
*
* */
export function getQueryFromUrl(key, search = window.location.hash) {
  try {
    const sArr = search.split('?');
    let s = '';
    if (sArr.length > 1) {
      s = sArr[1];
    } else {
      s = sArr[0] || '';
    }
    const querys = s.split('&');
    const result = {};
    querys.forEach((item) => {
      const temp = item.split('=');
      result[temp[0]] = decodeURI(temp[1]);
    });
    return key ? result[key] : result;
  } catch (err) {
    // 除去search为空等异常
    console.log(err);
    return key ? '' : {};
  }
}

export function changeUrlQuery(obj) {
  const query = getQueryFromUrl();
  const url = window.location.hash.split('?')[0];

  const newQuery = {...query, ...obj};
  let queryStr = '';
  Object.keys(newQuery).forEach((key) => {
    queryStr += `&${key}=${newQuery[key]}`;
  });
  window.location = `${url}?${queryStr.substr(1)}`;
}

/*
* 将长的字符串切割成短的，以 ...结尾
* */
export function shortString(str, length = 20) {
  return str.length > length ? `${str.substr(0, length - 3)}...` : str;
}

export function markdown(str) {
  let result = str;
  // marked插件没有对连续的回车做换行，这里手动改一改
  result = result.replace(/\n+/g, (s) => {
    if (s.split('\n').length > 2) {
      const rs = new Array(s.split('\n').length - 2);
      rs.fill('<br/>');
      // marked插件的有一个问题，## 在连续<br/>后面不起作用，需要放一个 \t 进来
      rs.push('\t');
      return rs.join('');
    }
    return s;
  });
  return marked(result);
}
