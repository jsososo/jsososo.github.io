/**
 *
 * KitIndex
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
import makeSelectKitIndex from './selectors';
import { makeSelectBoxes, makeSelectUser } from "../App/selectors";
import reducer from './reducer';
import saga from './saga';
import { getBoxInfo } from "../App/actions";

import { queryBoxes } from "../App/actions";
import recentlyUsed from "../../utils/recentlyUsed";
import arrayHelper from "../../utils/arrayHelper";
import DataSaver from '../../utils/hydrogen';

import BoxComponent from "../../components/BoxesComponent";
import { message } from "antd";

export class KitIndex extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      boxes: props.boxes.kit || [],
    };
  }
  componentWillMount() {
    this.getBoxInfo();
  }

  async getRecentlyUsed() {
    const rU = await recentlyUsed.query('kit', this.state.boxes);
    const boxes = arrayHelper.delDuplicateObj([...rU, ...(this.props.boxes.kit)], ['name']);
    this.setState({
      boxes,
    });
  }
  getBoxInfo() {
    if (!this.state.boxes.length) {
      // 获取所有的子应用大致信息
      DataSaver.query({ table: 'BoxInfo' })
        .then((res) => {
          // 把box列表按照type为key名分来排好
          const boxInfo = {};
          res.forEach((item) => {
            if (!boxInfo[item.type]) {
              boxInfo[item.type] = [];
            }
            boxInfo[item.type].push(item);
          });
          this.props.getBoxInfo(boxInfo);
          this.setState({
            boxes: boxInfo.kit,
          }, this.getRecentlyUsed);
        }).catch((err) => {
          console.log(err);
          message.error('获取基本信息失败');
      });
    } else {
      this.getRecentlyUsed();
    }
  }

  render() {
    const { boxes } = this.state;
    return (
      <div>
        <Helmet>
          <title>没用的工具</title>
          <meta name="soso" content="没用的工具" />
        </Helmet>
        <div>
          {boxes.map((item, index) => (<BoxComponent key={`kit-box-${index}`} boxInfo={item} />))}
        </div>
      </div>
    );
  }
}

KitIndex.propTypes = {
  kitindex: PropTypes.object.isRequired,
  boxes: PropTypes.object.isRequired,
  queryKitBoxes: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  getBoxInfo: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  kitindex: makeSelectKitIndex(),
  boxes: makeSelectBoxes(),
  user: makeSelectUser(),
});

function mapDispatchToProps(dispatch) {
  return {
    queryKitBoxes: () => dispatch(queryBoxes(['kit'])),
    getBoxInfo: (data) => dispatch(getBoxInfo(data)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'kitIndex', reducer });
const withSaga = injectSaga({ key: 'kitIndex', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(KitIndex);
