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
import {getQueryFromUrl} from "../../utils/stringHelper";

export class Calendar extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  componentWillMount() {
    recentlyUsed.set('日历', 'kit');
    this.updateFromUrl(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.updateFromUrl(nextProps);
  }

  updateFromUrl(props) {
    const { location, changeCalendarInfo, calendar } = props;
    const date = getQueryFromUrl(location.search, 'date') || timer().str();

    if (date !== calendar.selected.str()) {
      changeCalendarInfo({
        year: Number(date.split('-')[0]),
        month: Number(date.split('-')[1]),
      });
      this.changeSelected(timer(date, 'YYYY-MM-DD'));
    }
  }

  changeSelected(data) {
    this.props.history.push(`?date=${timer(data).str()}&id=${Number(getQueryFromUrl(this.props.location.search, 'id') || 0)}`);
    this.props.changeSelectedDate(data);
    this.props.queryList(timer(data).str('YYYYMMDD'));
  }

  updateList(data) {
    window.localStorage.setItem('p_c_list', JSON.stringify(data));
    this.props.updateList(data);
    this.props.queryList(this.props.calendar.selected.str('YYYYMMDD'));
  }

  render() {
    const { calendar, changeCalendarInfo, history, location } = this.props;
    const { calendarInfo, selected, localList, list } = calendar;
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
            localList={localList}
          />
          <CalendarList
            thingId={Number(getQueryFromUrl(location.search, 'id') || 0)}
            localList={localList}
            list={list}
            selected={selected}
            history={history}
            updateList={(d) => this.updateList(d)}
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
  updateList: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  calendar: makeSelectCalendar(),
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
