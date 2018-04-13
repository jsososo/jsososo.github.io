/**
*
* NotebookCard
*
*/

import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { Card, Button } from 'antd';
import timer from '../../utils/timer';
import { shortString } from "../../utils/stringHelper";

class NotebookCard extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { info } = this.props;
    return (
      <div className="inline-block vat" style={{ width: '20%', margin: '10px 2.5%' }}>
        <Card
          // extra={<span className="notebook-extra">删除</span>}
          onClick={() => { window.location = `#/kit/notebook/detail/?id=${info.id}`; }}
          title={info.title}
          hoverable
        >
          <div style={{ minHeight: '100px', wordBreak: 'break-all' }}>
            { info.content ? shortString(info.content, 57) : '啥都没有。。。'}
          </div>
          <div className="pull-right ft_12 fc_999">上次编辑时间：{timer(info.lastEditTime).str('YY-M-D H:m:s')}</div>
        </Card>
      </div>
    );
  }
}

NotebookCard.propTypes = {
  info: PropTypes.object.isRequired,
  delNote: PropTypes.func.isRequired,
};

export default NotebookCard;
