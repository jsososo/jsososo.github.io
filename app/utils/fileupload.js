/**
 * Created by shikuan on 2018/1/16.
 */
import 'whatwg-fetch';
import apiList from '../api/apiList';

/**
 * Parses the JSON returned by a network request
 *
 * @param  {object} response A response from a network request
 *
 * @return {object}          The parsed JSON from the request
 */
function parseJSON(response) {
  if (response.status === 204 || response.status === 205) {
    return null;
  }
  return response.json();
}

/**
 * Checks if a network request came back fine, and throws an error if not
 *
 * @param  {object} response   A response from a network request
 *
 * @return {object|undefined} Returns either the response, or throws an error
 */
function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

/**
 *
 * 将数据格式转化成一个以&拼接的URL格式
 * @param {Object} data    需要插入的查询内容，如果是多维将压缩成一维
 * @param {Boolean} notEncode 是否会需要编码，默认编码
 */
let dataToQuerystr = (data, notEncode = false) => {
  let i, it, query = data || {}, str = [],
    funcFilter = notEncode ? function (it) {
      // 第二层必须被编码
      return typeof it === 'object' ? encodeURIComponent(JSON.stringify(it)) : it;
    } : function (it) {
      return encodeURIComponent(typeof it === 'object' ? (JSON.stringify(it)) : it);
    };
  for (i in query) {
    it = query[i];
    str.push(i + '=' + funcFilter(it));
  }
  return str.join('&');
};

/**
 * api 的请求
 * @param api {string}          api名字
 * @param apiObject {object}    api对象
 * @param params {object}       传递的参数
 */
let apiCall = (api, apiObject, params) => {
  const option ={
    method:'post',
    mode:'cors',
    // headers: {
    //   'Content-Type': 'multipart/form-data'
    // },
    credentials:"same-origin",
    body:params
  };
  return fetchCall(apiObject.url,option);
};

/**
 * fetchCall
 * @param options {object}        请求参数
 * @returns {Promise<Response>}   返回Promise对象
 */
let fetchCall = (url,options) => fetch(url, options)
  .then(checkStatus)
  .then(parseJSON)
  .then(json => {
    debugger
    if (json && json.success) { //只有result为1xx的结果才算成功
      return json;
    } else {
      if(json.code=="login.timeout"){
        window.location.href="//f.superboss.cc/static/newNoSession.html#"
      }
      throw json;
    }
  }).catch(err => {
    throw err;
  });

/**
 * Requests a Object, returning a promise
 * @param options {object}
 */
export default function fileUpdload(api,options) {
  let apio = apiList[api];
  return apiCall(options.api, apio, options);
}
