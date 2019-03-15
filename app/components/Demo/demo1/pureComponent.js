import React from 'react';
import PropTypes from 'prop-types';

class C2 extends React.PureComponent {
  render() {
    const { val, obj, arr, type, sub } = this.props;
    let value = val;
    if (type === 'obj') {
      value = obj.val;
    } else if (type === 'arr') {
      value = arr[0];
    }

    return (
      <div>
        <span className="ft_18 inline-block" style={{ width: '420px' }}>PureComponent{sub}: </span>
        <span>{value}</span>
      </div>
    );
  }
}

C2.propTypes = {
  val: PropTypes.string,
  obj: PropTypes.object,
  arr: PropTypes.array,
  type: PropTypes.string,
  sub: PropTypes.string,
};

export default C2;
