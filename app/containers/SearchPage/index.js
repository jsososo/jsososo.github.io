/**
 *
 * SearchPage
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
import makeSelectSearchPage from './selectors';
import { makeSelectBoxes } from "../App/selectors";
import reducer from './reducer';
import saga from './saga';

import BoxesComponent from '../../components/BoxesComponent';

import getBox from '../../utils/const/box';
import { getQueryFromUrl } from "../../utils/stringHelper";

const typeMap = {
  kit: '工具',
};

export class SearchPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const searchWords = getQueryFromUrl('search');
    const boxes = getBox('', searchWords, false, this.props.boxes);
    let boxesArray = [];
    let result = [<span key="search-result">共找到</span>];
    Object.keys(boxes).forEach((type) => {
      if (boxes[type].length > 0) {
        boxesArray = [...boxesArray, ...boxes[type]];
        result.push(
          <span key={`search-${type}`}>
            <b className="fc_red ft_16 pd_5">{boxes[type].length}</b>
            个{typeMap[type]}
          </span>
        );
      }
    });
    if (result.length === 1) {
      result = [<span key="search-none">啥也没找到</span>];
    }

    return (
      <div>
        <Helmet>
          <title>搜一下</title>
          <meta name="" content="搜索页" />
        </Helmet>
        <div className="body-page">
          <div className="page-title">搜索：{searchWords}</div>
          <div className="mt_10">{result}</div>
          <div>
            {boxesArray.map((item) => <BoxesComponent key={item.name} boxInfo={item} />)}
          </div>
        </div>
      </div>
    );
  }
}

SearchPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
  boxes: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  searchpage: makeSelectSearchPage(),
  boxes: makeSelectBoxes(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'searchPage', reducer });
const withSaga = injectSaga({ key: 'searchPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(SearchPage);
