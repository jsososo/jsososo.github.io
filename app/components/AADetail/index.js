/**
*
* Aadetail
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import Record from './Record';

import timer from '../../utils/timer';
import { Icon } from 'antd';
// import styled from 'styled-components';


class Aadetail extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  componentWillMount() {
    this.props.getDetail();
  }

  updateFun(list, i) {
    const { detail } = this.props;
    detail.info[i].list = list;
    this.props.updateFun(detail);
  }

  transferRecord(u1, u2, num) {
    const { detail } = this.props;
    const info = detail.info.find((i) => i.name === u1);
    info.list.unshift({
      time: timer().time,
      desc: `收到${u2}的转账`,
      num,
    });
    this.updateFun(info.list, detail.users.indexOf(u1));
  }
  render() {
    const { detail } = this.props;
    return (
      <div className="aa-detail">
        <a href="#/kit/aa">
          <Icon type="arrow-left" className="pointer ft_20 mr_20 mt_5 vat"/>
        </a>
        <h2 className="title fc_666 inline-block">{detail.title}</h2>
        <div className="record-container">
          {
            detail.info && detail.info.map((record, i) =>
              <Record
                users={detail.users}
                updateFun={(list) => this.updateFun(list, i)}
                total={detail.info.length}
                key={`record-${i}`}
                info={record}
                transferFun={(u1, u2, num) => this.transferRecord(u1, u2, num)}
              />)
          }
        </div>
      </div>
    );
  }
}

Aadetail.propTypes = {
  getDetail: PropTypes.func.isRequired,
  detail: PropTypes.object.isRequired,
  updateFun: PropTypes.func.isRequired,
};

export default Aadetail;
