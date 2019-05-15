/**
 *
 * PiggyBank
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
import makeSelectPiggyBank from './selectors';
import { makeSelectUser } from '../App/selectors';
import reducer from './reducer';
import saga from './saga';
import * as Action from './actions';

import { getQueryFromUrl, changeUrlQuery } from '../../utils/stringHelper';
import { checkLogIn } from '../App';
import timer from '../../utils/timer';

import PiggyList from '../../components/PiggyList';
import PiggyDetail from '../../components/PiggyDetail';
import { message } from 'antd';

import './index.scss';
import recentlyUsed from '../../utils/recentlyUsed';
import DataSaver from '../../utils/hydrogen';

export class PiggyBank extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  componentWillMount() {
    if (checkLogIn('存钱罐')) {
      this.getPiggyList();
      recentlyUsed.set('存钱罐', 'kit');
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user.objectId && nextProps.user.objectId !== this.props.user.objectId) {
      this.getPiggyList(nextProps.user);
    }
  }

  getPiggyDetail() {
    DataSaver.get({
      table: 'Piggy',
      id: getQueryFromUrl('id'),
    }).then((res) => this.props.getPiggyDetail(res));
  }

  getPiggyList(user = this.props.user) {
    if (!user.objectId) {
      return;
    }
    DataSaver.query({
      table: 'Piggy',
      e: { userId: user.objectId },
    }).then((res) => {
      const now = timer().time;
      res.sort((a, b) => {
        if ((now - a.endTime) * (now - b.endTime) < 0) {
          return (b.endTime - a.endTime);
        }
        return timer(a.updatedAt, 'YYYY-MM-DD HH:mm:ss').time - timer(b.updatedAt, 'YYYY-MM-DD HH:mm:ss').time;
      });
      this.props.getPiggyList(res);
    });
  }

  createPiggy(obj) {
    const { user } = this.props;
    obj.userId = user.objectId;
    DataSaver.create({
      table: 'Piggy',
      obj,
    }).then((res) => {
      this.getPiggyList();
      changeUrlQuery({ id: res.objectId });
    });
  }

  async updatePiggyDetail(val) {
    await DataSaver.set({
      table: 'Piggy',
      id: val.objectId,
      obj: val,
    });
    this.getPiggyDetail();
    this.getPiggyList();
  }

  async delPiggy(id) {
    await DataSaver.del({ table: 'Piggy', id });
    message.success('删掉了～');
    this.getPiggyList();
  }
  render() {
    const id = getQueryFromUrl('id');
    const { piggybank } = this.props;
    return (
      <div>
        <div>
          <Helmet>
            <title>存钱罐</title>
            <meta name="soso" content="存钱罐" />
          </Helmet>
        </div>
        {
          id ?
            <PiggyDetail
              detail={piggybank.detail}
              getDetail={() => this.getPiggyDetail()}
              updateFun={(val) => this.updatePiggyDetail(val)}
            /> :
            <PiggyList
              list={piggybank.list}
              createFun={(val) => this.createPiggy(val)}
              delFun={(pId) => this.delPiggy(pId)}
            />
        }
      </div>
    );
  }
}

PiggyBank.propTypes = {
  piggybank: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  getPiggyList: PropTypes.func.isRequired,
  getPiggyDetail: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  piggybank: makeSelectPiggyBank(),
  user: makeSelectUser(),
});

function mapDispatchToProps(dispatch) {
  return {
    getPiggyList: (data) => dispatch(Action.getPiggyList(data)),
    getPiggyDetail: (data) => dispatch(Action.getPiggyDetail(data)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'piggyBank', reducer });
const withSaga = injectSaga({ key: 'piggyBank', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(PiggyBank);
