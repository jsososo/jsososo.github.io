/**
*
* CalendarComponent
*
*/

import React from 'react';
// import styled from 'styled-components';
import PropTypes from 'prop-types';
import './index.scss';

import { Icon, Badge } from 'antd';

import timer, { getCalendar, formatNumber } from '../../utils/timer';


class CalendarComponent extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  changeCalendar(y, m, needCal) {
    let {year, month} = this.props;
    if (needCal) {
      year += y;
      month += m;

      if (month === 13) {
        month = 1;
        year++;
      } else if (month === 0) {
        month = 12;
        year--;
      }
    } else {
      year = y;
      month = m;
    }
    this.props.changeCalendar({
      year,
      month,
    });
  }

  render() {
    const { year, month, selected, changeSelected, localList } = this.props;
    const cArr = getCalendar(year, month);
    const isThisMonth = selected.month === month && selected.year === year;

    return (
      <div className="calendar-box">
        <div className="calendar-header text-center">
          <div className="pull-left ft_16">
            <Icon type="double-left" className="mr_10" onClick={() => this.changeCalendar(-1, 0, true)} />
            <Icon type="left" onClick={() => this.changeCalendar(0, -1, true)} />
          </div>
          <span>{year}</span>年
          <span>{month}</span>月
          <div className="pull-right ft_16">
            <Icon type="right" onClick={() => this.changeCalendar(0, 1, true)} />
            <Icon type="double-right" className="ml_10" onClick={() => this.changeCalendar(1, 0, true)} />
          </div>
        </div>
        <div className="calendar-body">
          <div className="week-day-box week-box">
            {'日一二三四五六'.split('').map((item, index) => (
              <div className="date-box" key={`c-week-day-${index}`}>
                {item}
              </div>
            ))}
          </div>
          {
            cArr.map((w, i1) => (
              <div className="week-box" key={`c-${month}-${i1}`}>
                {
                  w.map((d, i2) =>
                    <div
                      key={`c-${month}-${d}-${i2}`}
                      onClick={() => d !== 0 && changeSelected(timer([year, month, d]))}
                      className={`date-box ${d !== 0 && 'valued'} ${isThisMonth && d === timer().date && 'today'} ${isThisMonth && d === selected.date && 'selected'}`}
                    >
                      <Badge
                        dot
                        count={localList[`${year}${formatNumber(month)}${formatNumber(d)}`] ? localList[`${year}${formatNumber(month)}${formatNumber(d)}`].length : 0}
                      ><span className="pr_5 pt_5">{d !== 0 && d}</span></Badge>
                    </div>
                  )
                }
              </div>
            ))
          }
        </div>
      </div>
    );
  }
}

CalendarComponent.propTypes = {
  year: PropTypes.number.isRequired,
  month: PropTypes.number.isRequired,
  selected: PropTypes.object.isRequired,
  changeCalendar: PropTypes.func.isRequired,
  changeSelected: PropTypes.func.isRequired,
  localList: PropTypes.object.isRequired,
};

export default CalendarComponent;
