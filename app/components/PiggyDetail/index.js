/**
*
* PiggyDetail
*
*/

import React from 'react';
import PropTypes from 'prop-types';

import timer from '../../utils/timer';
import Num, { Abs } from '../../utils/num';
import { Icon, message, InputNumber, Button, Select } from 'antd';
import PiggyLog from '../PiggyLog/Loadable';
// import styled from 'styled-components';


const typeMap = {
  W: '周',
  D: '天',
  M: '月',
};
const typeNumMap = {
  W: 7,
  D: 1,
  M: 30,
};
const typeTimeMap = {
  D: 'YYYYMMDD',
  M: 'YYYYMM',
};
class PiggyDetail extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);

    this.state = {
      opType: 1,
      opNum: 0,
    };
  }

  componentWillMount() {
    this.props.getDetail();
  }

  checkVal() {
    const { opNum, opType } = this.state;
    const { detail, updateFun } = this.props;
    if (!opNum) {
      message.warning('0元凑什么热闹');
      return;
    }

    const num = opNum * opType;
    detail.current += num;
    // 日志记录，可删除
    detail.log.push({
      key: timer().time,
      num,
    });
    // 按照类型的金额记录，方便展示
    if (detail.type === 'W') {
      const week = timer().week();
      if (!detail.record[week]) {
        detail.record[week] = 0;
      }
      detail.record[week] += num;
    } else {
      const key = timer().str(typeTimeMap[detail.type]);
      if (!detail.record[key]) {
        detail.record[key] = 0;
      }
      detail.record[key] += num;
    }
    this.setState({
      opNum: 0,
    });
    updateFun(detail);
  }

  getNowRecord(isNeed = false) {
    const { detail } = this.props;
    const date = timer();
    let type = '';
    if (detail.type === 'W') {
      type = date.week();
    } else {
      type = date.str(typeTimeMap[detail.type]);
    }
    return isNeed ? Num((detail.average - (detail.record[type] || 0)), 2) : (detail.record[type] || 0);
  }

  render() {
    const { detail, updateFun } = this.props;
    const { opType, opNum } = this.state;
    let timeProgress = Num(((timer().time - detail.startTime) / (detail.endTime - detail.startTime)) * 100, 2);
    timeProgress = timeProgress > 100 ? 100 : (timeProgress < 0 ? 0 : timeProgress);
    const numProgress = Num((detail.current / detail.total) * 100, 2);

    return (
      <div className="piggy-detail-page">
        <div>
          <a href="#/kit/piggy">
            <Icon type="arrow-left" className="pointer ft_20 mr_20 mt_5 vat" />
          </a>
          <div className="inline-block piggy-title">{detail.title}</div>
          <div>
            <div className="page-left">
              {/* 时间进度 */}
              <div className="progress-container">
                <div className="piggy-progress">
                  <div className="piggy-item-background">
                    <div className="p-bg-green" style={{ width: `${timeProgress}%` }} />
                    <div className="p-bg-white" />
                  </div>
                  <div className="text-center">{timeProgress}%</div>
                  <div className="pull-left">{timer(detail.startTime).str()}</div>
                  <div className="pull-right">{timer(detail.endTime).str()}</div>
                </div>
                {/* 存钱进度 */}
                <div className="piggy-progress">
                  <div className="piggy-item-background">
                    <div className="p-bg-green" style={{ width: `${numProgress > 0 ? numProgress : 0}%` }} />
                    <div className="p-bg-white" />
                  </div>
                  <div className="text-center">{numProgress}%</div>
                  <div className="pull-left">¥{Num(detail.current, 2)}</div>
                  <div className="pull-right">¥{Num(detail.total, 2)}</div>
                </div>
              </div>
              {/* 一些数字展示 */}
              <div className="ft_16 ml_20 mb_10">
                <span>计划每{typeMap[detail.type]}存</span>
                <span className="fc_blue">¥{detail.average}</span>，
                <span>现在每{typeMap[detail.type]}还要存</span>
                <span className="fc_red">
                  ¥{Abs(((detail.total - detail.current) / Abs(timer().to(timer(detail.endTime), 'num', 2) / typeNumMap[detail.type], 0, 1)), 2)}
                </span>
              </div>
              <div className="ft_16 ml_20 mb_20">
                <span>现在已存</span>
                <span className="fc_blue">¥{this.getNowRecord()}</span>，
                {
                  this.getNowRecord(true) > 0 ?
                    <span>
                      <span>还差</span>
                      <span className="fc_red">
                      ¥{this.getNowRecord(true)}
                      </span>
                    </span> :
                    <span>这{typeMap[detail.type]}够了</span>
                }
              </div>
              {/* 操作 */}
              <div className="operation-container ml_20">
                <Select className="mr_10" value={opType} onChange={(v) => this.setState({ opType: v })}>
                  <Select.Option value={1}>存入</Select.Option>
                  <Select.Option value={-1}>取出</Select.Option>
                </Select>
                ¥
                <InputNumber className="w_150 ml_5" min={0} precision={2} value={opNum} onChange={(v) => this.setState({ opNum: v })} />
                <Button onClick={() => this.checkVal()} className="ml_20" type={opType > 0 ? 'primary' : 'danger'}>Done !</Button>
              </div>
            </div>
            <div className="page-right">
              <PiggyLog detail={detail} updateFun={updateFun} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

PiggyDetail.propTypes = {
  getDetail: PropTypes.func.isRequired,
  detail: PropTypes.object.isRequired,
  updateFun: PropTypes.func.isRequired,
};

export default PiggyDetail;
