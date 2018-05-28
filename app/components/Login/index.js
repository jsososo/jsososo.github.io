/**
*
* Login
*
*/

import React from 'react';
import { Input, Button, Icon, message } from 'antd';
import './index.scss';
import md5 from 'js-md5';
import PropTypes from 'prop-types';
// import styled from 'styled-components';


class Login extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);

    this.state = {
      create: false,
      username: '',
      password: '',
      rePassword: '',
    };
  }

  onInput(key, val) {
    const state = this.state;
    state[key] = val;
    this.setState(state);
  }

  onLogin() {
    const { username, password } = this.state;
    if (!username || !password) {
      message.warning('你有啥没写了');
    } else {
      this.props.login({ username, password });
    }
  }

  onCreate() {
    const { username, password, rePassword } = this.state;
    if (password !== rePassword) {
      message.warning('两个密码明明不一样的！');
    } else {
      this.props.create({ username, password });
    }
  }

  render() {
    const { create } = this.state;
    return (
      <div className="login-page">
        <div>
          <div className="input-label">用户名：</div>
          <Input onChange={(e) => this.onInput('username', e.target.value)} style={{ width: '300px' }} />
        </div>
        <div className="mt_20">
          <div className="input-label">密码：</div>
          <Input
            style={{ width: '300px' }}
            onChange={(e) => this.onInput('password', md5(e.target.value))}
            type="password"
            onPressEnter={() => !create && this.onLogin()}
          />
        </div>
        {
          !create &&
            <div className="mt_20">
              <div className="loss-password">密码丢了</div>
              <Button className="login-btn" onClick={() => this.setState({ create: true })}>注册</Button>
              <Button type="primary" onClick={() => this.onLogin()} className="login-btn">登录</Button>
            </div>
        }
        {
          create &&
            <div>
              <div className="mt_20">
                <div className="input-label">再来一次：</div>
                <Input
                  style={{ width: '300px' }}
                  onChange={(e) => this.onInput('rePassword', md5(e.target.value))}
                  type="password"
                  onPressEnter={() => create && this.onCreate()}
                />
              </div>
              <div className="mt_20">
                <div className="loss-password" onClick={() => this.setState({ create: false })}>
                  <Icon className="mr_20" type="arrow-left" />
                  我还是回去登录吧
                </div>
                <Button type="primary" className="login-btn pull-right" onClick={() => this.onCreate()}>注册</Button>
              </div>
            </div>
        }
      </div>
    );
  }
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
  create: PropTypes.func.isRequired,
};

export default Login;
