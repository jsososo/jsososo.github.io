/**
 *
 * Aacash
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
import makeSelectAacash from './selectors';
import { makeSelectUser } from "../App/selectors";
import reducer from './reducer';
import saga from './saga';
import * as Action from './actions';

import AADetail from '../../components/AADetail';
import AAList from '../../components/AAList';
import { message } from 'antd';

import { changeUrlQuery, getQueryFromUrl } from "../../utils/stringHelper";
import { checkLogIn } from "../App";
import { setSpinning as AppSpinning } from "../App/actions";
import DataSaver from '../../utils/hydrogen';

import './index.scss';
import recentlyUsed from "../../utils/recentlyUsed";

export class Aacash extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);

    this.getAADetail = this.getAADetail.bind(this);
  }

  componentWillMount() {
    if (checkLogIn('AA对账')) {
      this.getAAList();
      recentlyUsed.set('AA对账', 'kit');
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user.objectId && nextProps.user.objectId !== this.props.user.objectId) {
      this.getAAList(nextProps.user);
    }
  }

  // 获取所有的aa列表
  getAAList(user = this.props.user) {
    const { queryAllList } = this.props;
    if (!user.objectId) {
      return;
    }
    DataSaver.query({
      table: 'AACash',
      e: { userIds: user.objectId },
      select: ['title', 'users', 'userId'],
      order: '-updatedAt',
    }).then(queryAllList);
  }

  // 删掉一个aa
  delAA(id) {
    DataSaver.del({ table: 'AACash', id })
      .then(() => {
        message.success('删掉了～');
        this.getAAList();
      });
  }

  // 获取aa的详细信息
  getAADetail() {
    return DataSaver.get({
      table: 'AACash',
      id: getQueryFromUrl('id'),
    });
  }

  /*
  *  更新aa
  *
  *  @param a: 直接更新的对象
  *  @param b: true 添加，false 删除
  *  @param c: 用户index （也可能是一个数组，就是转账）
  *  @param d: 时间戳(这里当作id使用)
  * */
  async updateAA(a, b, c, d) {
    const { setSpinning, getAADetail } = this.props;
    setSpinning(true);
    if (!a) {
      const v = await this.getAADetail();
      if (b) {
        if (typeof c === 'object') {
          c.forEach((sval) => v.info[sval.i].list.unshift(sval));
        } else {
          v.info[c].list.unshift(d);
        }
      } else {
        const delItem = v.info[c].list.find((r) => r.time === d);
        delItem.del = true;
      }
      DataSaver.set({ table: 'AACash', id: v.objectId, obj: v })
        .then(() => {
          this.props.getAADetail(v);
          setSpinning(false);
        });
    } else {
      DataSaver.set({ table: 'AACash', id: a.objectId, obj: a })
        .then(this.getAADetail)
        .then(getAADetail)
        .then(() => {
          message.success('修改成功');
          setSpinning(false);
        });
    }
  }

  // 新建一个aa
  createAA(users, title) {
    const { user } = this.props;
    const info = [];
    users.forEach((u) => {
      info.push({
        name: u,
        list: [],
      });
    });
    DataSaver.create({
      table: 'AACash',
      obj: { title, info, users, userId: user.objectId, userIds: [user.objectId] },
    }).then((res) => {
      this.getAAList();
      changeUrlQuery({ id: res.objectId });
    });
  }

  render() {
    const id = getQueryFromUrl('id');
    const { aacash, user, getAADetail } = this.props;
    return (
      <div>
        <Helmet>
          <title>AA记账</title>
          <meta name="soso" content="AA记账" />
        </Helmet>
        <div>
          {
            id ?
              <AADetail
                detail={aacash.detail}
                getDetail={this.getAADetail}
                updateAADetail={getAADetail}
                updateFun={(a, b, c, d) => this.updateAA(a, b, c, d)}
                user={user}
              /> :
              <AAList
                list={aacash.list}
                delFun={(val) => this.delAA(val)}
                createFun={(u, t) => this.createAA(u, t)}
                user={user}
              />
          }
        </div>
      </div>
    );
  }
}

Aacash.propTypes = {
  aacash: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  queryAllList: PropTypes.func.isRequired,
  getAADetail: PropTypes.func.isRequired,
  setSpinning: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  aacash: makeSelectAacash(),
  user: makeSelectUser(),
});

function mapDispatchToProps(dispatch) {
  return {
    queryAllList: (list) => dispatch(Action.queryAAList(list)),
    getAADetail: (data) => dispatch(Action.getAADetail(data)),
    setSpinning: (data) => dispatch(AppSpinning(data)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'aacash', reducer });
const withSaga = injectSaga({ key: 'aacash', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Aacash);
