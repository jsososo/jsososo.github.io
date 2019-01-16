import React from 'react';
import PropTypes from 'prop-types';

import timer, { getCalendar } from "../../utils/timer";
import { InputNumber } from 'antd';

class Calendar extends React.Component {
  constructor(props) {
    super(props);

    const date = timer();
    this.state = {
      year: date.year,
      month: date.month,
    };
  }

  getWeekClsName(w) {
    const { detail } = this.props;

    if (detail.type !== 'W') {
      return '';
    }
    if (w < timer(detail.startTime).week() || w > timer(detail.endTime).week()) {
      return 'bg-gray';
    }

    const date = timer();
    if (date.week() < w) {
      return '';
    }
    return detail.record[w] >= detail.average ? 'bg-green' : 'bg-red';
  }

  getDateNum(date) {
    const { detail } = this.props;
    let num = 0;
    detail.log.forEach((r) => {
      if (r.key >= date.todayStart && r.key <= date.todayEnd) {
        num += r.num;
      }
    });
    return num ? `¥${num}` : '';
  }

  getWeek(d) {
    const { year, month } = this.state;
    return timer([year, month, d || 1]).week();
  }

  getDateClsName(y, m, d) {
    const { detail } = this.props;
    if (d === 0 || detail.type !== 'D') {
      return '';
    }
    const date = timer([y, m, d]);
    const record = detail.record[date.str('YYYYMMDD')];
    if (date.time < detail.startTime || date.time > detail.endTime) {
      return 'bg-gray';
    }
    if (date.time > timer().time) {
      return '';
    }
    if (record >= detail.average) {
      return 'bg-green';
    }
    return 'bg-red';
  }

  changeTime(type, value) {
    const { state } = this;
    state[type] = value;
    if (state.month <= 0) {
      state.month += 12;
      state.year -= 1;
    } else if (state.month > 12) {
      state.month -= 12;
      state.year += 1;
    }
    this.setState(state);
  }

  getMonthClsName(year, month) {
    const { detail } = this.props;
    if (detail.type !== 'M') {
      return '';
    }

    const date = timer([year, month, 1]).str('YYYYMM');
    const start = timer(detail.startTime).str('YYYYMM');
    const end = timer(detail.endTime).str('YYYYMM');
    const now = timer().str('YYYYMM');
    if (date < start || date > end) {
      return 'bg-gray';
    }
    if (date > now) {
      return '';
    }
    if (detail.record[date] >= detail.average) {
      return 'bg-green';
    }
    return 'bg-red';
  }

  render() {
    const { year, month } = this.state;
    const { detail } = this.props;
    const cInfo = getCalendar(year, month);
    return (
      <div className="text-center piggy-log-calendar">
        <div className="mt_20 mb_20">
          <InputNumber
            style={{ width: '70px' }}
            precision={0}
            value={year}
            onChange={(v) => this.changeTime('year', v)}
          />年
          <InputNumber
            className="ml_10"
            style={{ width: '60px' }}
            precision={0}
            value={month}
            onChange={(v) => this.changeTime('month', v)}
          />月
          {
            detail.type === 'M' && detail.record[timer([year, month, 1]).str('YYYYMM')] &&
              <span style={{ position: 'absolute', right: '200px', lineHeight: '35px' }} className="fc_blue">
                ¥{detail.record[timer([year, month, 1]).str('YYYYMM')]}
              </span>
          }
        </div>
        <div className={`piggy-calendar-container ${this.getMonthClsName(year, month)}`}>
          { cInfo.map((w) => (
            <div
              className={`piggy-calendar-week ${this.getWeekClsName(this.getWeek(w[0]))}`}
              key={this.getWeek(w[0])}
            >
              { w.map((d, i) => (
                <div className={`piggy-calendar-date ${this.getDateClsName(year, month, d)}`} key={`${year}-${month}-${d}-${i}`}>
                  { d !== 0 &&
                    <div>
                      <div>{d}</div>
                      <div className="mt_5">{this.getDateNum(timer([year, month, d]))}</div>
                    </div>
                  }
                </div>
              ))}
              {
                // 每周的总数统计
                detail.type === 'W' &&
                <div className="piggy-calendar-date record-week">
                  {
                    detail.record[this.getWeek(w[0])] &&
                    `¥${detail.record[this.getWeek(w[0])]}`
                  }
                </div>
              }
            </div>
          )) }
        </div>
      </div>
    );
  }
}

Calendar.propTypes = {
  detail: PropTypes.object.isRequired,
};

export default Calendar;
