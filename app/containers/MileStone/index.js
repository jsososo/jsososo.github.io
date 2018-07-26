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
import { makeSelectUser } from "../App/selectors";

import { Timeline } from 'antd';
import timer from '../../utils/timer';
import { getQueryFromUrl } from "../../utils/stringHelper";
import recentlyUsed from '../../utils/recentlyUsed';
import Storage from '../../utils/Storage';
import * as Action from './actions';
import { message } from 'antd';
import { checkLogIn } from "../App/index";

export class MileStone extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  // 页面加载或者更新之后都自动滚动到想要的位置
  componentDidMount() {
    if (checkLogIn('里程碑')) {
      recentlyUsed.set('里程碑', 'kit', this.props.user.username);
      this.getAllMileStone();
    }
  }

  // 获取所有的里程碑
  getAllMileStone() {
    Storage.queryBmob(
      'Thing',
      (q) => {
        q.equalTo('user', this.props.user.username || '游客');
        q.equalTo('milestone', true);
        q.limit(1000);

        return q;
      },
      (res = []) => {
        res.push({ id: 'today', time: timer().time });
        res.sort((a, b) => a.time - b.time);
        const list = {};
        res.forEach((item) => {
          const dStr = timer(item.time).str();
          if (list[dStr]) {
            list[dStr].push(item);
          } else {
            list[dStr] = [item];
          }
        });
        this.props.queryMileStone(list);
        this.pageScroll();
      },
      () => {
        message.error('找不到呀');
      },
      'find',
    );
  }

  // 页面滚动
  pageScroll() {
    const id = getQueryFromUrl('id');
    const dom = document.getElementById(`milestone-${id}`);
    const pDom = dom.parentNode.parentNode;
    if (dom) {
      window.scrollTo(0, dom.offsetTop + pDom.offsetTop - 100);
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
            {
              Object.keys(milestone.list).sort((a, b) => timer(a, 'YYYY-MM-DD').time - timer(b, 'YYYY-MM-DD').time).map((key) => (
                <Timeline.Item
                  key={`milestone-date-${key}`}
                  id={`milestone-date-${key}`}
                  color={(timer().time < timer(key, 'YYYY-MM-DD').time) ? '#999' : 'blue'}
                >
                  {
                    milestone.list[key].map((item, index) => (
                      // NOW
                      item.id === 'today' ?
                      <div className="fc_blue ft_18 mb_10" key="now" id="milestone-today">
                        <b style={{ width: '150px' }} className="inline-block">{index === 0 && timer(item.time).str()}</b>
                        <b className="pl_20">Now</b>
                      </div> :
                      // 真正的里程碑事件
                      <div className="mb_15" key={`milestone-thing-${item.objectId}`} id={`milestone-${item.objectId}`}>
                        <div>
                          <b
                            style={{ width: '150px' }}
                            className={`ft_18 inline-block ${item.time > timer().time ? 'fc_999' : 'fc_blue'}`}
                          >
                            {index === 0 && timer(item.time).str()}
                          </b>
                          <a className="mile-stone-link" href={`#/kit/calendar/?date=${timer(item.time).str()}&id=${item.id}`}>
                            <span className="pl_20 ft_16" style={{ fontWeight: '900' }}>
                              {item.title || '还没起名字'}
                            </span>
                            <span className="pl_20">{timer().to(timer(item.time), 'str', 2)}</span>
                          </a>
                        </div>
                        <div className="fc_999" style={{ paddingLeft: '170px' }}>{item.content}</div>
                      </div>
                    ))
                  }
                </Timeline.Item>
              ))
            }
          </Timeline>
        </div>
      </div>
    );
  }
}

MileStone.propTypes = {
  milestone: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  queryMileStone: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  milestone: makeSelectMileStone(),
  user: makeSelectUser(),
});

function mapDispatchToProps(dispatch) {
  return {
    queryMileStone: (data) => dispatch(Action.queryMileStone(data)),
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
