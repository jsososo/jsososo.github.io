/**
*
* CashBookCharts
*
*/

import React from 'react';
import LineChart from '../LineChart/Loadable';
import PieChart from '../PieChart/Loadable';
import PropTypes from 'prop-types';

import { Abs } from '../../utils/num';


import './style.scss';

// import styled from 'styled-components';


class CashBookCharts extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  handleData() {
    const { pieData, lineData } = this.props;

    const [incomePie, outcomePie, pie, selected] = [[], [], [], {}];
    pieData.forEach((item) => {
      if (item.name === '收入') {
        pie.push(item);
        return;
      }
      if (item.name === '支出') {
        item.value = Abs(item.value, 2);
        pie.push(item);
        return;
      }
      if (item.value > 0) {
        incomePie.push(item);
        return;
      }
      item.value = Abs(item.value, 2);
      outcomePie.push(item);
    });

    lineData.types.forEach((t) => {
      selected[t] = ['总额', '收入', '支出', '盈余'].indexOf(t) > -1;
    });
    return {
      pie,
      incomePie,
      outcomePie,
      selected,
    };
  }

  render() {
    const { lineData } = this.props;
    const { pie, incomePie, outcomePie, selected } = this.handleData();
    return (
      <div className="cashbook-page">
        <LineChart data={lineData.data} selected={selected} xAxis={lineData.xAxis} />
        <div>收入-支出</div>
        <PieChart data={pie} style={{ height: '500px' }} />
        <div>收入</div>
        <PieChart data={incomePie} style={{ height: '500px' }} />
        <div>支出</div>
        <PieChart data={outcomePie} style={{ height: '500px' }} />
      </div>
    );
  }
}

CashBookCharts.propTypes = {
  pieData: PropTypes.array,
  lineData: PropTypes.object,
};

export default CashBookCharts;
