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
import Todo from '../Todo'; // 计划链

import Development from '../Development/Loadable'; // 开发后门
import Info from '../Info/Loadable'; // 一些说明


export class App extends React.Component {
  componentWillMount() {
    this.props.initApp();
    recentlyUsed.clearExpire();
  }
  componentWillReceiveProps() {
  }

  render() {
    return (
      <HashRouter>
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

          {/* 说明 */}
          <Route path="/info/" component={Info} />
        </Switch>
      </HashRouter>
    );
  }
}


App.propTypes = {
  initApp: PropTypes.func.isRequired,
}
const mapStateToProps = createStructuredSelector({
});

function mapDispatchToProps(dispatch) {
  return {
    initApp: () => dispatch(Action.initApp()),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withSaga = injectSaga({ key: 'autoAgreeReplace', saga });

export default compose(
  withSaga,
  withConnect,
)(App);
