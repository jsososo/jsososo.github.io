/**
*
* Aadetail
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import Record from './Record';

import timer from '../../utils/timer';
import Num from '../../utils/Num';
import { Icon, Modal, Input, Button, Tag } from 'antd';
import { getUserInfo } from "../../utils/constants";
import Storage from '../../utils/Storage';

// import styled from 'styled-components';


class Aadetail extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      searchUser: '',
      findUser: null,
      userList: [],
    };
  }

  componentWillMount() {
    this.props.getDetail();
  }

  componentWillReceiveProps(props) {
    const { detail, user } = props;
    const userList = [];
    // 清一下
    this.setState({ userList });
    // 除去创建者自己，获取其他用户数据
    (detail.userIds || []).forEach((id) => {
      if (id !== user.objectId) {
        getUserInfo(id, (v) => {
          userList.push(v);
          this.setState({ userList });
        });
      }
    });
  }

  transferRecord(u1, u2, num) {
    const { detail, updateFun } = this.props;
    updateFun(null, true, detail.users.indexOf(u1), {
      time: timer().time,
      desc: `收到${u2}的转账`,
      num,
    });
  }

  findUser() {
    Storage.queryBmob(
      '_User',
      (q) => {
        q.equalTo('username', this.state.searchUser);
        return q;
      },
      (findUser) => this.setState({ findUser }),
    );
  }

  // 添加或删除可以编辑这个aa列表的用户
  handleUser(id, isAdd) {
    const { detail, updateFun } = this.props;
    let { userIds } = detail;
    if (isAdd) {
      userIds.push(id);
    } else {
      userIds = userIds.filter((item) => item !== id);
    }
    detail.userIds = userIds;
    this.setState({ searchUser: '', findUser: null });
    updateFun(detail);
  }

  renderBalance() {
    const { detail } = this.props;
    const info = detail.info || [];
    let av = 0;
    const result = [];
    const costArr = info.map((item) => {
      let c = 0;
      item.list.forEach((a) => !a.del && (c += a.num));
      c = Num(c, 2);
      return {
        cost: c,
        name: item.name,
      };
    });
    costArr.sort((a, b) => (a.cost - b.cost));
    costArr.forEach((item) => {
      av += item.cost;
    });
    av = Num(av / costArr.length, 2);
    let i = 0;
    let j = costArr.length - 1;
    while (costArr[i] && i !== j) {
      const pay = Num(av - costArr[i].cost, 2);
      if (pay !== 0) {
        result.push(`${costArr[i].name}要给${costArr[j].name}¥${pay}`);
      }
      if (costArr[j].cost - av > pay) {
        costArr[j].cost -= pay;
        i += 1;
      } else {
        costArr[i].cost += pay;
        j -= 1;
      }
    }
    return result.join('，');
  }

  renderUser(u, isAdd) {
    const { detail } = this.props;
    const a = Number(isAdd);
    return (
      <div key={`${detail.objectId}-${a}-${Math.random()}`} className="mt_15 inline-block pd_10 mr_20" style={{ border: '1px solid #ccc', borderRadius: '5px', minHeight: '30px', minWidth: '100px' }}>
        <img style={{ width: '40px', height: '40px', borderRadius: '100%', border: '1px solid #666' }} src={u.avatar} />
        <span className="pl_10">{u.username}</span>
        { (!a || (a && detail.userIds.indexOf(u.objectId) === -1)) &&
        <span className={`fc_${['red', 'blue'][a]} pointer pl_20`} onClick={() => this.handleUser(u.objectId, a)}>{['删除', '添加'][a]}</span> }
      </div>
    );
  }

  render() {
    const { detail, user, updateFun } = this.props;
    const { showModal, searchUser, userList, findUser } = this.state;
    return (
      <div className="aa-detail">
        <a href="#/kit/aa">
          <Icon type="arrow-left" className="pointer ft_20 mr_20 mt_5 vat" />
        </a>
        <h2 className="title fc_666 inline-block">{detail.title}</h2>
        {
          user.objectId === detail.userId &&
          <Icon type="setting" className="ml_20 ft_20 pointer" onClick={() => this.setState({ showModal: true })} />
        }
        <div className="balance-content mt_20 ml_20 ft_16">{this.renderBalance()}</div>
        <div className="record-container">
          {
            detail.info && detail.info.map((record, i) =>
              <Record
                users={detail.users}
                updateFun={(t, v) => updateFun(null, t, i, v)}
                total={detail.info.length}
                key={`record-${i}`}
                info={record}
                transferFun={(u1, u2, num) => this.transferRecord(u1, u2, num)}
              />)
          }
        </div>
        <Modal
          visible={showModal}
          footer={null}
          onCancel={() => this.setState({ searchUser: '', showModal: false, findUser: null })}
        >
          <div className="pt_20" style={{ minHeight: '120px', width: '620px' }}>
            <div>
              <Input className="w_200" value={searchUser} onChange={(e) => this.setState({ searchUser: e.target.value })} />
              <Button type="primary" onClick={() => this.findUser()}>找！</Button>
            </div>
            { findUser && this.renderUser(findUser, true)}
            <div className="mt_20 pl_5">
              {userList.map((u) => this.renderUser(u, false))}
              {userList.length === 0 && '空空如也，可以通过搜索添加用户哟'}
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

Aadetail.propTypes = {
  getDetail: PropTypes.func.isRequired,
  detail: PropTypes.object.isRequired,
  updateFun: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

export default Aadetail;
