import React from 'react';
import PropTypes from 'prop-types';
import { Input } from 'antd';

class C5 extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      val: '',
      obj: { val: '' },
      arr: [''],
    };
  }

  onChange(val) {
    const state = { ...this.state };
    switch (this.props.type) {
      case 'string':
        state.val = val;
        break;
      case 'obj':
        state.obj.val = val;
        break;
      case 'arr':
        state.arr[0] = val;
        break;
      default: break;
    }
    this.setState(state);
  }

  render() {
    const { type } = this.props;
    const { val, obj, arr } = this.state;
    let value = val;
    if (type === 'obj') {
      value = obj.val;
    } else if (type === 'arr') {
      value = arr[0];
    }

    return (
      <div className="mt_20">
        <Input value={value} onChange={(e) => this.onChange(e.target.value)} />
        <span className="ft_18 inline-block" style={{ width: '420px' }}>PureComponent ( state ): </span>
        <span>{value}</span>
      </div>
    );
  }
}

C5.propTypes = {
  type: PropTypes.string,
};

export default C5;
