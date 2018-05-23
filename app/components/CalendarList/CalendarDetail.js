/**
 *
 * CalendarList
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
import moment from 'moment';
import { Button, Switch, Input, Icon, DatePicker } from 'antd';
const { TextArea } = Input;

import { markdown } from '../../utils/stringHelper';
import timer from '../../utils/timer';


class CalendarDetail extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);

    this.state = {
      isEdit: false,
      editInfo: {
        ...(props.info),
      },
    };
  }

  changeEditInfo(v, k) {
    const { editInfo } = this.state;
    editInfo[k] = v;
    this.setState({
      editInfo,
    });
  }

  saveEdit() {
    this.props.save(this.state.editInfo);
    this.setState({
      isEdit: false,
    });
  }

  render() {
    const { info, backToList, delThing } = this.props;
    const { editInfo, isEdit } = this.state;

    return (
      <div className=" calendar-list calendar-list-detail">
        {
          isEdit ?
            <div>
              <div>
                <div className="inline-block" style={{width: '100%'}}>
                  <div>
                    <Input style={{width: '200px'}} onChange={(e) => this.changeEditInfo(e.target.value, 'title')} value={editInfo.title} />
                    <div className="pull-right">
                      <Button type="primary" onClick={() => this.saveEdit()} className="mr_10">保存</Button>
                      <Button onClick={() => this.setState({isEdit: false})}>取消</Button>
                    </div>
                  </div>
                  <div className="calendar-detail-time mt_5">
                    <DatePicker
                      showToday={false}
                      allowClear={false}
                      showTime={{format: 'HH:mm'}}
                      format="YYYY-MM-DD HH:mm"
                      defaultValue={moment(editInfo.time)}
                      onChange={(v) => this.changeEditInfo(v._d.getTime(), 'time')}
                    />
                    <Switch className="ml_20" checked={editInfo.milestone} onChange={(v) => this.changeEditInfo(v, 'milestone')} />
                  </div>
                </div>
              </div>
              <TextArea autosize={{ minRows: 4 }} className="mt_20" value={editInfo.content} onChange={(e) => this.changeEditInfo(e.target.value, 'content')} />
            </div> :
            <div>
              <div className="detail-head">
                <Icon type="arrow-left" className="pointer ft_20 mr_10 mt_5 vat" onClick={backToList} />
                <div className="inline-block" style={{width: 'calc(100% - 30px)'}}>
                  <span className="detail-title ft_18">{info.title}</span>
                  <div className="pull-right">
                    <Button type="primary" className="mr_10" onClick={() => this.setState({isEdit: true})}>编辑</Button>
                    <Button type="danger" onClick={() => delThing()}>删除</Button>
                  </div>
                  <div className="mt_5">
                    {timer(info.time).str('YYYY-MM-DD HH:mm')}
                    {info.milestone && ` （${timer().to(timer(info.time))}）`}
                  </div>
                </div>
              </div>
              <div className="detail-body mt_20">
                <div className="markdown-content" dangerouslySetInnerHTML={{__html: markdown(info.content)}} />
              </div>
            </div>
        }
      </div>
    );
  }
}

CalendarDetail.propTypes = {
  info: PropTypes.object,
  backToList: PropTypes.func.isRequired,
  save: PropTypes.func.isRequired,
  delThing: PropTypes.func.isRequired,
};

export default CalendarDetail;
