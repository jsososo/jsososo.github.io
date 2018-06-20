/**
*
* Dev
*
*/

import React from 'react';
import Box from './box';
// import styled from 'styled-components';


class Dev extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);

    this.state = {
      selected: '',
    };
  }

  goBack() {
    this.setState({
      selected: '',
    });
  }

  render() {
    const { selected } = this.state;
    return (
      <div className="mt_20">
        {
          selected === '' &&
            <ul style={{ listStyleType: 'none', fontSize: '16px' }} className="pointer">
              <li className="mt_10" onClick={() => this.setState({ selected: 'box' })}>box信息</li>
            </ul>
        }
        {
          selected === 'box' && <Box goBack={() => this.goBack()} />
        }
      </div>
    );
  }
}

Dev.propTypes = {

};

export default Dev;
