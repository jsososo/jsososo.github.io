import React from 'react';
import PropTypes from 'prop-types';

import { Slider, Button, Input, DatePicker } from 'antd';
import timer from '../../utils/timer';
import moment from 'moment';

class TodoDetail extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editInfo: JSON.parse(JSON.stringify(props.thing)),
    };
  }

  changeEditInfo(val, key) {
    const { editInfo } = this.state;
    editInfo[key] = val;

    this.setState({
      editInfo,
    });
  }

  save() {
    const { editInfo } = this.state;
    this.props.updateThing(editInfo);
    window.location = `#/kit/todo/?id=${editInfo.id}&edit=0`;
  }

  changeTime(val, k) {
    console.log(moment.isMoment(val));
    if (val) {
      this.changeEditInfo(val._d.getTime(), `${k}Time`);
    } else {
      this.changeEditInfo(null, `${k}Time`);
    }
  }

  render() {
    const { thing, edit, updateStatus } = this.props;
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
                <Button type="primary" className="mr_10"><a href={`#/kit/todo/?id=${thing.id}&edit=1`}>编辑</a></Button>
                <Button type="danger" className="mr_10">删除</Button>
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
                  placeholder={thing.startTime ? timer(thing.startTime).str() : ''}
                  onChange={(val) => this.changeTime(val, 'start')}
                />
              </span>
              <span className="ml_20">
                结束时间：
                <DatePicker
                  placeholder={thing.startTime ? timer(thing.startTime).str() : ''}
                  onChange={(val) => this.changeTime(val, 'end')}
                />
              </span>
            </div> :
            <div className="mt_10">
              <span>开始时间：{thing.startTime ? timer(thing.startTime).str() : '-- --'}</span>
              <span className="ml_20">结束时间：{thing.endTime ? timer(thing.endTime).str() : '-- --'}</span>
            </div>
        }
        <div>{thing.content}</div>
      </div>
    );
  }
}

TodoDetail.propTypes = {
  thing: PropTypes.object,
  edit: PropTypes.bool,
  updateStatus: PropTypes.func.isRequired,
  updateThing: PropTypes.func.isRequired,
};

export default TodoDetail;
