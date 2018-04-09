
/*
* 从浏览器url的search里获取query值
*
* @params search: url的search（ 包括 '?' ）, 必填
*
* @params key: 想要筛选得到的值， 选填（如果未填，返回一个包含所有query信息的object）
*
* */

export function getQueryFromUrl(search, key) {
  try {
    const s = search.substring(1);
    const querys = s.split('&');
  } catch (err) {
    // 除去search为空等异常
    console.log(err);
    return {};
  }

}
