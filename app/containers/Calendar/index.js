/**
 *
 * Calendar
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
import makeSelectCalendar from './selectors';
import reducer from './reducer';
import saga from './saga';

import timer from '../../utils/timer';
import recentlyUsed from '../../utils/recentlyUsed';
import * as Action from './actions';

import CalendarComponent from '../../components/CalendarComponent';
import CalendarList from '../../components/CalendarList';
import { getQueryFromUrl} from "../../utils/stringHelper";
import Storage from '../../utils/Storage';
import { makeSelectUser } from "../App/selectors";
import { changeUrlQuery } from "../../utils/stringHelper";
import { checkLogIn } from '../App/index';
import arrayHelper from '../../utils/arrayHelper';

import { message } from 'antd';

export class Calendar extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  componentWillMount() {
    if (this.props.user.username !== '游客') {
      recentlyUsed.set('日历', 'kit', this.props.user.username);
    }
    this.updateFromUrl(this.props);
    this.getAllThing();
  }

  componentWillReceiveProps(nextProps) {
    this.updateFromUrl(nextProps);
  }

  // 获取当前用户的所有事情列表
  getAllThing(cb) {
    const { user } = this.props;
    Storage.queryBmob(
      'Thing',
      (q) => {
        q.equalTo('user', user.username || '游客');
        q.limit(1000);
        return q;
      },
      (res) => {
        const calendarList = {};
        // 默认的tag
        let tags = ['生日', '纪念', '远方'];
        // 对于生日的，给往后50年都记上
        res.forEach((item) => {
          if (item.tag === '生日') {
            let count = 0;
            while (count < 50) {
              count += 1;
              const newThing = JSON.parse(JSON.stringify(item));
              newThing.time = timer(item.time).from(count, 'Y').time;
              res.push(newThing);
            }
          }
        });
        // 把事件按照日期为 key 进行分类
        res.forEach((item) => {
          if (item.time) {
            const dStr = timer(item.time).str('YYYYMMDD');
            if (!calendarList[dStr]) {
              calendarList[dStr] = [];
            }
            calendarList[dStr].push(item);
          }
          if (item.tag) {
            tags.push(item.tag);
          }
        });
        // 一口气去重
        tags = arrayHelper.delDuplicate(tags);
        this.props.queryList({
          list: calendarList,
          tags,
        });
        if (cb) {
          cb();
        }
      },
      () => message.error('获取事件失败'),
      'find',
    );
  }

  // 新建一件事
  createThing(selected) {
    if (!checkLogIn('创建时间', () => {})) {
      return false;
    }
    const { user } = this.props;
    Storage.createBmob(
      'Thing',
      {
        user: user.username,
        time: selected.time,
        milestone: false,
        notice: false,
        title: '',
        content: '',
        tag: '',
        reminder: [],
        periodicReminder: [],
      },
      (res) => this.getAllThing(() => {
        changeUrlQuery({
          id: res.id,
          edit: true,
        });
      }),
      () => message.error('创建失败 = ='),
    );
  }

  // 根据传入的url更新一些状态
  updateFromUrl(props) {
    const { changeCalendarInfo, calendar } = props;
    const date = getQueryFromUrl('date') || timer().str();

    if (date !== calendar.selected.str()) {
      changeCalendarInfo({
        year: Number(date.split('-')[0]),
        month: Number(date.split('-')[1]),
      });
      this.changeSelected(timer(date, 'YYYY-MM-DD'));
    }
  }

  // 修改选择的日期
  changeSelected(data) {
    changeUrlQuery({
      date: timer(data).str(),
      id: undefined,
      edit: undefined,
    });
    this.props.changeSelectedDate(data);
  }

  // 保存修改
  saveThing(thing, cb) {
    // 生日类的，避免修改时间影响前面
    if (thing.tag === '生日') {
      delete thing.time;
    }
    Storage.setBmob(
      'Thing',
      thing.objectId,
      thing,
      () => {
        this.getAllThing(cb);
      },
      () => {
        message.error('保存出错了 > <!!');
      }
    );
  }

  // 删除一件事
  delThing(thing, cb) {
    Storage.delBmob(
      'Thing',
      thing.objectId,
      () => {
        this.getAllThing(cb);
      },
      () => {
        message.error('删除失败了 -。-');
      }
    );
  }

  render() {
    const { calendar, changeCalendarInfo, user } = this.props;
    const { calendarInfo, selected, list, tags } = calendar;
    return (
      <div>
        <Helmet>
          <title>日历</title>
          <meta name="description" content="Description of Calendar" />
        </Helmet>
        <div>
          <CalendarComponent
            changeSelected={(data) => this.changeSelected(data)}
            changeCalendar={changeCalendarInfo}
            {...calendarInfo}
            selected={selected}
            list={list}
            tags={tags}
            user={user}
          />
          <CalendarList
            saveThing={(t, cb) => this.saveThing(t, cb)}
            createThing={(s) => this.createThing(s)}
            thingId={getQueryFromUrl('id')}
            list={list}
            selected={selected}
            tags={tags}
            delThing={(thing, cb) => this.delThing(thing, cb)}
          />
        </div>
      </div>
    );
  }
}

Calendar.propTypes = {
  calendar: PropTypes.object.isRequired,
  changeCalendarInfo: PropTypes.func.isRequired,
  changeSelectedDate: PropTypes.func.isRequired,
  queryList: PropTypes.func.isRequired,
  user: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  calendar: makeSelectCalendar(),
  user: makeSelectUser(),
});

function mapDispatchToProps(dispatch) {
  return {
    changeCalendarInfo: (data) => dispatch(Action.changeCalendarInfo(data)),
    changeSelectedDate: (data) => dispatch(Action.changeSelectedDate(data)),
    updateList: (data) => dispatch(Action.updateList(data)),
    queryList: (data) => dispatch(Action.queryList(data)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'calendar', reducer });
const withSaga = injectSaga({ key: 'calendar', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Calendar);
