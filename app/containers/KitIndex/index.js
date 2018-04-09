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
import reducer from './reducer';
import saga from './saga';

export class KitIndex extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <Helmet>
          <title>KitIndex</title>
          <meta name="description" content="Description of KitIndex" />
        </Helmet>
      </div>
    );
  }
}

KitIndex.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  kitindex: makeSelectKitIndex(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
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
