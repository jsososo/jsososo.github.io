import React from 'react';
import PropTypes from 'prop-types';

const C3 = ({ val, obj, arr, type }) => {
  let value = val;
  if (type === 'obj') {
    value = obj.val;
  } else if (type === 'arr') {
    value = arr[0];
  }
  return (
    <div>
      <span className="ft_18 inline-block" style={{ width: '420px' }}>Stateless: </span>
      <span>{value}</span>
    </div>
  );
};

C3.propTypes = {
  val: PropTypes.string,
  obj: PropTypes.object,
  arr: PropTypes.array,
  type: PropTypes.string,
};

export default C3;
