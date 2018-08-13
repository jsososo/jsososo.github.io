/**
*
* UserInfo
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import { Tabs } from 'antd';
import Info from './info';
import NoticeCenter from './NoticeCenter';
import './index.scss';
// import styled from 'styled-components';


class UserInfo extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);

    this.state = {
      current: window.location.hash.indexOf('info') > 0 ? 'info' : 'notice',
    };
  }

  changeUrl(key) {
    window.location = `#/user/${key}`;
    this.setState({
      current: key,
    });
  }

  render() {
    const { user, changePassword } = this.props;
    const { current } = this.state;
    return (
      <div>
        <Tabs
          activeKey={current}
          tabPosition="left"
          onChange={(key) => this.changeUrl(key)}
        >
          <Tabs.TabPane
            tab="个人信息"
            key="info"
          >
            <Info user={user} changePassword={changePassword} />
          </Tabs.TabPane>
          <Tabs.TabPane
            tab="消息中心"
            key="notice"
          >
            <NoticeCenter user={user} />
          </Tabs.TabPane>
        </Tabs>
      </div>
    );
  }
}

UserInfo.propTypes = {
  user: PropTypes.object,
  changePassword: PropTypes.func,
};

export default UserInfo;
