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
    const iS = boxInfo.imgSize;
    const iP = (100 - iS) / 2;
    return (
      <a href={boxInfo.url}>
        <div className="box-component">
          <div className="box-bg-color" style={{ background: boxInfo.color }} />
          <div
            style={{ background: `url(${boxInfo.img}) no-repeat`, backgroundSize: `${iS}px ${iS}px`, backgroundPosition: `${iP}px ${iP}px` }}
            className="box-bg-img"
          />
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
