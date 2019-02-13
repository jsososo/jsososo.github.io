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

import { Timeline, message, Select } from 'antd';
import timer from '../../utils/timer';
import { getQueryFromUrl } from "../../utils/stringHelper";
import recentlyUsed from '../../utils/recentlyUsed';
import Storage from '../../utils/Storage';
import * as Action from './actions';
import { checkLogIn } from "../App/index";
import arrayHelper from '../../utils/arrayHelper';

export class MileStone extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  // 页面加载或者更新之后都自动滚动到想要的位置
  componentDidMount() {
    if (checkLogIn('里程碑')) {
      recentlyUsed.set('里程碑', 'kit');
      this.getAllMileStone();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user.objectId && nextProps.user.objectId !== this.props.user.objectId) {
      this.getAllMileStone(nextProps.user);
    }
  }

  // 获取所有的里程碑
  getAllMileStone(user = this.props.user) {
    const [uid, username] = [user.objectId, user.username];
    if (!uid) {
      return;
    }
    const today = timer();
    Storage.queryBmob(
      'Thing',
      (q) => {
        q.equalTo('userId', uid);
        q.equalTo('milestone', true);
        q.limit(1000);

        return q;
      },
      (res = []) => {
        let tags = [];
        res.push({ id: 'today', time: today.time });
        res.forEach((t) => {
          if (t.tag) {
            tags.push(t.tag);
          }
          if (t.tag === '生日') {
            const newTime = timer(`${today.year}${timer(t.time).str('MMDD')}`, 'YYYYMMDD');
            t.time = newTime.time;
            if (newTime.str('YYYYMMDD') < today.str('YYYYMMDD')) {
              t.time = newTime.from(1, 'Y').time;
            }
          }
        });
        tags = arrayHelper.delDuplicate(tags);
        this.props.queryMileStone({
          list: res,
          tags,
        });
        this.selectMileStone(Storage.get(`mile-stone-tag-${username}`));
        this.pageScroll();
      },
      () => {
        message.error('找不到呀');
      },
      'find',
    );
  }

  // 根据tag去筛选
  selectMileStone(tag = '') {
    const { milestone, selectMileStone, user } = this.props;
    const list = {};
    // 放到localStorage里
    Storage.set(`mile-stone-tag-${user.username || '游客'}`, tag);
    milestone.rawList.forEach((item) => {
      if (tag && item.tag !== tag && item.id !== 'today') {
        return;
      }
      const dStr = timer(item.time).str();
      if (list[dStr]) {
        list[dStr].push(item);
      } else {
        list[dStr] = [item];
      }
    });
    selectMileStone({ list, tag });
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
          <div className="mb_20">
            Tag：
            <Select className="w_200 ml_20" value={milestone.selectTag} onChange={(v) => this.selectMileStone(v)}>
              <Select.Option value="">全部</Select.Option>
              {milestone.tags.map((t) => <Select.Option key={`mile-stone-tag-${t}`} value={t}>{t}</Select.Option>)}
            </Select>
          </div>
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
                            <span className={`${item.tag ? 'pl_15' : 'pl_20'} ft_16`} style={{ fontWeight: '900' }}>
                              {item.tag && `【${item.tag}】`}
                              {item.title || '还没起名字'}
                            </span>
                            <span className="pl_20">{timer().to(timer(item.time), 'str', 2)}</span>
                          </a>
                        </div>
                        <div className="fc_999" style={{ paddingLeft: '170px', wordBreak: 'break-all' }}>{item.content}</div>
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
  selectMileStone: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  milestone: makeSelectMileStone(),
  user: makeSelectUser(),
});

function mapDispatchToProps(dispatch) {
  return {
    queryMileStone: (data) => dispatch(Action.queryMileStone(data)),
    selectMileStone: (data) => dispatch(Action.selectMileStoneList(data)),
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
