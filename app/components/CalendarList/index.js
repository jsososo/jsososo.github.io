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

import { Button, Switch, Input } from 'antd';
const { TextArea } = Input;


class CalendarList extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);

    this.state = {
      editId: 0,
      editContent: '',
    };
  }

  componentWillReceiveProps() {
    this.setState({
      editId: this.state.nextEditId,
      editContent: this.state.nextEditContent,
    });
  }

  createThing() {
    const { localList, selected } = this.props;
    const sT = selected.str('YYYYMMDD');
    if (!localList[sT]) {
      localList[sT] = [];
    }
    localList[sT].push({
      id: localList.nowId++,
      content: '这是一条新的事情~',
      milestone: false,
      time: selected.time,
    });
    this.props.updateList(localList);
  }

  delThing(id) {
    const { localList, selected } = this.props;
    const sT = selected.str('YYYYMMDD');
    localList[sT] = localList[sT].filter((item) => item.id !== id);
    this.props.updateList(localList);
  }

  changeEditId(id) {
    if (id === this.state.editId) {
      this.setState({
        editId: 0,
        editContent: '',
      });
    } else {
      const { localList, selected } = this.props;
      const sT = selected.str('YYYYMMDD');
      this.setState({
        editId: id,
        editContent: localList[sT].find((item) => item.id === id).content,
      });
    }
  }

  saveEdit() {
    const { localList, selected } = this.props;
    const { editId, editContent } = this.state;
    const sT = selected.str('YYYYMMDD');

    localList[sT].find((item) => item.id === editId).content = editContent;
    this.props.updateList(localList);
  }

  changeMileStone(id, value) {
    const { localList, selected } = this.props;
    const sT = selected.str('YYYYMMDD');

    localList[sT].find((item) => item.id === id).milestone = value;
    this.props.updateList(localList);
  }

  render() {
    const { list, selected } = this.props;
    const { editId, editContent } = this.state;
    let milestoneStr = '';
    if (Number(selected.str('YYYYMMDD')) - Number(timer().str('YYYYMMDD')) > 0) {
      milestoneStr = `还有${selected.to(timer(), 'str', 2)}`
    }
    return (
      <div className="calendar-list">
        <Button type="primary" onClick={() => this.createThing()}>添加事件</Button>
        {
          list.map((thing) => (
            thing.id !== editId ?
              <div key={`thing-${thing.id}`} className="calendar-list-item">
                <div className="content">
                  {thing.content}
                </div>
                <div className="operation">
                  是否为里程碑：
                  <Switch checked={thing.milestone} onChange={(v) => this.changeMileStone(thing.id, v)} />
                  <div className="hover-show">
                    <Button className="mr_5 ml_10" onClick={() => this.changeEditId(thing.id)}>编辑</Button>
                    <Button type="danger" onClick={() => this.delThing(thing.id)}>删除</Button>
                  </div>
                </div>
                {/*{*/}
                  {/*thing.milestone &&*/}
                {/*}*/}
              </div> :
              <div key={`thing-${thing.id}`} className="calendar-list-item">
                <div className="content">
                  <TextArea autosize={{ minRows: 1 }} onChange={(e) => this.setState({editContent: e.target.value})} value={editContent} />
                </div>
                <div className="operation">
                  是否为里程碑：
                  <Switch checked={thing.milestone} onChange={(v) => this.changeMileStone(thing.id, v)} />
                  <div className="inline-block vat">
                    <Button className="mr_5 ml_10" onClick={() => this.saveEdit()}>保存</Button>
                    <Button onClick={() => this.changeEditId(thing.id)}>取消</Button>
                  </div>
                </div>
              </div>
          ))
        }
      </div>
    );
  }
}

CalendarList.propTypes = {
  localList: PropTypes.object.isRequired,
  list: PropTypes.array.isRequired,
  selected: PropTypes.object.isRequired,
  updateList: PropTypes.func.isRequired,
};

export default CalendarList;
