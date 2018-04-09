/**
 *
 * CodeIndex
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
import makeSelectCodeIndex from './selectors';
import reducer from './reducer';
import saga from './saga';

export class CodeIndex extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <Helmet>
          <title>CodeIndex</title>
          <meta name="description" content="Description of CodeIndex" />
        </Helmet>
      </div>
    );
  }
}

CodeIndex.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  codeindex: makeSelectCodeIndex(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'codeIndex', reducer });
const withSaga = injectSaga({ key: 'codeIndex', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(CodeIndex);
