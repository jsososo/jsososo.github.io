/**
*
* TravelList
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import Back from '../Back';
import './index.scss';

// import styled from 'styled-components';


class TravelList extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { list = [], changeUrl, createTravel } = this.props;
    return (
      <div className="travel-list-container">
        <Back />
        <Button type="primary" onClick={createTravel}>新建一个计划</Button>
        <div className="travel-list">
          {list.map((item) => (
            <div className="travel-list-item" key={item.objectId} onClick={() => changeUrl({ id: item.objectId })}>
              <span className="inline-block" style={{ width: '350px' }}>{item.title || '没说去哪儿呀'}</span>
              <span>{item.updatedAt}</span>
            </div>
          ))}
          { list.length === 0 && <span>空空如也，考虑建一个去往远方的计划嘛</span>}
        </div>
      </div>
    );
  }
}

TravelList.propTypes = {
  list: PropTypes.array,
  changeUrl: PropTypes.func,
  createTravel: PropTypes.func,
};

export default TravelList;
