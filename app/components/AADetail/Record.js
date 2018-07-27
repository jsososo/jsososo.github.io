import React from 'react';
import PropTypes from 'prop-types';
import { Input, message, Icon, Modal, Select } from 'antd';
import timer from '../../utils/timer';

class Record extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      newInfo: {
        desc: '',
        num: '',
      },
      totalCost: 0,
    };
  }

  componentWillMount() {
    this.getTotalCost(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.getTotalCost(nextProps);
  }

  getTotalCost(props) {
    const { info } = props;
    let totalCost = 0;
    info.list.forEach((r) => {
      totalCost += r.num;
    });
    this.setState({
      totalCost,
    });
  }

  inputNew(v, k) {
    const { newInfo } = this.state;
    newInfo[k] = v;
    this.setState({
      newInfo,
    });
  }

  addRecord(transfer) {
    const { newInfo, totalCost } = this.state;
    const { info, transferFun } = this.props;
    let num = newInfo.num;
    let desc = newInfo.desc;
    if (!newInfo.desc) {
      message.warning('么有描述');
      return;
    }
    if (!newInfo.num) {
      message.warning('么有金额');
      return;
    }
    if (isNaN(Number(num))) {
      try {
        num = eval(num);
        newInfo.desc += `【${newInfo.num}】`;
      } catch (err) {
        message.warning('金额你写的啥呀');
        return;
      }
    } else {
      num = Number(num);
    }
    if (transfer) {
      transferFun(newInfo.desc, info.name, -num);
      desc = `转账给${newInfo.desc}`;
    }
    num = Math.round(num * 100) / 100;
    info.list.unshift({
      time: timer().time,
      desc,
      num,
    });
    this.setState({
      newInfo: {
        desc: '',
        num: '',
      },
      totalCost: totalCost + num,
    });
    this.props.updateFun(info.list);
  }

  delRecord(t, num) {
    const { info } = this.props;
    const { totalCost } = this.state;
    Modal.confirm({
      content: '不要了？',
      okText: '嗯',
      cancelText: '没',
      onOk: () => {
        info.list = info.list.filter((r) => r.time !== t);
        this.props.updateFun(info.list);
        this.setState({
          totalCost: totalCost - num,
        });
      },
    });
  }

  transfer() {
    const { users, info } = this.props;
    const defaultUser = users.find(u => u !== info.name);
    this.inputNew(defaultUser, 'desc');
    Modal.confirm({
      iconType: 'null',
      content: (
        <div>
          转账给
          <Select className="w_100" defaultValue={defaultUser} onChange={(v) => this.inputNew(v, 'desc')}>
            {
              users.map((item) =>
                item !== info.name && <Select.Option key={item} value={item}>{item}</Select.Option>)
            }
          </Select>
          <Input className="w_100" onChange={(e) => this.inputNew(e.target.value, 'num')} />
        </div>
      ),
      onOk: () => {
        this.addRecord(true);
      },
      onCancel: () => {
        this.setState({
          newInfo: {
            desc: '',
            num: '',
          },
        });
      },
    });
  }

  render() {
    const { info, total } = this.props;
    const { totalCost, newInfo } = this.state;
    return (
      <div className="record-item" style={{ width: `${100 / total}%` }}>
        <div className="record-name">
          {info.name}
          <span className="transfer-btn" onClick={() => this.transfer()}>转账</span>
        </div>
        <div className="record-total">
          <div className="record-left">总计：</div>
          <div className="record-right">{totalCost}</div>
        </div>
        <hr/>
        <div className="record-list">
          <div className="record-detail">
            <div className="record-left">
              <Input
                value={newInfo.desc}
                onChange={(e) => this.inputNew(e.target.value, 'desc')}
                onPressEnter={() => this.addRecord()}
              />
            </div>
            <div className="record-right">
              <Input
                value={newInfo.num}
                onChange={(e) => this.inputNew(e.target.value, 'num')}
                onPressEnter={() => this.addRecord()}
              />
            </div>
          </div>
          {
            info.list.map((r) => (
              <div className="record-detail" key={`${r.time}`}>
                <div className="record-left">
                  <Icon type="delete" className="del-btn" onClick={() => this.delRecord(r.time, r.num)} />{r.desc}
                </div>
                <div className="record-right">{r.num}</div>
              </div>
            ))
          }
        </div>
      </div>
    );
  }
}

Record.propTypes = {
  info: PropTypes.object.isRequired,
  total: PropTypes.number.isRequired,
  updateFun: PropTypes.func.isRequired,
  users: PropTypes.array.isRequired,
  transferFun: PropTypes.func.isRequired,
}

export default Record;
