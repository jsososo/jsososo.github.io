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
      return key ? undefined : {};
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

  const newQuery = { ...query, ...obj };
  const queryArr = [];
  Object.keys(newQuery).forEach((key) => {
    if (newQuery[key] !== undefined && newQuery[key] !== '') {
      queryArr.push(`${key}=${newQuery[key]}`);
    }
  });
  window.location = queryArr.length > 0 ? `${url}?${queryArr.join('&')}` : url;
}

/*
* 将长的字符串切割成短的，以 ...结尾
* */
export function shortString(str, length = 20) {
  return str.length > length ? `${str.substr(0, length - 3)}...` : str;
}

export function markdown(str) {
  let result = str;
  // marked插件里有一些不足，这里自己改造一下
  result = replaceTextForMarkdown(str);
  return marked(result);
}

function replaceTextForMarkdown(str) {
  let result = str;

  const replace = [];
  const colors = ['red', 'orange', 'blue'];
  colors.forEach((item) => {
    replace.unshift({
      reg: new RegExp(`#(${item}) (.+) ${item}#`, 'g'),
      fun: (s) => {
        const reg = new RegExp(`#(${item}) (.+) ${item}#`);
        const cMatch = s.match(reg);
        if (cMatch) {
          return `<span class="fc_${cMatch[1]}">${cMatch[2]}</span>`;
        }
        return s;
      },
    });
  });
  replace.forEach((item) => {
    result = result.replace(item.reg, item.fun);
  });
  return result;
}


/*
* 将一个字符串中的url都转换成链接
* */
export function urlToLink(str = '') {
  const arr = str.match(/(((http(s?):\/\/)|www)[^\s\t\r\n]+)/g);
  if (!arr) {
    return str;
  }
  let result = str;
  arr.forEach((val) => result = result.replace(val, `<a target="_blank" href="${val.replace(/^www/, 'http://www')}">${val}</a>`));
  return result;
}

/*
*  字符串的公式计算
* */
export function stringCalculate(str, toFixed, errReturn) {
  try {
    if (!str) {
      throw({ err: 'empty' });
    }
    const num = Number(eval(str));

    if (typeof num !== 'number') {
      throw({ err: 'not number' });
    }

    if (isNaN(num)) {
      throw({ err: 'NaN' });
    }

    if (toFixed !== undefined) {
      return num.toFixed(toFixed);
    }

    return num;
  } catch (err) {
    return errReturn;
  }
}
