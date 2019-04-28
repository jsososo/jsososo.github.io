import React, { useState } from 'react';
import { Input } from 'antd';

const C6 = () => {
  const [val, setVal] = useState('hello world');
  return (
    <div className="mt_20">
      <div className="ft_18">stateless with hook</div>
      <Input value={val} onChange={(e) => setVal(e.target.value)} />
      <span>{val}</span>
    </div>
  );
};

export default C6;
