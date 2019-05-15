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
import DataSaver from '../../utils/hydrogen';
import { message } from 'antd';

export class User extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  login(user, goIndex = true) {
    return DataSaver.login(user)
      .then((res) => {
        if (res) {
          const userObj = res;
          userObj.login = true;
          userObj.objectId = res.objectId;
          Storage.set('user', `${user.username}-${user.password.split('').reverse().join('')}`);
          this.props.login(userObj);
          goIndex && (window.location = '#/');
        }
      })
      .catch(() => message.error('登陆失败'));
  }

  async create(user) {
    const qU = await DataSaver.query({
      table: '_User',
      e: { username: user.username },
    });
    if (qU.length > 0) {
      return message.error('你的名字被抢了');
    }

    await DataSaver.register(user);
    message.success('注册成功');
    setTimeout(() => this.login(user), 2000);
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
            <UserInfo logIn={(u) => this.login(u, false)} user={user} /> :
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
