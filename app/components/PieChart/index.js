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
      color: ['#ff0', '#39f', '#93c', '#ff3', '#96f', '#9ff', '#399', '#ff9', '#390', '#ffc', '#9f9', '#966', '#f96', '#3ff', '#f9f', '#99f','#f60', '#3f3','#f69', '#999', '#F33', '#990','#f3c', '#9f0'],
      tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)",
      },
      legend: {
        orient: 'vertical',
        left: '68%',
        top: 30 + ((17-legend.length) * 12 > 0 ? (17-legend.length) * 12 : 0),
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
