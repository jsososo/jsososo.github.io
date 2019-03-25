/**
*
* Back
*
*/

import React from 'react';
import { Icon } from 'antd';
import PropTypes from 'prop-types';
// import styled from 'styled-components';


function Back({ url = '#/kit/' }) {
  return (
    <a href={url}>
      <Icon type="arrow-left" className="pointer ft_20 mr_20 mt_5 vat" />
    </a>
  );
}

Back.propTypes = {
  url: PropTypes.string,
};

export default Back;
