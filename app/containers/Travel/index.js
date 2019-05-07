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
import { getQueryFromUrl, changeUrlQuery } from '../../utils/stringHelper';
import DataSaver from '../../utils/hydrogen';

export class Travel extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);

    this.updateInfo = this.updateInfo.bind(this);
    this.saveDetail = this.saveDetail.bind(this);
    this.changeUrl = this.changeUrl.bind(this);
    this.queryDetail = this.queryDetail.bind(this);
    this.saveDetail = this.saveDetail.bind(this);
    this.createTravel = this.createTravel.bind(this);

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

  queryAllList(user = this.props.user) {
    const { updateList } = this.props;

    const params = {
      table: 'Travel',
      e: {
        userIds: user.objectId,
      },
      select: ['title', 'dateLength'],
    };

    return DataSaver.query(params)
      .then((res) => {
        updateList(res);
      });
  }

  queryDetail(id) {
    const { updateInfo, updateRawInfo } = this.props;
    changeUrlQuery({ id, edit: '' });
    this.getDetailReq(id)
      .then((res) => {
        updateInfo(res);
        updateRawInfo(res);
      });
  }

  getDetailReq(id) {
    return DataSaver.get({ table: 'Travel', id });
  }

  createTravel() {
    const { user } = this.props;
    Storage.createBmob('Travel', {
      title: '',
      desc: '',
      takes: [], // 记得带的物品
      userIds: [user.objectId], // 用户列表
      dateList: [
        {
          title: '',
        },
      ],
    }, (res) => {
      this.updateInfo({ objectId: res.id, userIds: [user.objectId] });
    });
  }

  async saveDetail() {
    const { travel } = this.props;
    const { info, rawInfo } = travel;
    // 保存，先获取一遍，然后进行对比修改了啥，选择替换
    let remoteData;

    await this.getDetailReq(info.objectId)
      .then((res) => remoteData = res);

    const list = ['title', 'desc'];
    const map = {
      title: '标题',
      desc: '描述',
    };
    const err = [];
    // 检验其他信息
    list.forEach((k) => {
      if (remoteData[k] === rawInfo[k]) {
        return;
      }
      if (remoteData[k] !== info[k]) {
        if (rawInfo[k] === info[k]) {
          info[k] = remoteData[k];
        } else {
          err.push(map[k]);
        }
      }
    });
    // 校验行程
    (remoteData.dateList || []).forEach((date, i) => {
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
      DataSaver.set({ q: remoteData, obj: info })
        .then(() => {
          this.queryAllList();
          this.queryDetail(rawInfo.objectId);
          message.success('ok～');
        });
    }
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
                createTravel={this.createTravel}
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
