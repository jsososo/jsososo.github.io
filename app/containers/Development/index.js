/**
 *
 * Development
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectDevelopment from './selectors';
import { makeSelectUser } from "../App/selectors";
import reducer from './reducer';
import saga from './saga';

import Dev from '../../components/Dev/index';

import { Button, Input, message, Icon } from 'antd';
import DataSaver from '../../utils/hydrogen';
import { shortString } from "../../utils/stringHelper";
import Qn from '../../utils/qiniu';

const TextArea = Input.TextArea;

export class Development extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);

    this.state = {
      selected: '',
    };
  }

  // 只有 soso 有超级权限
  componentDidMount() {
    const { user } = this.props;
    if (user.username !== 'soso') {
      window.location = '#/';
    }
  }

  copyContent(id) {
    try {
      const range = document.createRange();
      const dom = document.getElementById(id);
      range.selectNode(dom);
      dom.focus();
      dom.setSelectionRange(0, dom.value.length);
      document.execCommand && document.execCommand('copy');
      message.success('复制成功，去尽情粘贴');
    } catch (err) {
      message.success('你的浏览器也太垃圾了');
    }
  }

  render() {
    const { selected } = this.state;
    return (
      <div>
        <Helmet>
          <title>开发者</title>
          <meta name="jsososo" content="开发者~" />
        </Helmet>
        <div>
          <h3>开一个开发者后门</h3>
          <Dev />
          {/*<div className="mt_20">
            <div>
              localStorage搬移大发
              <Button type="primary" className="ml_20" onClick={() => this.copyContent('local-storage-content')}>复制</Button>
            </div>
            <TextArea
              value={'var P_L_O = JSON.parse(decodeURI("' + encodeURI(JSON.stringify(window.localStorage)) + '")); Object.keys(P_L_O).forEach(key=>{window.localStorage.setItem(key,P_L_O[key])});'}
              id="local-storage-content"
              className="pd_10 mt_10"
              rows={4}
              style={{border: '1px solid #666', borderRadius: '5px', background: '#333', color: '#ccc'}}
            />
          </div>*/}
        </div>
      </div>
    );
  }
}

Development.propTypes = {
  dispatch: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  development: makeSelectDevelopment(),
  user: makeSelectUser(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'development', reducer });
const withSaga = injectSaga({ key: 'development', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Development);
