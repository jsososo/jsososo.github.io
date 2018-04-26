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
import { makeSelectBoxes } from "../App/selectors";
import reducer from './reducer';
import saga from './saga';

import { queryBoxes } from "../App/actions";
import recentlyUsed from "../../utils/recentlyUsed";
import arrayHelper from "../../utils/arrayHelper";

import BoxComponent from "../../components/BoxesComponent";

export class KitIndex extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  componentWillMount() {
    this.props.queryKitBoxes();
  }

  render() {
    const rU = recentlyUsed.get('kit', true);
    const boxes = arrayHelper.delDuplicateObj([...rU, ...(this.props.boxes.kit)], ['name']);

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
};

const mapStateToProps = createStructuredSelector({
  kitindex: makeSelectKitIndex(),
  boxes: makeSelectBoxes(),
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
