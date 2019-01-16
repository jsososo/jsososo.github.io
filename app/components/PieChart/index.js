/**
*
* PieChart
*
*/

import React from 'react';
import ReactEchart from 'echarts-for-react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';


class PieChart extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  chartOption() {
    const data = this.props.data;
    const legend = [];
    data.forEach((d) => legend.push(d.name));
    return {
      color: ['#39a9a9', '#9f9', '#966', '#39f', '#9f0', '#069', '#fbb500', '#cc3ee4', '#Faa', '#fb0000', '#93c', '#390', '#8f69da', '#ff3', '#484848', '#0c3', '#f9f', '#99f', '#f17625', '#02b8d0', '#3f3', '#f69', '#999', '#990', '#1a6d5c', '#c0ca62', '#0052ff', '#fbb998', '#3ff', '#b7798e'],
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)',
      },
      legend: {
        orient: 'vertical',
        left: '68%',
        top: 30 + ((17 - legend.length) * 12 > 0 ? (17 - legend.length) * 12 : 0),
        data: legend,
        type: 'scroll',
      },
      series: [
        {
          type: 'pie',
          radius: '48%',
          center: ['35%', '50%'],
          data,
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
            },
          },
        },
      ],
    };
  }
  render() {
    return (
      <ReactEchart
        style={this.props.style}
        option={this.chartOption()}
      />
    );
  }
}

PieChart.propTypes = {
  data: PropTypes.array,
  style: PropTypes.object,
};

export default PieChart;
