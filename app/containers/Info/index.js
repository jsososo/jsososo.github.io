/**
 *
 * Info
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { compose } from 'redux';

import Notebook from './Notebook';


export class Info extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { location } = this.props;
    return (
      <div>
        <Helmet>
          <title>一些说明</title>
          <meta name="jsososo" content="一些说明情况" />
        </Helmet>
        {
          location.pathname === '/info/notebook' && <Notebook />
        }
      </div>
    );
  }
}

Info.propTypes = {
  dispatch: PropTypes.func.isRequired,
  location: PropTypes.object,
};


function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(null, mapDispatchToProps);

export default compose(
  withConnect,
)(Info);
