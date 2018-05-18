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

import { Icon } from 'antd';
// import styled from 'styled-components';


class HeaderComponent extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);

    this.state = {
      pathname: window.location.hash,
    };
  }

  componentDidMount() {
    window.onhashchange = () => {
      this.setState({
        pathname: window.location.hash,
      });
    };
  }
  render() {
    const { pathname } = this.state;
    return (
      <div className="header-box">
        <div className="header">
          <a href="#/" className={`header-link ${pathname === '#/' ? 'hover' : ''}`}>
            <h1 className="header-item">
              <Icon type="home" />
              <span className="header-title-txt">首页</span>
            </h1>
          </a>
          <a href="#/kit" className={`header-link ${pathname.indexOf('#/kit') === 0 ? 'hover' : ''}`}>
            <h1 className="header-item">
              <Icon type="appstore" />
              <span className="header-title-txt">没用的工具</span>
            </h1>
          </a>
          <a href="//github.com/jsososo" className="header-link" target="_blank">
            <h1 className="header-item">
              <Icon type="github" />
              <span className="header-title-txt">同性交友网</span>
            </h1>
          </a>
          {/*<h1><a href="#/img">二刺螈壁纸</a></h1>*/}
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
