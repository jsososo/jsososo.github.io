/**
 *
 * User
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
import { makeSelectUser } from "../App/selectors";
import reducer from './reducer';
import saga from './saga';

import Login from '../../components/Login';
import UserInfo from '../../components/UserInfo';

import { getUserInfo } from "../App/actions";

import Storage from '../../utils/Storage';
import { message } from 'antd';

export class User extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  login(user) {
    Storage.queryBmob(
      '_User',
      (q) => {
        q.equalTo('username', user.username);
        q.equalTo('password', user.password);
        return q;
      },
      (res) => {
        if (res) {
          const userObj = res.attributes;
          userObj.login = Boolean(res);
          this.props.login(userObj);
          Storage.set('user', `${user.username}-${user.password.split('').reverse().join('')}`)
          window.location = '#/';
        } else {
          message.error('账号密码错误！');
        }
      },
    );
  }

  create(user) {
    Storage.queryBmob(
      '_User',
      (q) => {
        q.equalTo('username', user.username);
        return q;
      },
      (res) => {
        if (res) {
          message.error('你的名字被抢了');
        } else {
          Storage.createBmob(
            '_User',
            user,
            () => {
              message.success('注册成功，马上跑路');
              setTimeout(() => {
                this.login(user);
              }, 2000);
            },
            () => {
              message.error('失败了，可能再试一次就成功了');
            }
          );
        }
      }
    );
  }

  render() {
    const { user } = this.props;
    return (
      <div>
        <Helmet>
          <title>个人中心</title>
          <meta name="jsososo" content="个人中心" />
        </Helmet>
        {
          user.login ?
            <UserInfo user={user} /> :
            <Login login={(u) => this.login(u)} create={(u) => this.create(u)} />
        }
      </div>
    );
  }
}

User.propTypes = {
  login: PropTypes.func.isRequired,
  user: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  user: makeSelectUser(),
});

function mapDispatchToProps(dispatch) {
  return {
    login: (data) => dispatch(getUserInfo(data)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'user', reducer });
const withSaga = injectSaga({ key: 'user', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(User);
