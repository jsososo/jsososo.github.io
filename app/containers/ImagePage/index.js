/**
 *
 * ImagePage
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
import makeSelectImagePage from './selectors';
import reducer from './reducer';
import saga from './saga';

export class ImagePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <Helmet>
          <title>ImagePage</title>
          <meta name="description" content="Description of ImagePage" />
        </Helmet>
        <div>image page</div>
      </div>
    );
  }
}

ImagePage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  imagepage: makeSelectImagePage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'imagePage', reducer });
const withSaga = injectSaga({ key: 'imagePage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ImagePage);
