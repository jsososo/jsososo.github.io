/**
*
* Icon
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import './icon/iconfont.css';
// import styled from 'styled-components';


function Icon({
                type,
                active,
                color = active ? '#3089DC' : '',
                size = 16,
                style,
                height = size,
                className = '',
                attr = {},
                onClick = null,
              }) {
  return (
    <span className={`inline-block ${className}`} onClick={onClick}>
      <span
        className={`iconfont icon-${type}`}
        {...attr}
        style={{
          fontSize: `${size}px`,
          color,
          height,
          lineHeight: `${height}px`,
          display: 'inline-block',
          ...style,
        }}
      >
      </span>
    </span>
  );
}

Icon.propTypes = {
  type: PropTypes.string.isRequired,
  active: PropTypes.bool,
  height: PropTypes.number,
  color: PropTypes.string,
  size: PropTypes.number,
  style: PropTypes.object,
  className: PropTypes.string,
  attr: PropTypes.object,
  onClick: PropTypes.func,
};

export default Icon;
