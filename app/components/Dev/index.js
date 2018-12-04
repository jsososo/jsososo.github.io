/**
*
* Dev
*
*/

import React from 'react';
import Box from './box';
import Data from './data';
// import styled from 'styled-components';

import BraftEditor from 'braft-editor'
// 引入编辑器样式
import 'braft-editor/dist/index.css'


class Dev extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);

    this.state = {
      selected: '',
      editorState: BraftEditor.createEditorState(null)
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
              <li className="mt_10" onClick={() => this.setState({ selected: 'data' })}>删掉重复的提示</li>
            </ul>
        }
        { selected === 'box' && <Box goBack={() => this.goBack()} /> }
        { selected === 'data' && <Data goBack={() => this.goBack()} /> }
      </div>
    );
  }
}

Dev.propTypes = {

};

export default Dev;
