/**
*
* HeaderComponent
*
*/
import './index.scss';
import React from 'react';
import {Link} from 'react-router-dom';
import Input from 'antd/lib/input';
import PropTypes from 'prop-types';
// import styled from 'styled-components';


class HeaderComponent extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div className="header-box">
        <div className="header">
          <h1><a href="#/">首页</a></h1>
          <h1><a href="#/kit">没用的工具</a></h1>
          <h1><a href="#/img">二刺螈壁纸</a></h1>
        </div>
        <Input.Search className="header-search" onSearch={(v) => { window.location = `#/search?search=${encodeURI(v)}`; }} />
      </div>
    );
  }
}

HeaderComponent.propTypes = {
  history: PropTypes.object,
};

export default HeaderComponent;
