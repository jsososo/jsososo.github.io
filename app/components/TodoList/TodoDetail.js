import React from 'react';
import PropTypes from 'prop-types';
import { markdown } from '../../utils/stringHelper';

import { Button, Input, DatePicker, Switch, Modal } from 'antd';
import moment from 'moment';
import timer from '../../utils/timer';
import { changeUrlQuery } from "../../utils/stringHelper";

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

  /*
  *  修改信息
  *  如果修改的是起始时间，需要限制一下
  * */
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

  /*
  *  保存修改，保存完后重新拉一下数据，改一下edit状态
  * */
  save() {
    const { editInfo } = this.state;
    editInfo.time = editInfo.startTime;
    this.props.updateThing(editInfo.objectId, editInfo, () => {
      this.props.queryAllList();
      changeUrlQuery({ edit: 0 });
    });
  }

  /*
  *  删除事件
  * */
  delThing() {
    const { thing, delThing } = this.props;
    Modal.confirm({
      content: '确认删除这个任务以及下面的子任务？',
      cancelText: '别呀',
      okText: '删掉',
      onOk: () => delThing(thing.objectId),
    });
  }

  render() {
    const { thing, edit, createNewTodo } = this.props;
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
              <span className="inline-block" style={{ maxWidth: '300px', wordBreak: 'break-all' }}>
                {thing.title || '名字被吃掉了'}
              </span>
          }
          {
            !edit ?
              <div className="pull-right">
                <Button type="primary" onClick={() => createNewTodo(thing.objectId)} className="mr_10">新建子任务</Button>
                <Button type="primary" className="mr_10" onClick={() => changeUrlQuery({ edit: 1 })}>编辑</Button>
                <Button type="danger" className="mr_10" onClick={() => this.delThing()}>删除</Button>
              </div> :
              <div className="pull-right">
                <Button type="primary" className="mr_10" onClick={() => this.save()}>保存</Button>
                <Button className="mr_10" onClick={() => changeUrlQuery({ edit: 0 })}>取消</Button>
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
            <div className="markdown-content mt_15" dangerouslySetInnerHTML={{__html: markdown(thing.content)}} />
        }
      </div>
    );
  }
}

TodoDetail.propTypes = {
  thing: PropTypes.object,
  edit: PropTypes.bool,
  updateThing: PropTypes.func.isRequired,
  createNewTodo: PropTypes.func.isRequired,
  delThing: PropTypes.func.isRequired,
  queryAllList: PropTypes.func.isRequired,
};

export default TodoDetail;
