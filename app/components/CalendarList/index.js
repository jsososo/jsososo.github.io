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

import { Button, Switch, Input, Modal } from 'antd';
import CalendarDetail from './CalendarDetail';

class CalendarList extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      editId: props.thingId || 0,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.thingId !== this.state.editId) {
      this.setState({
        editId: nextProps.thingId,
      });
    }
  }

  createThing() {
    const { localList, selected } = this.props;
    const sT = selected.str('YYYYMMDD');
    if (!localList[sT]) {
      localList[sT] = [];
    }
    localList[sT].push({
      id: localList.nowId += 1,
      title: '这是一条新的事情~',
      content: '这是一条新的事情~',
      milestone: false,
      time: selected.time,
    });
    this.props.updateList(localList);
  }

  delThing() {
    Modal.confirm({
      onOk: () => {
        const { localList, selected } = this.props;
        const { editId } = this.state;
        const sT = selected.str('YYYYMMDD');
        localList[sT] = localList[sT].filter((item) => item.id !== editId);
        this.props.updateList(localList);
      },
      title: '确认',
      content: '确定要删除这个事件？',
      okText: '删了删了',
      cancelText: '刀下留人',
    });
  }

  changeEditId(id) {
    const { history } = this.props;
    this.setState({
      editId: id,
    });
    if (id === 0) {
      history.push(`?date=${this.props.selected.str()}`);
    } else {
      history.push(`?date=${this.props.selected.str()}&id=${id}`);
    }
  }

  saveEdit(info) {
    const { localList, selected } = this.props;
    const iT = timer(info.time).str('YYYYMMDD');
    const sT = selected.str('YYYYMMDD');
    if (iT === sT) {
      // 如果还是同一天内
      localList[sT].forEach((item, index) => {
        if (item.id === info.id) {
          localList[sT][index] = info;
        }
      });
    } else {
      // 如果不是同一天了
      if (!localList[iT]) {
        localList[iT] = [];
      }
      localList[iT].push(info);
      localList[sT] = localList[sT].filter((item) => item.id !== info.id);
    }
    this.props.updateList(localList);
  }

  changeMileStone(id, value) {
    const { localList, selected } = this.props;
    const sT = selected.str('YYYYMMDD');

    localList[sT].find((item) => item.id === id).milestone = value;
    this.props.updateList(localList);
  }

  render() {
    const { list } = this.props;
    const { editId } = this.state;
    const editInfo = list.find((item) => item.id === editId);
    return (
      !editInfo ?
        <div className="calendar-list">
          <Button type="primary" onClick={() => this.createThing()}>添加事件</Button>
          <div className="inline-block pull-right" style={{paddingRight: '100px'}}>是否为里程碑</div>
          {
            list.map((thing) => (
              <div key={`thing-${thing.id}`} className="calendar-list-item">
                <div className="content pointer" onClick={() => this.changeEditId(thing.id)}>
                  {thing.title}
                </div>
                <div className="operation">
                  <Switch className="mr_10" checked={thing.milestone} onChange={(v) => this.changeMileStone(thing.id, v)} />
                  {thing.milestone && <a href={`#/kit/milestone/?id=${thing.id}`}>前往里程碑 =></a>}
                </div>
              </div>
            ))
          }
        </div> :
        <CalendarDetail
          backToList={() => this.changeEditId(0)}
          info={editInfo}
          save={(info) => this.saveEdit(info)}
          delThing={() => this.delThing()}
        />
    );
  }
}

CalendarList.propTypes = {
  localList: PropTypes.object.isRequired,
  list: PropTypes.array.isRequired,
  selected: PropTypes.object.isRequired,
  updateList: PropTypes.func.isRequired,
  thingId: PropTypes.number,
  history: PropTypes.object.isRequired,
};

export default CalendarList;
