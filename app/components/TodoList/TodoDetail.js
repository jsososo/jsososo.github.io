import React from 'react';
import PropTypes from 'prop-types';
import marked from 'marked';

import { Slider, Button, Input, DatePicker, Switch, Modal } from 'antd';
import moment from 'moment';
import timer from '../../utils/timer';
import Storage from '../../utils/localStorage';

const { TextArea } = Input;

class TodoDetail extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editInfo: JSON.parse(JSON.stringify(props.thing)),
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      editInfo: JSON.parse(JSON.stringify(nextProps.thing)),
    });
  }

  changeEditInfo(val, key) {
    const { editInfo } = this.state;
    editInfo[key] = val;
    if (key === 'startTime' && val && editInfo.endTime && editInfo.endTime < val) {
      editInfo.endTime = val;
    }
    if (key === 'endTime' && val && editInfo.startTime && editInfo.startTime > val) {
      editInfo.startTime = val;
    }
    this.setState({
      editInfo,
    });
  }

  save() {
    const { editInfo } = this.state;
    // 如果起始时间发生了变化，则需要更新一下日历里面的事件
    if (editInfo.startTime) {
      const cList = Storage.get('p_c_list', true, '{}');
      if (editInfo.time) {
        const oldDay = timer(editInfo.time).str('YYYYMMDD');
        cList[oldDay] = cList[oldDay].filter((item) => item.id !== editInfo.id);
      }
      if (editInfo.startTime) {
        const newDay = timer(editInfo.startTime).str('YYYYMMDD');
        editInfo.time = editInfo.startTime;
        cList[newDay] = cList[newDay] || [];
        cList[newDay].push(editInfo);
      }
      Storage.set('p_c_list', cList, true);
    }

    this.props.updateThing(editInfo);
    window.location = `#/kit/todo/?id=${editInfo.id}&edit=0`;
  }

  delThing() {
    const { thing, delThing } = this.props;
    Modal.confirm({
      content: '确认删除这个任务以及下面的子任务？',
      cancelText: '别呀',
      okText: '删掉',
      onOk: () => delThing(thing.id),
    });
  }

  render() {
    const { thing, edit, updateStatus, createNewTodo } = this.props;
    const { editInfo } = this.state;
    return (
      <div className="todo-detail">
        <b className="title ft_16 fc_999">
          {
            edit ?
              <Input
                style={{ width: '300px'}}
                value={editInfo.title}
                onChange={(e) => this.changeEditInfo(e.target.value, 'title')}
              /> :
              <span className="inline-block" style={{maxWidth: '300px', wordBreak: 'break-all'}}>{thing.title}</span>
          }
          <Slider
            onChange={(val) => updateStatus(thing.id, val)}
            className="inline-block vat"
            tipFormatter={(val) => ['还没呢', '在做了', '早好了'][val]}
            style={{width: '40px', marginLeft: '30px', marginTop: '7px'}}
            min={0}
            max={2}
            step={1}
            value={thing.status}
          />
          {
            !edit ?
              <div className="pull-right">
                <Button type="primary" onClick={() => createNewTodo(thing.id)} className="mr_10">新建子任务</Button>
                <Button type="primary" className="mr_10"><a href={`#/kit/todo/?id=${thing.id}&edit=1`}>编辑</a></Button>
                <Button type="danger" className="mr_10" onClick={() => this.delThing()}>删除</Button>
              </div> :
              <div className="pull-right">
                <Button type="primary" className="mr_10" onClick={() => this.save()}>保存</Button>
                <Button className="mr_10"><a href={`#/kit/todo/?id=${thing.id}&edit=0`}>取消</a></Button>
              </div>
          }
        </b>
        {
          edit ?
            <div className="mt_10">
              <span>
                开始时间：
                <DatePicker
                  showToday={false}
                  disabledDate={(d) => editInfo.endTime && d && (editInfo.endTime < d._d.getTime())}
                  value={editInfo.startTime ? moment(editInfo.startTime) : null}
                  onChange={(val) => this.changeEditInfo(val && val._d.getTime(), 'startTime')}
                />
              </span>
              <span className="ml_20">
                结束时间：
                <DatePicker
                  showToday={false}
                  disabledDate={(d) => editInfo.startTime && d && (editInfo.startTime > d._d.getTime())}
                  value={editInfo.endTime ? moment(editInfo.endTime) : null}
                  onChange={(val) => this.changeEditInfo(val && val._d.getTime(), 'endTime')}
                />
              </span>
              <span className="ml_20">
                里程碑：
                <Switch
                  checked={editInfo.milestone}
                  onChange={(val) => this.changeEditInfo(val, 'milestone')}
                />
              </span>
            </div> :
            <div className="mt_10">
              <span>开始时间：{thing.startTime ? timer(thing.startTime).str() : '-- --'}</span>
              <span className="ml_20">结束时间：{thing.endTime ? timer(thing.endTime).str() : '-- --'}</span>
            </div>
        }
        {
          edit ?
            <div className="mt_10">
              <TextArea
                autosize={{ minRows: 4 }}
                value={editInfo.content}
                onChange={(e) => this.changeEditInfo(e.target.value, 'content')}
              />
            </div> :
            <div dangerouslySetInnerHTML={{__html: marked(thing.content)}} />
        }
      </div>
    );
  }
}

TodoDetail.propTypes = {
  thing: PropTypes.object,
  edit: PropTypes.bool,
  updateStatus: PropTypes.func.isRequired,
  updateThing: PropTypes.func.isRequired,
  createNewTodo: PropTypes.func.isRequired,
  delThing: PropTypes.func.isRequired,
  delCalendarThing: PropTypes.func.isRequired,
};

export default TodoDetail;
