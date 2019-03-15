import React from 'react';
import PropTypes from 'prop-types';

class C1 extends React.Component {
  render() {
    const { val, obj, arr, type } = this.props;
    let value = val;
    if (type === 'obj') {
      value = obj.val;
    } else if (type === 'arr') {
      value = arr[0];
    }

    return (
      <div>
        <span className="ft_18 inline-block" style={{ width: '420px' }}>Component: </span>
        <span>{value}</span>
      </div>
    );
  }
}

C1.propTypes = {
  val: PropTypes.string,
  obj: PropTypes.object,
  arr: PropTypes.array,
  type: PropTypes.string,
};

export default C1;
