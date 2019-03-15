import React from 'react';
import { Radio, Input } from 'antd';
import C1 from './component';
import C2 from './pureComponent';
import C3 from './stateLess';
import C4 from './pureComponent2';
import C5 from './pureComponent3';

class Demo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      obj: {
        val: '',
      },
      val: '',
      arr: [''],
      type: 'string',
    };

    this.onChange = this.onChange.bind(this);
  }

  onChange(val) {
    const state = this.state;
    switch (state.type) {
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
    const state = this.state;
    let val = state.val;
    if (state.type === 'obj') {
      val = state.obj.val;
    } else if (state.type === 'arr') {
      val = state.arr[0];
    }

    return (
      <div>
        <Radio.Group className="mb_10" value={state.type} onChange={(e) => this.setState({ type: e.target.value })}>
          <Radio value="string">String</Radio>
          <Radio value="obj">Object</Radio>
          <Radio value="arr">Array</Radio>
        </Radio.Group>
        <Input className="mb_10" value={val} onChange={(e) => this.onChange(e.target.value)} />
        <div>
          {/* component */}
          <C1 {...state} />

          {/* pureComponent */}
          <C2 {...state} />

          {/* Stateless Funciton */}
          <C3 {...state} />

          {/* with shouldCoumponentUpdate */}
          <C4 {...state} />

          {/* pureComponent */}
          <C2 {...state} fun={() => true} sub=" (props: func={() => true})" />

          {/* pureComponent setState  */}
          <C5 type={state.type} />
        </div>
      </div>
    );
  }
}

export default Demo;
