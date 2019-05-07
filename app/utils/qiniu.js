import * as qiniu from 'qiniu-js';
import { QN_TOKEN as token } from "../const";
import md5 from 'js-md5';
import timer from './timer';

const putExtra = {
  fname: '',
  params: {},
  mimeType: null,
};

const config = {
  useCdnDomain: false,
  disableStatisticsReport: false,
  retryCount: 3,
};

const getFileName = (name = '') => {
  const a = name.split('.');
  const after = a[a.length - 1];
  const now = timer();
  return `${now.str('YYMMDD/HHmmss/')}${md5(now.time + (Math.random() * 1000) + '')}.${after}`;
};

export default (file, filename) => qiniu.upload(file, filename || getFileName(file.name), token, putExtra, config);
