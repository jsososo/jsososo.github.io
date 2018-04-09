/**
 *
 * IndexPage
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
import makeSelectIndexPage from './selectors';
import reducer from './reducer';
import saga from './saga';

export class IndexPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <Helmet>
          <title>IndexPage</title>
          <meta name="description" content="Description of IndexPage" />
        </Helmet>
        <div>
          index
        </div>
      </div>
    );
  }
}

IndexPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  indexpage: makeSelectIndexPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'indexPage', reducer });
const withSaga = injectSaga({ key: 'indexPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(IndexPage);
