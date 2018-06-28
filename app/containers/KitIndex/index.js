/**
 *
 * KitIndex
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
import makeSelectKitIndex from './selectors';
import { makeSelectBoxes, makeSelectUser } from "../App/selectors";
import reducer from './reducer';
import saga from './saga';

import { queryBoxes } from "../App/actions";
import recentlyUsed from "../../utils/recentlyUsed";
import arrayHelper from "../../utils/arrayHelper";
import Storage from '../../utils/Storage';

import BoxComponent from "../../components/BoxesComponent";

export class KitIndex extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      boxes: props.boxes.kit || [],
    };
  }
  componentWillMount() {
    const { user } = this.props;
    Storage.queryBmob(
      'RecentlyUsed',
      (q) => {
        q.equalTo('user', user.username);
        return q;
      },
      (res) => {
        if (res) {
          const rU = recentlyUsed.get('kit', res, this.state.boxes);
          const boxes = arrayHelper.delDuplicateObj([...rU, ...(this.props.boxes.kit)], ['name']);
          this.setState({
            boxes,
          });
        } else {
          // 说明该用户没有最近使用的数据，建一个空对象
          Storage.createBmob(
            'RecentlyUsed',
            {
              user: user.username,
              value: '{}',
            },
          );
        }
      }
    );
  }

  render() {
    const { boxes } = this.state;
    return (
      <div>
        <Helmet>
          <title>没用的工具</title>
          <meta name="soso" content="没用的工具" />
        </Helmet>
        <div>
          {boxes.map((item, index) => (<BoxComponent key={`kit-box-${index}`} boxInfo={item} />))}
        </div>
      </div>
    );
  }
}

KitIndex.propTypes = {
  kitindex: PropTypes.object.isRequired,
  boxes: PropTypes.object.isRequired,
  queryKitBoxes: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  kitindex: makeSelectKitIndex(),
  boxes: makeSelectBoxes(),
  user: makeSelectUser(),
});

function mapDispatchToProps(dispatch) {
  return {
    queryKitBoxes: () => dispatch(queryBoxes(['kit'])),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'kitIndex', reducer });
const withSaga = injectSaga({ key: 'kitIndex', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(KitIndex);
