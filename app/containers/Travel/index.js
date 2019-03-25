/**
 *
 * Travel
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { message } from 'antd';

import injectReducer from 'utils/injectReducer';
import makeSelectTravel from './selectors';
import reducer from './reducer';

import TravelList from '../../components/TravelList/Loadable';
import TravelDetail from '../../components/TravelDetail/Loadable';
import Storage from '../../utils/Storage';

import { makeSelectUser } from '../App/selectors';
import * as Action from './actions';
import { getQueryFromUrl, changeUrlQuery } from "../../utils/stringHelper";

export class Travel extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);

    this.updateInfo = this.updateInfo.bind(this);
    this.saveDetail = this.saveDetail.bind(this);
    this.changeUrl = this.changeUrl.bind(this);
    this.queryDetail = this.queryDetail.bind(this);
    this.saveDetail = this.saveDetail.bind(this);

    this.queryAllList(props.user);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user.objectId && nextProps.user.objectId !== this.props.user.objectId) {
      this.queryAllList(nextProps.user);
    }
  }

  updateInfo(data) {
    const { travel, updateInfo } = this.props;
    const { info } = travel;
    updateInfo({ ...info, ...data });
  }

  queryAllList(user) {
    const { updateList } = this.props;
    Storage.queryBmob('Travel', (q) => {
      q.equalTo('userIds', user.objectId);
      q.limit(1000);
      return q;
    }, (res) => {
      updateList(res);
    }, null, 'find');
  }

  queryDetail(id) {
    const { updateInfo, updateRawInfo } = this.props;
    changeUrlQuery({ id, edit: '' });
    Storage.queryBmob('Travel', (q) => {
      q.equalTo('objectId', id);
      return q;
    }, (res) => {
      updateInfo(res);
      updateRawInfo(res);
    });
  }

  createTravel(val) {
    const { user } = this.props;
    Storage.createBmob('Travel', {
      ...val,
      userIds: [user.objectId],
    }, (res) => {
      this.updateInfo({ objectId: res.id, userIds: [user.objectId] });
    });
  }

  saveDetail() {
    const { travel } = this.props;
    const { info, rawInfo } = travel;
    // 新建
    if (!info.objectId) {
      return this.createTravel(info);
    }
    // 保存，先获取一遍，然后进行对比修改了啥，选择替换
    Storage.queryBmob('Travel', (q) => {
      q.equalTo('objectId', info.objectId);
      return q;
    }, (res) => {
      const list = ['title', 'desc'];
      const map = {
        title: '标题',
        desc: '描述',
      };
      const err = [];
      // 检验其他信息
      list.forEach((k) => {
        if (res[k] === rawInfo[k]) {
          return;
        }
        if (res[k] !== info[k]) {
          if (rawInfo[k] === info[k]) {
            info[k] = res[k];
          } else {
            err.push(map[k]);
          }
        }
      });
      // 校验行程
      res.dateList.forEach((date, i) => {
        const rD = rawInfo.dateList[i] || {};
        const iD = info.dateList[i] || {};
        if (JSON.stringify(date) === JSON.stringify(rD)) {
          return;
        }
        if (JSON.stringify(date) !== JSON.stringify(iD)) {
          if (JSON.stringify(rD) === JSON.stringify(iD)) {
            info.dateList[i] = date;
          } else {
            err.push(`D${i + 1}行程`);
          }
        }
      });

      if (err.length) {

      } else {
        Storage.setBmob('Travel', info.objectId, info, () => {
          this.queryDetail(info.objectId);
          message.success('ok～');
        });
      }
    });
    return false;
  }

  changeUrl(obj) {
    changeUrlQuery(obj);
    this.forceUpdate();
  }

  render() {
    const { travel } = this.props;
    const { id, edit } = getQueryFromUrl();

    return (
      <div>
        <Helmet>
          <title>远方</title>
          <meta name="description" content="Description of Travel" />
        </Helmet>
        <div className="travel-page">
          {
            id ?
              <TravelDetail
                info={travel.info}
                onChange={this.updateInfo}
                onSave={this.saveDetail}
                changeUrl={this.changeUrl}
                queryDetail={this.queryDetail}
                isEdit={edit === '1'}
                onCancel={this.queryDetail}
              /> :
              <TravelList
                list={travel.list}
                changeUrl={this.changeUrl}
                queryDetail={this.queryDetail}
              />
          }
        </div>
      </div>
    );
  }
}

Travel.propTypes = {
  updateInfo: PropTypes.func,
  user: PropTypes.object,
  travel: PropTypes.object,
  updateList: PropTypes.func,
  updateRawInfo: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  travel: makeSelectTravel(),
  user: makeSelectUser(),
});

function mapDispatchToProps(dispatch) {
  return {
    updateInfo: (data) => dispatch(Action.updateInfo(data)),
    updateList: (data) => dispatch(Action.updateList(data)),
    updateRawInfo: (data) => dispatch(Action.updateRawInfo(data)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'travel', reducer });

export default compose(
  withReducer,
  withConnect,
)(Travel);
