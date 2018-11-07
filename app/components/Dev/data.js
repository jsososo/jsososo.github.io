import React from 'react';
import PropTypes from 'prop-types';
import { Icon, Button, Input, message } from 'antd';
import Storage from '../../utils/Storage';
import timer from '../../utils/timer';

class Data extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
      inputTable: '',
      list: [],
      userNameKey: '',
    };
  }

  componentWillMount() {
    Storage.queryBmob('NoticeSetting', null, (res) => {
      res.sort((a, b) => timer(a.craetedAt).time - timer(b.craetedAt).time);
      const obj = {};
      res.forEach((item) => {
        const key = `${item.tag}-${item.username}`;
        if (obj[key]) {
          Storage.delBmob('NoticeSetting', item.objectId);
        }
        obj[key] = 1;
      })
    }, null, 'find');
  }

  render() {
    const { goBack } = this.props;
    const { users, list } = this.state;
    return (
      <div className="mt_20">
        <div>
          <Icon type="arrow-left" className="pointer ft_20 mr_10 mt_5" onClick={goBack} />
        </div>
      </div>
    );
  }
}

Data.propTypes = {
  goBack: PropTypes.func.isRequired,
}

export default Data;
