/**
*
* Avator
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'antd';
// import styled from 'styled-components';


class Avator extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { user } = this.props;
    return (
      <div
        className="header-avatar"
        style={user.avatar ? { background: 'none' } : {}}
      >
        <img src={user.avatar} className="header-avatar-img" />
        <div
          className="avatar-content"
          onClick={() => window.location = '#/user/info'}
        >
          {!user.login && <Icon style={{fontSize: '22px'}} type="user" />}
          {user.login && !user.avatar && (user.username && user.username.substring(0, 1))}
        </div>
        {
          user.login && (
            <div className="user-info-operation">
              <div className="content">
                <div><a className="user-link" href="#/user/info" >用户中心</a></div>
                <div><a className="user-link" href="#/user/notice">消息中心</a></div>
                <div className="user-link user-link-out" onClick={() => this.props.logOut()}>退出登录</div>
              </div>
            </div>
          )
        }
      </div>
    );
  }
}

Avator.propTypes = {
  user: PropTypes.object,
  logOut: PropTypes.func,
};

export default Avator;
