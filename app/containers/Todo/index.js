/**
 *
 * 计划
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
import makeSelectTodo from './selectors';
import reducer from './reducer';
import saga from './saga';
import localStorage from '../../utils/localStorage';
import { Button } from 'antd';
import TodoList from '../../components/TodoList';
import * as Action from './actions';
import recentlyUsed from '../../utils/recentlyUsed';

export class Todo extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  componentWillMount() {
    recentlyUsed.set('任务链', 'kit');
    this.props.updateList(localStorage.get('p_t_list', true, '[]'));
  }

  createNewTodo(parent = 0) {
    const { todo } = this.props;
    const { list } = todo;
    const pT = list.find((item) => item.id === parent);
    let nowId = Number(localStorage.get('p_k_thing_now_id', false, '1'));
    nowId += 1;
    if (pT && pT.status === 2) {
      pT.status = 1;
    }

    // 增加子事件
    if (pT) {
      pT.children.push(nowId);
    }

    list.push({
      title: '新的计划',
      content: '',
      parent,
      children: [],
      status: 0,
      id: nowId,
      time: null,
      milestone: false,
      startTime: null,
      endTime: null,
      showChildren: true,
      isTodo: true,
    });
    localStorage.set('p_k_thing_now_id', nowId, false);
    this.updateList(list);
    window.location = `#/kit/todo?id=${nowId}&edit=1`;
  }

  updateList(list) {
    this.props.updateList(list);
  }

  render() {
    const { todo } = this.props;
    const { list } = todo;
    return (
      <div>
        <Helmet>
          <title>计划链</title>
          <meta name="jsososo" content="计划链" />
        </Helmet>
        <div>
          <Button type="primary" onClick={() => this.createNewTodo()}>添加一个新计划</Button>
          <TodoList
            list={list}
            createNewTodo={(val) => this.createNewTodo(val)}
            updateList={(val) => this.updateList(val)}
          />
        </div>
      </div>
    );
  }
}

Todo.propTypes = {
  todo: PropTypes.object.isRequired,
  updateList: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  todo: makeSelectTodo(),
});

function mapDispatchToProps(dispatch) {
  return {
    updateList: (list) => dispatch(Action.updateList(list)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'todo', reducer });
const withSaga = injectSaga({ key: 'todo', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Todo);
