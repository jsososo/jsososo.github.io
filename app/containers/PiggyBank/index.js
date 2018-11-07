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
import { makeSelectUser } from "../App/selectors";
import reducer from './reducer';
import saga from './saga';
import * as Action from './actions';

import { getQueryFromUrl, changeUrlQuery } from "../../utils/stringHelper";
import Storage from '../../utils/Storage';
import { checkLogIn } from "../App";
import timer from '../../utils/timer';

import PiggyList from '../../components/PiggyList';
import PiggyDetail from '../../components/PiggyDetail';
import { message } from 'antd';

import './index.scss';
import recentlyUsed from "../../utils/recentlyUsed";

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
    const id = getQueryFromUrl('id');
    Storage.queryBmob(
      'Piggy',
      (q) => {
        q.equalTo('objectId', id);
        return q;
      },
      (res) => {
        this.props.getPiggyDetail(res);
      },
    );
  }

  getPiggyList(user = this.props.user) {
    if (!user.objectId) {
      return;
    }
    Storage.queryBmob(
      'Piggy',
      (q) => {
        q.equalTo('userId', user.objectId);
        return q;
      },
      (res) => {
        res.sort((a, b) => timer(a.updatedAt, 'YYYY-MM-DD HH:mm:ss').time - timer(b.updatedAt, 'YYYY-MM-DD HH:mm:ss').time);
        this.props.getPiggyList(res);
      },
      null,
      'find',
    );
  }

  createPiggy(val) {
    const { user } = this.props;
    val.userId = user.objectId;
    Storage.createBmob(
      'Piggy',
      val,
      (res) => {
        this.getPiggyList();
        changeUrlQuery({ id: res.id });
      },
    );
  }

  updatePiggyDetail(val) {
    Storage.setBmob(
      'Piggy',
      val.objectId,
      val,
      () => {
        this.getPiggyDetail();
        this.getPiggyList();
      },
    );
  }

  delPiggy(id) {
    Storage.delBmob(
      'Piggy',
      id,
      () => {
        message.success('删掉了～');
        this.getPiggyList();
      }
    );
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
