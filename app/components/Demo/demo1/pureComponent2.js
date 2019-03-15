import React from 'react';
import PropTypes from 'prop-types';

class C4 extends React.PureComponent {
  shouldComponentUpdate(nextProps, nextState) {
    console.log({ ...nextProps }, { ...this.props });
    return true;
  }

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
        <span className="ft_18 inline-block" style={{ width: '420px' }}>PureComponent (shouldComponentUpdate): </span>
        <span>{value}</span>
      </div>
    );
  }
}

C4.propTypes = {
  val: PropTypes.string,
  obj: PropTypes.object,
  arr: PropTypes.array,
  type: PropTypes.string,
};

export default C4;
