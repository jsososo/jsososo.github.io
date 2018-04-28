/**
*
* ModuleLoading
*
*/

import React from 'react';
import { Icon } from 'antd';
// import styled from 'styled-components';


class ModuleLoading extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div className="text-center" style={{ width: '100%', paddingTop: '50px' }}>
        <Icon type="loading" style={{ fontSize: '30px' }} />
      </div>
    );
  }
}

ModuleLoading.propTypes = {

};

export default ModuleLoading;
