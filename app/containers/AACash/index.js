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

import Storage from '../../utils/Storage';
import timer from '../../utils/timer';
import { changeUrlQuery, getQueryFromUrl } from "../../utils/stringHelper";
import { checkLogIn } from "../App";
import { setSpinning as AppSpinning } from "../App/actions";

import './index.scss';
import recentlyUsed from "../../utils/recentlyUsed";

export class Aacash extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
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
    Storage.queryBmob(
      'AACash',
      (q) => {
        q.equalTo('userIds', user.objectId);
        q.select('updatedAt', 'title', 'users', 'userId');
        return q;
      },
      (res) => {
        res.sort((a, b) => timer(a.updatedAt, 'YYYY-MM-DD HH:mm:ss').time < timer(b.updatedAt, 'YYYY-MM-DD HH:mm:ss'));
        queryAllList(res);
      },
      null,
      'find'
    );
  }

  // 删掉一个aa
  delAA(id) {
    Storage.delBmob(
      'AACash',
      id,
      () => {
        message.success('删掉了～');
        this.getAAList();
      }
    );
  }

  // 获取aa的详细信息
  getAADetail(cb = (v) => this.props.getAADetail(v)) {
    Storage.queryBmob(
      'AACash',
      (q) => {
        q.equalTo('objectId', getQueryFromUrl('id'));
        return q;
      }, (v) => cb(v),
    );
  }

  // 更新aa
  updateAA(a, b, c, d) {
    const { setSpinning } = this.props;
    setSpinning(true);
    if (!a) {
      this.getAADetail((v) => {
        if (b) {
          v.info[c].list.unshift(d);
        } else {
          const delItem = v.info[c].list.find((r) => r.time === d);
          delItem.del = true;
        }
        Storage.setBmob('AACash', v.objectId, v, () => {
          this.props.getAADetail(v);
          setSpinning(false);
        });
      });
    } else {
      Storage.setBmob('AACash', a.objectId, a, () => {
        this.props.getAADetail(a);
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
    Storage.createBmob(
      'AACash',
      { title, info, users, userId: user.objectId, userIds: [user.objectId] },
      (res) => {
        this.getAAList();
        changeUrlQuery({ id: res.id });
      }
    );
  }

  render() {
    const id = getQueryFromUrl('id');
    const { aacash, user } = this.props;
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
                getDetail={(val) => this.getAADetail(val)}
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
