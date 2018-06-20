/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import injectSaga from 'utils/injectSaga';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {createStructuredSelector} from 'reselect';
import * as Action from './actions';
import {compose} from 'redux';
import saga from './saga';
import {makeSelectToast} from './selectors';
// import { Helmet } from 'react-helmet';
// import styled from 'styled-components';
import { Switch, Route, HashRouter } from 'react-router-dom';
import recentlyUsed from '../../utils/recentlyUsed';
import IndexPage from '../IndexPage'; // 首页
import ImagePage from '../ImagePage/Loadable'; // 图片首页
import SearchPage from '../SearchPage/Loadable'; // 搜索页

import Kit from '../KitIndex/Loadable'; // 工具首页
import CashBook from '../CashBook/Loadable'; // 账本
import Notebook from '../Notebook/Loadable'; // 记事本
import Calendar from '../Calendar/Loadable'; // 日历
import MileStone from '../MileStone/Loadable'; // 里程碑
import Todo from '../Todo/Loadable'; // 计划链

import Development from '../Development/Loadable'; // 开发后门
import Info from '../Info/Loadable'; // 一些说明
import User from '../User/Loadable'; // 用户页面

import Header from '../Header/Loadable'; // 头部

import { Bmob } from '../../utils/bmob';
import Storage  from '../../utils/Storage';
import { makeSelectUser } from "./selectors";
import { Modal } from 'antd';

/*
*  判断用户是否登录，部分功能需要登录才能使用
*  点击 去登录 直接眺望登录页面，
*  点击 取消 默认眺望首页，也可以进行自由配置（某些页面部分功能可以不登录使用）
* */
export const checkLogIn = (page, cancel = () => window.location = '#') => {
  if (!Bmob.User.current()) {
    Modal.confirm({
      iconType: 'warning',
      content: `${page}功能需要登录才能使用哟~`,
      okText: '登录去',
      cancelText: '算了算了',
      onCancel() {
        return new Promise((res) => {
          cancel();
          res();
        });
      },
      onOk() {
        return new Promise((res) => {
          window.location = '#/user/info';
          res();
        });
      },
    });
    return false;
  }
  return true;
};

export class App extends React.Component {
  componentWillMount() {
    this.props.initApp();
    recentlyUsed.clearExpire();
    Bmob.initialize('722fd36cfde950349f5533aabbd33439', 'dc6d4b8254a412fb5896c1348fab2f5f');
    // 自动登录
    Storage.logIn(null, (res) => {
      const user = res ? res.attributes : { username: '游客', login: false };
      user.login = Boolean(res);
      this.props.getUserInfo(user);
    }, null);
  }

  /*
  *  退出登录
  * */
  logOut() {
    Storage.set('user', '-');
    Bmob.User.logOut();
    this.props.getUserInfo({ username: '游客', login: false });
    window.location = '#';
  }

  render() {
    return (
      <HashRouter>
        <div>
          <Header logOut={() => this.logOut()} />
          <Switch>
            <Route exact path="/" component={Kit} />
            <Route path="/img" component={ImagePage} />
            <Route path="/search" component={SearchPage} />

            {/* 工具类 */}
            <Route path="/kit" exact component={Kit} />
            <Route path="/kit/cashbook" component={CashBook} />
            <Route path="/kit/notebook" component={Notebook} />
            <Route path="/kit/calendar" component={Calendar} />
            <Route path="/kit/milestone" component={MileStone} />
            <Route path="/kit/todo" component={Todo} />

            {/* 开发 */}
            <Route path="/development" component={Development} />

            {/* 个人中心 */}
            <Route path="/user" component={User} />

            {/* 说明 */}
            <Route path="/info/" component={Info} />
          </Switch>
        </div>
      </HashRouter>
    );
  }
}


App.propTypes = {
  initApp: PropTypes.func.isRequired,
  getUserInfo: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
}
const mapStateToProps = createStructuredSelector({
  user: makeSelectUser(),
});

function mapDispatchToProps(dispatch) {
  return {
    initApp: () => dispatch(Action.initApp()),
    getUserInfo: (data) => dispatch(Action.getUserInfo(data)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withSaga = injectSaga({ key: 'autoAgreeReplace', saga });

export default compose(
  withSaga,
  withConnect,
)(App);
