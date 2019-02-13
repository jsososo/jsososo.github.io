import React from 'react';
import PropTypes from 'prop-types';

import { Icon } from 'antd';

import { shortString } from "../../utils/stringHelper";
import timer from '../../utils/timer';

const clsMap = {
  'bg-blue': '',
  'bg-gray': 'FAIL',
  'bg-green': 'SUCCESS',
};

class ListItem extends React.PureComponent {
  getClsName() {
    const { item } = this.props;
    if (item.current >= item.total) {
      return 'bg-green';
    }
    if (timer().time > item.endTime && item.current < item.total) {
      return 'bg-gray';
    }
    return 'bg-blue';
  }

  render() {
    const { item, delPiggy } = this.props;
    // 进度
    let progress = Math.round((item.current * 10000) / item.total) / 100;
    const clsName = this.getClsName();
    progress = progress > 100 ? 100 : (progress < 0 ? 0 : progress);
    return (
      <div className="piggy-list-item">
        <div className="piggy-item-background">
          <div className={`piggy-item-bg ${clsName}`} style={{ width: `${clsName === 'bg-red' ? 100 : progress}%` }}>
            {clsMap[clsName]}
          </div>
          <div className="p-bg-white" />
        </div>
        <a href={`#/kit/piggy?id=${item.objectId}`}>
          <span className="inline-block" style={{ minWidth: '350px' }}>{shortString(item.title)}</span>
        </a>
        <Icon className="del-btn" type="delete" onClick={delPiggy} />
        <span className="pull-right">{progress}%</span>
      </div>
    );
  }
}

ListItem.propTypes = {
  item: PropTypes.object.isRequired,
  delPiggy: PropTypes.func.isRequired,
};

export default ListItem;
