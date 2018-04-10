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
import IndexPage from '../IndexPage'; // 首页
import ImagePage from '../ImagePage'; // 图片首页
import SearchPage from '../SearchPage'; // 搜索页

import CashBook from '../CashBook'; // 账本
import Notebook from '../Notebook'; // 记事本

import timer from '../../utils/timer';

export class App extends React.Component {
  componentWillMount() {
    this.props.initApp();
  }
  componentWillReceiveProps() {
  }

  render() {
    return (
      <HashRouter>
        <Switch>
          <Route exact path="/" component={IndexPage} />
          <Route path="/img" component={ImagePage} />
          <Route path="/search" component={SearchPage} />

          {/*工具类*/}
          <Route path="/kit/cashbook" component={CashBook} />
          <Route path="/kit/notebook" component={Notebook} />
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
