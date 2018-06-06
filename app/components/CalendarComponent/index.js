/**
*
* CalendarComponent
*
*/

import React from 'react';
// import styled from 'styled-components';
import PropTypes from 'prop-types';
import './index.scss';

import { Icon, Badge, InputNumber, Button } from 'antd';

import timer, { getCalendar, formatNumber } from '../../utils/timer';


class CalendarComponent extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);

    this.state = {
      selectYear: false,
      selectMonth: false,
    };
  }

  /*
  *  修改日历
  *  @params y:       年
  *  @params m:       月
  *  @params needCal: 是否需要计算
  * */
  changeCalendar(y, m, needCal) {
    let {year, month} = this.props;
    if (needCal) {
      year += y;
      month += m;

      if (month === 13) {
        month = 1;
        year += 1;
      } else if (month === 0) {
        month = 12;
        year -= 1;
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
    const { year, month, selected, changeSelected, list } = this.props;
    const cArr = getCalendar(year, month);
    const isThisMonth = selected.month === month && selected.year === year;

    return (
      <div className="calendar-box">
        <div className="mb_20">
          <a href="#/kit/">
            <Icon type="arrow-left" className="pointer ft_20 mr_20 mt_5 vat"/>
          </a>
          <Button
            type="default"
            onClick={() => {
              this.changeCalendar(timer().year, timer().month);
              changeSelected(timer());
            }}
          >回到今天</Button>
          <Button type="primary" className="ml_20"><a href="#/kit/milestone?id=today">前往里程碑</a></Button>
        </div>
        <div className="calendar-header text-center">
          <div className="pull-left ft_16">
            <Icon type="double-left" className="mr_10" onClick={() => this.changeCalendar(-1, 0, true)} />
            <Icon type="left" onClick={() => this.changeCalendar(0, -1, true)} />
          </div>
          {
            !this.state.selectYear ?
            <span
              onClick={() => this.setState({ selectYear: true })}
              className="inline-block pointer"
              style={{ minWidth: '70px' }}
            >{year}</span> :
            <InputNumber
              min={100}
              autoFocus
              style={{ minWidth: '70px' }}
              defaultValue={year}
              onBlur={() => this.setState({ selectYear: false })}
              onChange={(v) => this.changeCalendar(Math.max(v, 100), month)}
            />
          }
          年
          {
            !this.state.selectMonth ?
              <span
                onClick={() => this.setState({ selectMonth: true })}
                className="inline-block pointer"
                style={{ minWidth: '40px' }}
              >{month}</span> :
              <InputNumber
                min={1}
                max={12}
                autoFocus
                style={{ minWidth: '40px' }}
                defaultValue={month}
                onBlur={() => this.setState({ selectMonth: false })}
                onChange={(v) => this.changeCalendar(year, Math.min(12, Math.max(1, v)))}
              />
          }
          月
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
                      className={`date-box ${d !== 0 && 'valued'} ${timer([year, month, d]).str('YYYYMMDD') === timer().str('YYYYMMDD') && 'today'} ${isThisMonth && d === selected.date && 'selected'}`}
                    >
                      <Badge
                        dot
                        count={list[`${year}${formatNumber(month)}${formatNumber(d)}`] ? list[`${year}${formatNumber(month)}${formatNumber(d)}`].length : 0}
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
  list: PropTypes.object.isRequired,
};

export default CalendarComponent;
