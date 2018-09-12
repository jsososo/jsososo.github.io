/**
 * Created by Feil(admin@feil.wang) on 2017/12/18.
 */
let baseRcServer = function (url, method, apiName) {
  return {
    server: 'rc',
    url,
    params: {
      method,
      apiName,
    },
  };
};

export default {
};
