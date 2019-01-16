/**
*
* LineChart
*
*/

import React from 'react';
import ReactEchart from 'echarts-for-react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';


class LineChart extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  chartOption() {
    const data = this.props.data;
    const selected = this.props.selected;
    const series = [];
    const legend = [];
    Object.keys(data).forEach((item) => {
      const d = data[item];
      legend.push(d.name);
      series.push({
        name: d.name,
        type: 'line',
        smooth: true,
        data: d.value,
        itemStyle: {
          normal: {
            areaStyle: { type: 'default', opacity: 0.2 },
          },
        },
      });
    });
    return {
      color: ['#39a9a9', '#39f', '#966', '#9f9', '#9f0', '#069', '#fbb500', '#cc3ee4', '#Faa', '#fb0000', '#93c', '#390', '#8f69da', '#ff3', '#484848', '#0c3', '#f9f', '#99f', '#f17625', '#02b8d0', '#3f3', '#f69', '#999', '#990', '#1a6d5c', '#c0ca62', '#0052ff', '#fbb998', '#3ff', '#b7798e'],
      tooltip: {
        trigger: 'axis',
      },
      legend: {
        top: '0',
        data: legend,
        selected: selected || {},
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
      },
      xAxis: [
        {
          type: 'category',
          data: this.props.xAxis,
        },
      ],
      yAxis: [
        {
          type: 'value',
        },
      ],
      series,
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

LineChart.propTypes = {
  data: PropTypes.object,
  xAxis: PropTypes.array,
  style: PropTypes.object,
  selected: PropTypes.object,
};

export default LineChart;
