/**
*
* Avator
*
*/

import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';


class Avator extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { user } = this.props;
    return (
      <div className="header-avatar" onClick={() => window.location = '#/user'}>
        <div className="avatar-content">{user.avatar || (user.username && user.username.substring(0, 1))}</div>
      </div>
    );
  }
}

Avator.propTypes = {
  user: PropTypes.object,
};

export default Avator;
