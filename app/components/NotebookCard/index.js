/**
*
* NotebookCard
*
*/

import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { Card } from 'antd';
import timer from '../../utils/timer';
import { shortString } from "../../utils/stringHelper";

class NotebookCard extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { info } = this.props;
    return (
      <div className="inline-block vat" style={{ width: '20%', margin: '10px 2.5%' }}>
        <Card
          onClick={() => { window.location = `#/kit/notebook/detail/?id=${this.props.info.objectId}`; }}
          title={info.title || '无题'}
          hoverable
        >
          <div style={{ minHeight: '100px', wordBreak: 'break-all' }}>
            { info.shortContent || '啥都没有。。。' }
          </div>
          <div className="pull-right ft_12 fc_999">上次编辑时间：{timer(info.lastEdit).str('YY-M-D HH:mm:ss')}</div>
        </Card>
      </div>
    );
  }
}

NotebookCard.propTypes = {
  info: PropTypes.object.isRequired,
};

export default NotebookCard;
