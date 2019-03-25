/**
*
* PiggyList
*
*/

import React from 'react';
import PropTypes from 'prop-types';

import timer from '../../utils/timer';
import { Abs } from '../../utils/num';
import moment from 'moment';

import ListItem from './ListItem';
import { Button, message, DatePicker, Icon, Modal, InputNumber, Select, Input } from 'antd';
import Back from '../Back';
const RangePicker = DatePicker.RangePicker;

// import styled from 'styled-components';

const emptyState = {
  newInfo: {
    title: '',
    startTime: timer().todayStart,
    endTime: timer().todayEnd + 31536000000,
    total: 1000,
    current: 0,
    type: 'W',
    record: {},
    log: [],
    average: 0,
  },
  showModal: false,
};

const typeMap = {
  W: 7,
  D: 1,
  M: 30,
};

class PiggyList extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);

    this.state = JSON.parse(JSON.stringify(emptyState));
  }

  checkVal() {
    const { newInfo } = this.state;
    if (!newInfo.title) {
      message.warning('名儿呢？');
      return;
    }
    newInfo.average = Abs(newInfo.total / Abs(timer(newInfo.startTime).to(timer(newInfo.endTime), 'num', 2) / typeMap[newInfo.type], 0, 1), 2);
    this.props.createFun(newInfo);
    this.closeModal();
  }

  closeModal() {
    this.setState(JSON.parse(JSON.stringify(emptyState)));
  }

  changeVal(v, k) {
    const { newInfo } = this.state;
    if (k !== 'time') {
      newInfo[k] = v;
    } else {
      newInfo.startTime = timer(v[0]).todayStart;
      newInfo.endTime = timer(v[1]).todayEnd;
    }
    this.setState({ newInfo });
  }

  delPiggy(id) {
    Modal.confirm({
      content: '永远抛弃了？',
      okText: 'dei',
      cancelText: 'no',
      onOk: () => {
        this.props.delFun(id);
      },
    });
  }

  render() {
    const { list } = this.props;
    const { newInfo, showModal } = this.state;
    const rangeVal = [moment(newInfo.startTime), moment(newInfo.endTime)];
    return (
      <div className="piggy-list-page">
        <div>
          <Back />
          <Button type="primary" onClick={() => this.setState({ showModal: true })}>新建一个存钱罐</Button>
        </div>
        <div className="piggy-list-container pd_20">
          {
            list.length === 0 ?
              <div>啥也没有，破罐子破摔</div> :
              list.map((p, i) => <ListItem key={`piggy-item-${i}`} delPiggy={() => this.delPiggy(p.objectId)} item={p} />)
          }
        </div>
        <Modal
          okText="定了"
          cancelText="罢了"
          onCancel={() => this.closeModal()}
          visible={showModal}
          onOk={() => this.checkVal()}
        >
          <div style={{ minWidth: '500px' }}>
            <div className="mt_10">
              <Input
                className="w_200 mr_20"
                placeholder="起个名儿"
                value={newInfo.title}
                onChange={(e) => this.changeVal(e.target.value, 'title')}
              />
              目标是：¥
              <InputNumber className="w_150" min={1} precision={2} value={newInfo.total} onChange={(v) => this.changeVal(v, 'total')} />
            </div>
            <div className="mt_15">
              <RangePicker disabledDate={(m) => timer(m).str('YYYYMMDD') < timer().str('YYYYMMDD')} allowClear={false} value={rangeVal} className="mr_20" onChange={(v) => this.changeVal(v, 'time')} />
              每
              <Select style={{ minWidth: '50px' }} value={newInfo.type} onChange={(v) => this.changeVal(v, 'type')}>
                <Select.Option value="D">天</Select.Option>
                <Select.Option value="W">周</Select.Option>
                <Select.Option value="M">月</Select.Option>
              </Select>存
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

PiggyList.propTypes = {
  list: PropTypes.array.isRequired,
  createFun: PropTypes.func.isRequired,
  delFun: PropTypes.func.isRequired,
};

export default PiggyList;
