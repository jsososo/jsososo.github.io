/**
*
* BoxesComponent
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';
// import styled from 'styled-components';


class BoxesComponent extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { boxInfo } = this.props;
    return (
      <a href={boxInfo.url}>
        <div className="box-component">
          <div className="box-bg-color" style={{ background: boxInfo.color }} />
          <div style={{ background: `url(${boxInfo.img})`, backgroundSize: '100px 100px' }} className="box-bg-img" />
          <div className="box-name">{boxInfo.name}</div>
        </div>
      </a>
    );
  }
}

BoxesComponent.propTypes = {
  boxInfo: PropTypes.object.isRequired,
};

export default BoxesComponent;
