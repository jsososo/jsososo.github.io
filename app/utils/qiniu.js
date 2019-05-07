import * as qiniu from 'qiniu-js';
import { QN_TOKEN as token } from "../const";

const putExtra = {
  fname: '',
  params: {},
  mimeType: null,
};

var config = {
  useCdnDomain: false,
  disableStatisticsReport: false,
  retryCount: 3,
};

export default (file) => qiniu.upload(file, file.name, token, putExtra, config);
