/**
*
* Aalist
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Button, Input, Icon, InputNumber, message } from 'antd';
import Back from '../Back';
import ArrayHelper from '../../utils/arrayHelper';
import { shortString } from '../../utils/stringHelper';

// import styled from 'styled-components';


class Aalist extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);

    this.state = {
      create: {
        show: false,
        users: ['', ''],
        usersCount: 2,
        title: '',
      },
    };
  }

  showCreateAA() {
    const { create } = this.state;
    create.show = true;
    this.setState({ create });
  }

  changeCount(n) {
    const { create } = this.state;
    create.usersCount = n;
    if (n < create.users.length) {
      create.users = create.users.slice(0, n);
    } else {
      create.users = [...(create.users), ...(new Array(n - create.users.length).fill(''))];
    }
    this.setState({
      create,
    });
  }

  changeUserName(val, i) {
    const { create } = this.state;
    create.users[i] = val.trim();

    this.setState({
      create,
    });
  }

  clearCreate() {
    this.setState({
      create: {
        show: false,
        users: ['', ''],
        usersCount: 2,
        title: '',
      },
    });
  }

  inputTitle(v) {
    const { create } = this.state;
    create.title = v;
    this.setState({
      create,
    });
  }

  createAA() {
    const { create } = this.state;
    const { createFun } = this.props;
    if (!create.title) {
      message.warning('还没有名字呢');
      return;
    }
    if (create.users.indexOf('') > -1) {
      message.warning('谁的名字忘写了');
      return;
    }
    if (ArrayHelper.delDuplicate(create.users).length < create.users.length) {
      message.warning('名字不能有重复的');
      return;
    }
    createFun(create.users, create.title);
    this.clearCreate();
  }

  delAA(id) {
    Modal.confirm({
      content: '确定不要了？',
      okText: '是的',
      cancelText: '先别',
      onOk: () => {
        this.props.delFun(id);
      },
    });
  }

  render() {
    const { list, user } = this.props;
    const { create } = this.state;
    return (
      <div>
        <div>
          <Back />
          <Button type="primary" onClick={() => this.showCreateAA()}>新建一个AA账单</Button>
        </div>
        {
          list.length === 0 ?
            <div className="mt_20 ml_10">空空如也</div> :
            <div className="aa-list">
              {list.map((t, i) => (
                <div key={`aa-list-${i}`} className="aa-list-item">
                  <a href={`#/kit/aa/?id=${t.objectId}`}>
                    <div className="aa-list-item-title" style={{ overflow: 'hidden' }}>{t.title}</div>
                  </a>
                  <div className="aa-list-item-user">
                    <span className="fc_999 pr_10">{shortString(t.users.join('、'), 12)}</span>
                    {t.users.length}个人的账本
                  </div>
                  {
                    t.userId === user.objectId &&
                    <div className="delete-btn" onClick={() => this.delAA(t.objectId)}>
                      <Icon type="delete" />
                    </div>
                  }
                </div>
              ))}
            </div>
        }
        <Modal
          visible={create.show}
          onCancel={() => this.clearCreate()}
          onOk={() => this.createAA()}
        >
          <div>
            <Input className="w_100" value={create.title} placeholder="起个名字" onChange={(e) => this.inputTitle(e.target.value)} />
            <span>
              要添加
              <InputNumber defaultValue={2} min={2} precision={0} onChange={(v) => this.changeCount(v)} />
              个人（添加完后不能修改）
            </span>
          </div>
          <div>
            {create.users.map((u, i) =>
              <Input key={`input-${i}`} className="mt_20" value={u} onChange={(e) => this.changeUserName(e.target.value, i)} />)
            }
          </div>
        </Modal>
      </div>
    );
  }
}

Aalist.propTypes = {
  list: PropTypes.array.isRequired,
  createFun: PropTypes.func.isRequired,
  delFun: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

export default Aalist;
