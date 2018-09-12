/**
 *
 * CashBook
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectCashBook from './selectors';
import { makeSelectUser } from "../App/selectors";
import reducer from './reducer';
import saga from './saga';

import CashBookCharts from '../../components/CashBookCharts';
import CashBookInput from '../../components/CashBookInput';

import timer from '../../utils/timer';
import arrayHelper from '../../utils/arrayHelper';
import Num, { Abs } from '../../utils/Num';
import { CASH_BOOK_DATA } from "../../utils/constants";
import * as Action from './actions';
import recentlyUsed from '../../utils/recentlyUsed';

import { DatePicker, Switch, Select, InputNumber, Button, Icon } from 'antd';
import {changeUrlQuery} from "../../utils/stringHelper";

let { allData } = CASH_BOOK_DATA;
const { RangePicker } = DatePicker;
const Option = Select.Option;

export class CashBook extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  componentWillMount() {
    if (this.props.user.username !== '游客') {
      recentlyUsed.set('账单统计', 'kit', this.props.user.username);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.cashbook.needFresh) {
      this.getChartsData(nextProps);
    }
  }

  // 处理数据
  handleData(data) {
    // 总金额
    let totalNum = 0;
    // 反转收支记录数组，时间从早到晚
    data['收支记录'] = data['收支记录'].reverse();
    data['收支记录'].forEach((r) => {
      if (!allData[r['时间']]) {
        allData[r['时间']] = {
          keys: ['收入', '支出', '盈余', '总额'],
          '收入': 0,
          '支出': 0,
          '盈余': 0,
          '总额': 0,
        };
      }
      const dayR = allData[r['时间']];
      const num = Num(r['金额'], 2);

      // 去掉特别大异常数据
      if (Abs(num) > 800000) {
        return;
      }

      // 去掉转账
      if (r['账目分类'] === '转账') {
        return;
      }

      // 当前日期下还没存过这个类目
      if (dayR.keys.indexOf(r['账目分类']) < 0) {
        dayR.keys.push(r['账目分类']);
        dayR[r['账目分类']] = num;
      } else { // 当前日期下已存在这个类目
        dayR[r['账目分类']] += num;
      }
      // 公共类型的每日统计
      if (num < 0) {
        dayR['支出'] += num;
      } else {
        dayR['收入'] += num;
      }
      dayR['盈余'] += num;
      totalNum += num;
      dayR['总额'] = totalNum;
    });
    this.getChartsData();
  }

  // 获取图表数据
  getChartsData(props = this.props) {
    const { showAllData, timeRange } = props.cashbook;
    let [start, end] = [timer(), timer()];
    const keys = Object.keys(allData);
    // 展示全部数据
    if (showAllData || !timeRange.length) {
      start = timer(keys[0], 'YYYY/MM/DD');
      end = timer(keys[keys.length - 1], 'YYYY/MM/DD');
    } else {
      start = timer(timeRange[0]._d);
      end = timer(timeRange[1]._d);
    }
    const [pieData, types] = this.getPieData(start, end);
    const lineData = this.getLineData(start, end, types, props);
    this.props.showCharts({
      pieData,
      lineData,
    });
  }

  componentWillUnmount() {
    this.props.resetData();
  }

  // 曲线图数据
  getLineData(start, end, types, props) {
    // 循环用
    let D = timer(start.time);
    // 下一个标点的时间
    let nD = timer(start.time);
    const xAxis = [];
    // 初始化返回的data数据
    const data = {};
    types.forEach((t) => {
      data[t] = {
        name: t,
        value: [],
      };
    });
    const { space, spaceType } = props.cashbook;
    // 临时对象，遍历每天时作临时存储数据
    let tempObj = {
      '总额': {
        name: '总额',
        value: 0,
      },
    };
    while (D.str('YYYYMMDD') !== end.str('YYYYMMDD')) {
      const r = allData[D.str('YYYY/MM/DD')] || {
        keys: [],
      };
      Object.keys(r).forEach((k) => {
        // 临时存储，到计数点再用
        if (k !== 'keys') {
          if (tempObj[k] && k !== '总额') {
            tempObj[k].value += r[k];
          } else {
            if (k === '总额') {
              tempObj[k].value = r[k] || tempObj[k].value;
            } else {
              tempObj[k] = {
                name: k,
                value: r[k],
              };
            }
          }
        }
      });
      if (D.time === nD.time) {
        xAxis.push(D.str('YY.M.D'));
        types.forEach((t) => {
          if (tempObj[t]) {
            if (t !== '总额' && t !== '盈余') {
              data[t].value.push(Abs(tempObj[t].value, 2));
            } else {
              data[t].value.push(Num(tempObj[t].value, 2));
            }
          } else {
            data[t].value.push(0);
          }
        });
        nD = nD.from(space, spaceType);
        tempObj = {
          '总额': {
            naem: '总额',
            value: tempObj['总额'].value,
          },
        };
      }
      D = D.from(1, 'D');
    }
    return {
      xAxis,
      types,
      data,
    };
  }

  // 饼图数据
  getPieData(start, end) {
    let D = timer(start.time);
    let types = [];
    const dataObj = {};
    // 循环累加
    while (D.str('YYYYMMDD') !== end.str('YYYYMMDD')) {
      const r = allData[D.str('YYYY/MM/DD')] || {
        keys: [],
      };
      // 合并种类，去重
      types = arrayHelper.delDuplicate(types, r.keys);
      Object.keys(r).forEach((item) => {
        if (['keys', '总额', '盈余'].indexOf(item) < 0) {
          if (dataObj[item]) {
            dataObj[item].value = Num(r[item] + dataObj[item].value, 2);
          } else {
            dataObj[item] = {
              name: item,
              value: Num(r[item], 2),
            };
          }
        }
      });
      D = D.from(1, 'D');
    }
    return [Object.values(dataObj), types];
  }

  changeOpts(v, type) {
    const {setTimeRange, setTimeType, setSpaceTime} = this.props;
    const func = [setTimeRange, setTimeType, setSpaceTime];
    func[type](v);
  }

  render() {
    const { cashbook, showAllData, resetData } = this.props;
    return (
      <div>
        <Helmet>
          <title>账本一览</title>
          <meta name="账本一览" content="个人用，仅限口袋记账" />
        </Helmet>
        { !cashbook.showInput &&
          <div>
            <a href="#/kit">
              <Icon type="arrow-left" className="pointer ft_20 mr_10 mt_5 vat" />
            </a>
            <span>展示全部：<Switch checked={cashbook.showAllData} onChange={() => showAllData()} /></span>
            <RangePicker className="ml_10 mr_10" disabled={cashbook.showAllData} onChange={(v) => this.changeOpts(v, 0)} />
            <span>
              时间间隔：
              <InputNumber className="w_100" value={cashbook.space} onChange={(v) => this.changeOpts(v, 2)} />
              <Select value={cashbook.spaceType} onChange={(v) => this.changeOpts(v, 1)}>
                <Option value="Y">年</Option>
                <Option value="M">月</Option>
                <Option value="D">天</Option>
              </Select>
            </span>
            <Button onClick={resetData} className="ml_10">重选文件</Button>

            <CashBookCharts
              pieData={cashbook.pieData}
              lineData={cashbook.lineData}
            />
          </div>
        }
        { cashbook.showInput && <CashBookInput getData={(v) => this.handleData(v)} /> }
      </div>
    );
  }
}

CashBook.propTypes = {
  cashbook: PropTypes.object.isRequired,
  showCharts: PropTypes.func.isRequired,
  setTimeRange: PropTypes.func.isRequired,
  showAllData: PropTypes.func.isRequired,
  setTimeType: PropTypes.func.isRequired,
  setSpaceTime: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  resetData: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  cashbook: makeSelectCashBook(),
  user: makeSelectUser(),
});

function mapDispatchToProps(dispatch) {
  return {
    showCharts: (d) => dispatch(Action.showCharts(d)),
    setTimeRange: (v) => dispatch(Action.setTimeRange(v)),
    showAllData: () => dispatch(Action.showAllData()),
    setTimeType: (v) => dispatch(Action.setTimeType(v)),
    setSpaceTime: (v) => dispatch(Action.setSpaceTime(v)),
    resetData: () => { allData = {}; dispatch(Action.resetData()); },
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'cashBook', reducer });
const withSaga = injectSaga({ key: 'cashBook', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(CashBook);
