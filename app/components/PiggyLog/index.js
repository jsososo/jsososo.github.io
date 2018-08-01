/**
*
* PiggyLog
*
*/

import React from 'react';
import PropTypes from 'prop-types';

import timer from '../../utils/timer';

import { Tabs, Table, Icon } from 'antd';
import Calendar from './Calendar';
import LineChart from '../LineChart';
import Num from '../../utils/num';
// import styled from 'styled-components';

// 获取存在record上的key值
const getTimeKey = (date, type) => {
  if (type === 'W') {
    return date.week();
  }
  if (type === 'D') {
    return date.str('YYYYMMDD');
  }
  return date.str('YYYYMM');
};

// 获取下一个时间对象
const getNextDate = (date, type) => {
  if (type === 'W') {
    return date.from(7, 'D');
  }
  if (type === 'D') {
    return date.from(1, 'D');
  }
  return date.from(1, 'M');
};

// 翻译record上的key值
const getTimeName = (str) => {
  if (str.length === 6) {
    return `${str.substr(2, 2)}年${Number(str.substr(4, 2))}月`;
  } else if (str.length === 7) {
    return `${str.substr(2, 2)}年${Number(str.substr(4, 2))}月第${str.substr(6, 1)}周`;
  }
  return `${str.substr(2, 2)}年${Number(str.substr(4, 2))}月${Number(str.substr(6, 2))}号`;
};

class PiggyLog extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  // 日志表格
  getColumns() {
    return [
      {
        key: 'time',
        dataIndex: 'key',
        title: '时间',
        render: (v) => timer(v).str('YYYY-MM-DD HH:mm:ss'),
      },
      {
        key: 'num',
        dataIndex: 'num',
        title: '金额',
      },
      {
        key: 'operation',
        title: '操作',
        width: '100',
        render: (v) => <Icon type="delete" className="del-btn" onClick={() => this.delLog(v)} />,
      },
    ];
  }

  // 获取图表的数据，isTotal表示是否为统计图
  getLineChartData(isTotal = false) {
    const { detail } = this.props;
    let date = timer(detail.startTime);
    const endTime = timer(detail.endTime);
    const lineData = {
      plan: {
        name: '计划',
        value: [],
      },
      reality: {
        name: '现实',
        value: [],
      },
    };
    const xAxis = [];
    const pV = lineData.plan.value;
    const rV = lineData.reality.value;
    // 循环
    do {
      const recordValue = detail.record[getTimeKey(date, detail.type)] || 0;
      if (isTotal) {
        // 累计图
        pV.push(Num((pV[pV.length - 1] || 0) + detail.average, 2));
        rV.push(Num((rV[rV.length - 1] || 0) + recordValue, 2));
      } else {
        // 每月图
        pV.push(detail.average);
        rV.push(recordValue);
      }
      // x周数据
      xAxis.push(getTimeName(getTimeKey(date, detail.type)));
      date = getNextDate(date, detail.type);
    } while (endTime.time > date.time);

    return {
      data: lineData,
      xAxis,
    };
  }

  // 删掉日志
  delLog(v) {
    const { detail, updateFun } = this.props;
    const date = timer(v.key);
    let key = '';
    if (detail.type === 'W') {
      key = date.week();
    } else if (detail.type === 'D') {
      key = date.str('YYYYMMDD');
    } else {
      key = date.str('YYYYMM');
    }
    detail.record[key] -= v.num;
    detail.log = detail.log.filter((r) => r.key !== v.key);
    detail.current -= v.num;
    updateFun(detail);
  }

  render() {
    const { detail } = this.props;
    return (
      <Tabs defaultKey={1}>
        <Tabs.TabPane tab="日历" key={2}>
          <Calendar detail={detail} />
        </Tabs.TabPane>
        <Tabs.TabPane tab="日志" key={1}>
          <Table dataSource={detail.log} columns={this.getColumns()} />
        </Tabs.TabPane>
        <Tabs.TabPane tab="累计图表" key={3}>
          <LineChart {...this.getLineChartData(true)} />
        </Tabs.TabPane>
        <Tabs.TabPane tab="每日图表" key={4}>
          <LineChart {...this.getLineChartData(false)} />
        </Tabs.TabPane>
      </Tabs>
    );
  }
}

PiggyLog.propTypes = {
  updateFun: PropTypes.func.isRequired,
  detail: PropTypes.object.isRequired,
};

export default PiggyLog;
