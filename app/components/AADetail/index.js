/**
*
* Aadetail
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import Record from './Record';

import timer from '../../utils/timer';
import Num from '../../utils/Num';
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

  renderBalance() {
    const { detail } = this.props;
    const info = detail.info || [];
    let av = 0;
    const result = [];
    const costArr = info.map((item) => {
      let c = 0;
      item.list.forEach((a) => c += a.num);
      c = Num(c, 2);
      return {
        cost: c,
        name: item.name,
      };
    });
    costArr.sort((a, b) => (a.cost - b.cost));
    costArr.forEach((item) => {
      av += item.cost;
    });
    av = Num(av / costArr.length, 2);
    let i = 0, j = costArr.length - 1;
    while (costArr[i] && i !== j) {
      const pay = Num(av - costArr[i].cost, 2);
      if (pay !== 0) {
        result.push(`${costArr[i].name}要给${costArr[j].name}¥${pay}`);
      }
      if (costArr[j].cost - av > pay) {
        costArr[j].cost -= pay;
        i += 1;
      } else {
        costArr[i].cost += pay;
        j -= 1;
      }
    }
    return result.join('，');
  }

  render() {
    const { detail } = this.props;
    return (
      <div className="aa-detail">
        <a href="#/kit/aa">
          <Icon type="arrow-left" className="pointer ft_20 mr_20 mt_5 vat" />
        </a>
        <h2 className="title fc_666 inline-block">{detail.title}</h2>
        <div className="balance-content mt_20 ml_20 ft_16">{this.renderBalance()}</div>
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
