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
import { makeSelectUser } from "../App/selectors";
import reducer from './reducer';
import saga from './saga';

import { Button, Icon } from 'antd';
import TodoList from '../../components/TodoList';
import * as Action from './actions';
import recentlyUsed from '../../utils/recentlyUsed';
import { changeUrlQuery } from "../../utils/stringHelper";
import DataSaver from '../../utils/hydrogen';

import { checkLogIn } from "../App/index";

export class Todo extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
    if (checkLogIn('任务链')) {
      recentlyUsed.set('任务链', 'kit');
      this.queryAllList();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user.objectId && nextProps.user.objectId !== this.props.user.objectId) {
      this.queryAllList(true, nextProps.user);
    }
  }

  // 查询获取所有的todo事件
  queryAllList(update = true, user = this.props.user) {
    if (!user.objectId) {
      return;
    }
    DataSaver.query({
      table: 'Thing',
      e: {
        isTodo: true,
        userId: user.objectId,
      },
      order: '-createdAt',
      pageNo: 1,
      pageSize: 1000,
    }).then((res) => {
      if (!update) {
        return;
      }
      // 这里要对todo做一个排序
      res.sort((a, b) => {
        if (a.status === 2 && b.status !== 2) {
          return 1;
        }
        if (a.status === 1 && b.status !== 1) {
          return -1;
        }
        if (a.status !== 2 && b.status === 2) {
          return -1;
        }
        if (a.status !== 1 && b.status === 1) {
          return 1;
        }
      });
      this.props.queryList(res);
    });
  }

  // 新增事件
  createNewTodo(parent = '') {
    const { user, todo, queryList } = this.props;
    const obj = {
      userId: user.objectId,
      time: 0,
      startTime: 0,
      endTime: 0,
      isTodo: true,
      milestone: false,
      notice: false,
      title: '',
      content: '',
      parent,
      children: [],
      showChildren: true,
      status: 0,
    };
    DataSaver.create({
      table: 'Thing',
      obj,
    }).then((res) => {
      const thing = { ...obj, ...res };
      todo.list.unshift(thing);
      queryList(todo.list);
      if (parent) {
        this.updateParentStatusTo1(parent, thing.objectId);
      }
      changeUrlQuery({ id: thing.objectId, edit: 1 });
    });
  }

  // 更新父事件的status
  updateParentStatusTo1(id, childId) {
    // 作为递归中的终止判断
    if (!id) {
      this.queryAllList();
      return;
    }
    const { todo } = this.props;
    const pT = todo.list.find((item) => item.objectId === id);
    // 不需要更新的父事件，就不请求了
    if (childId || pT.status === 2) {// 可能是增加了子事件，也可能是改了状态
      if (childId) {
        pT.children.push(childId);
      }
      if (pT.status === 2) {
        pT.status = pT.status === 2 ? 1 : pT.status;
      }
      this.updateThing(pT.objectId, pT, () => this.updateParentStatusTo1(pT.parent));
    } else {
      this.updateParentStatusTo1(pT.parent);
    }
  }

  // 快速修改一个事件, cb 可以是一个递归，一层一层的向上修改父事件或向下修改子事件
  updateThing(id, editInfo) {
    // 作为递归中的终止判断
    if (!id) {
      this.queryAllList();
      return;
    }
    const { todo } = this.props;
    const index = todo.list.findIndex((item) => item.objectId === id);
    const thing = todo.list[index];
    todo.list[index] = { ...thing, ...editInfo };
    this.props.queryList(todo.list);
    changeUrlQuery({ edit: 0 });
    DataSaver.set({
      table: 'Thing',
      id,
      obj: {
        ...thing,
        ...editInfo,
      },
    });
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
          <a href="#/kit/">
            <Icon type="arrow-left" className="pointer ft_20 mr_20 mt_5 vat"/>
          </a>
          <Button type="primary" onClick={() => this.createNewTodo()}>添加一个新计划</Button>
          <TodoList
            list={list}
            queryAllList={() => this.queryAllList()}
            createNewTodo={(val) => this.createNewTodo(val)}
            updateThing={(id, val, cb) => this.updateThing(id, val, cb)}
          />
        </div>
      </div>
    );
  }
}

Todo.propTypes = {
  todo: PropTypes.object.isRequired,
  queryList: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  todo: makeSelectTodo(),
  user: makeSelectUser(),
});

function mapDispatchToProps(dispatch) {
  return {
    queryList: (list) => dispatch(Action.queryList(list)),
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
