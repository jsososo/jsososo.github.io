import React from 'react';
import PropTypes from 'prop-types';

import { Icon, Slider } from 'antd';
import { getQueryFromUrl } from "../../utils/stringHelper";

class TodoThing extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      status: props.thing.status,
    };
  }
  changeThing(key, val) {
    const { thing, updateThing } = this.props;
    thing[key] = val;

    updateThing(thing);
  }
  render() {
    const { thing, list, updateThing, noBorder, updateStatus } = this.props;
    const childrenList = list.filter((item) => item.parent === thing.objectId) || [];
    const nowId = getQueryFromUrl('id');
    return (
      <div className={`pt_10 todo-list-item ${noBorder ? 'no-border' : ''}`}>
        <div>
          <div className="inline-block title-align vat pointer" onClick={() => updateThing(thing.objectId, { showChildren: !thing.showChildren })}>
            {(childrenList.length > 0 && thing.showChildren) && <Icon type="down" />}
            {(childrenList.length > 0 && !thing.showChildren) && <Icon type="right" />}
          </div>
          <a href={`#/kit/todo?id=${thing.objectId}&edit=0`} className={nowId === thing.objectId ? 'fc_orange' : 'no-selected'}>
            <span className={`vat status-${thing.status}`}>{thing.title !== '' ? thing.title : '名字被吃了'}</span>
          </a>
          <Slider
            onChange={(v) => this.setState({ status: v })}
            onAfterChange={() => updateStatus(this.state.status, thing.objectId)}
            className="inline-block vat ml_20"
            tipFormatter={(val) => ['还没呢', '在做了', '早好了'][val]}
            style={{width: '40px', margin: '5px'}}
            min={0}
            max={2}
            step={1}
            value={thing.status}
          />
        </div>
        {thing.showChildren && childrenList.map((cT) => (
          <TodoThing
            key={cT.objectId}
            updateThing={updateThing}
            updateStatus={updateStatus}
            list={list}
            thing={cT}
          />
        ))}
      </div>
    );
  }
}

TodoThing.propTypes = {
  thing: PropTypes.object.isRequired,
  list: PropTypes.array.isRequired,
  updateThing: PropTypes.func.isRequired,
  noBorder: PropTypes.bool,
  updateStatus: PropTypes.func.isRequired,
};

export default TodoThing;
