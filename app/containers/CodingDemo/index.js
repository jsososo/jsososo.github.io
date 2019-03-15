/**
 *
 * CodingDemo
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectReducer from 'utils/injectReducer';
import makeSelectCodingDemo from './selectors';
import reducer from './reducer';

import Demo1 from '../../components/Demo/demo1';

const demoMap = {
  demo1: <Demo1 />,
};

export class CodingDemo extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const id = this.props.match.params.id;
    return (
      <div>
        <Helmet>
          <title>Coooooding</title>
        </Helmet>
        <div>
          {demoMap[`demo${id}`]}
        </div>
      </div>
    );
  }
}

CodingDemo.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  codingdemo: makeSelectCodingDemo(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'codingDemo', reducer });

export default compose(
  withReducer,
  withConnect,
)(CodingDemo);
