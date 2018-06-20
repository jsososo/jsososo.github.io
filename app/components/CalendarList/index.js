/**
*
* CalendarList
*
*/

import React from 'react';
import './index.scss';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

import timer from '../../utils/timer';

import { Button, Switch, Modal } from 'antd';
import CalendarDetail from './CalendarDetail';
import { changeUrlQuery } from "../../utils/stringHelper";

class CalendarList extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      editId: props.thingId || '',
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.thingId !== this.state.editId) {
      this.setState({
        editId: nextProps.thingId,
      });
    }
  }

  // 选择了别的事件
  changeEditId(id) {
    this.setState({
      editId: id,
    });
    changeUrlQuery({
      id: id === 0 ? undefined : id,
      edit: undefined,
    });
  }

  render() {
    const { createThing, list, selected, saveThing, delThing } = this.props;
    const sDay = selected.str('YYYYMMDD');
    const { editId } = this.state;
    // 如果存在选中的信息
    const editInfo = (editId && list[sDay]) ? list[sDay].find((item) => item.objectId === editId) : null;
    return (
      !editInfo ?
        <div className="calendar-list">
          <Button type="primary" onClick={() => createThing(selected)}>添加事件</Button>
          {
            list[sDay] && list[selected.str('YYYYMMDD')].map((thing) => (
              <div key={`thing-${thing.objectId}`} className="calendar-list-item">
                <div className="content pointer" onClick={() => this.changeEditId(thing.objectId)}>
                  {thing.title || '还没起名字'}
                </div>
                <div className="operation">
                  {
                    thing.milestone &&
                    <a href={`#/kit/milestone/?id=${thing.objectId}`}>{timer().to(timer(thing.time))}</a>
                  }
                  {
                    thing.isTodo &&
                    <a className={thing.milestone ? 'pl_10' : ''} href={`#/kit/todo/?id=${thing.objectId}`}>看看任务</a>
                  }
                </div>
              </div>
            ))
          }
        </div> :
        <CalendarDetail
          backToList={() => this.changeEditId(0)}
          info={editInfo}
          save={saveThing}
          delThing={delThing}
        />
    );
  }
}

CalendarList.propTypes = {
  createThing: PropTypes.func.isRequired,
  list: PropTypes.object.isRequired,
  selected: PropTypes.object.isRequired,
  thingId: PropTypes.string,
  saveThing: PropTypes.func.isRequired,
  delThing: PropTypes.func.isRequired,
};

export default CalendarList;
