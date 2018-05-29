/**
 *
 * MileStone
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
import makeSelectMileStone from './selectors';
import reducer from './reducer';
import saga from './saga';

import { Timeline } from 'antd';
import timer from '../../utils/timer';
import { getQueryFromUrl } from "../../utils/stringHelper";
import recentlyUsed from '../../utils/recentlyUsed';

export class MileStone extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
    recentlyUsed.set('里程碑', 'kit');
    this.pageScroll();
  }

  componentDidUpdate() {
    this.pageScroll();
  }

  pageScroll() {
    const id = getQueryFromUrl('id');
    const dom = document.getElementById(`milestone-${id}`);
    if (dom) {
      window.scrollTo(0, dom.offsetTop - 100);
    }
  }

  render() {
    const { milestone } = this.props;
    return (
      <div>
        <Helmet>
          <title>里程碑</title>
          <meta name="jsososo" content="里程碑" />
        </Helmet>
        <div>
          <Timeline>
            {milestone.list.map((item) => (
              <Timeline.Item
                key={`milestone-${item.id}`}
                id={`milestone-${item.id}`}
                color={(timer().time < item.time) ? '#999' : 'blue'}
              >
                {
                  item.id === 'today' ?
                    <div className="fc_blue ft_18">
                      <b>{timer(item.time).str()}</b>
                      <b className="pl_20">Now</b>
                    </div> :
                    <div>
                      <b className={`ft_18 ${item.time > timer().time ? 'fc_999' : 'fc_blue'}`}>{timer(item.time).str()}</b>
                      <a href={`#/kit/calendar/?date=${timer(item.time).str()}&id=${item.id}`}>
                        <span className="pl_20 ft_16">{item.title}</span>
                        <span className="pl_20">{timer().to(timer(item.time), 'str', 2)}</span>
                      </a>
                    </div>
                }
                <div className="fc_999 mt_5" style={{paddingLeft: '115px'}}>{item.content}</div>
              </Timeline.Item>
            ))}
          </Timeline>
        </div>
      </div>
    );
  }
}

MileStone.propTypes = {
  milestone: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  milestone: makeSelectMileStone(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'mileStone', reducer });
const withSaga = injectSaga({ key: 'mileStone', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(MileStone);
