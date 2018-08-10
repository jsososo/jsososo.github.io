/**
 *
 * CalendarList
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
import moment from 'moment';
import { Button, Switch, Input, Icon, DatePicker, Modal, message, Select } from 'antd';
const { TextArea } = Input;

import { markdown } from '../../utils/stringHelper';
import timer from '../../utils/timer';
import { changeUrlQuery, getQueryFromUrl } from "../../utils/stringHelper";


class CalendarDetail extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);

    this.state = {
      isEdit: Boolean(getQueryFromUrl('edit')),
      editInfo: JSON.parse(JSON.stringify(props.info)),
    };
  }

  // 编辑信息
  changeEditInfo(v, k) {
    const { editInfo } = this.state;
    editInfo[k] = v;
    this.setState({
      editInfo,
    });
  }

  // 取消编辑（分为取消和保存）
  cancelEdit(save) {
    if (save) {
      this.props.save(this.state.editInfo, () => this.changeEdit());
    } else {
      this.changeEdit();
    }
  }

  // 修改编辑状态
  changeEdit(edit = false) {
    this.setState({
      isEdit: edit,
      editInfo: JSON.parse(JSON.stringify(this.props.info)),
    });
    changeUrlQuery({
      edit: edit ? true : undefined,
    });
  }

  // 删除事件
  delThing() {
    const { editInfo } = this.state;
    // 弹窗二次确认
    Modal.confirm({
      content: '真的要删？',
      okText: '毫不留情',
      cancelText: '再想想',
      onOk: () => this.props.delThing(
        editInfo,
        () => {
          changeUrlQuery({
            edit: undefined,
            id: undefined,
          });
          message.success('删了删了');
        }
      ),
    });
  }

  render() {
    const { info, backToList, tags } = this.props;
    const { editInfo, isEdit } = this.state;
    return (
      <div className=" calendar-list calendar-list-detail">
        {
          isEdit ?
            <div>
              <div>
                <div className="inline-block" style={{width: '100%'}}>
                  <div>
                    <Input style={{ width: '200px' }} onChange={(e) => this.changeEditInfo(e.target.value, 'title')} value={editInfo.title} />
                    <span className="fc_999 pl_10">标签可用于提醒，点那个小齿轮可进行设置</span>
                    <div className="pull-right">
                      <Button type="primary" onClick={() => this.cancelEdit(true)} className="mr_10">保存</Button>
                      <Button onClick={() => this.cancelEdit()}>取消</Button>
                    </div>
                  </div>
                  <div className="calendar-detail-time mt_5">
                    <DatePicker
                      disabled={editInfo.isTodo}
                      showToday={false}
                      allowClear={false}
                      showTime={{ format: 'HH:mm' }}
                      format="YYYY-MM-DD HH:mm"
                      defaultValue={moment(editInfo.time)}
                      onChange={(v) => this.changeEditInfo(v._d.getTime(), 'time')}
                    />
                    {/* 里程碑 */}
                    <span className="pl_20 pr_19">里程碑：</span>
                    <Switch checked={editInfo.milestone} onChange={(v) => this.changeEditInfo(v, 'milestone')} />
                    {/* tag */}
                    <Select
                      className="ml_20"
                      style={{ minWidth: '70px', maxWidth: '300px' }}
                      mode="tags"
                      value={editInfo.tag ? [editInfo.tag] : []}
                      placeholder="Tag"
                      onChange={(v) => this.changeEditInfo(v[Math.max(v.length - 1, 0)], 'tag')}
                    >
                      { tags.map((t) =>
                        <Select.Option key={`select-tag-${t}`} value={t}>{t}</Select.Option>
                      )}
                    </Select>
                  </div>
                </div>
              </div>
              <TextArea
                placeholder="markdown语法哟"
                autosize={{ minRows: 4 }}
                className="mt_20"
                value={editInfo.content}
                onChange={(e) => this.changeEditInfo(e.target.value, 'content')}
              />
            </div> :
            <div>
              <div className="detail-head">
                <Icon type="arrow-left" className="pointer ft_20 mr_10 mt_5 vat" onClick={backToList} />
                <div className="inline-block" style={{width: 'calc(100% - 30px)'}}>
                  <span className="detail-title ft_18">{info.tag && `【${info.tag}】`}{info.title || '还没起名字'}</span>
                  <div className="pull-right">
                    <Button type="primary" className="mr_10" onClick={() => this.changeEdit(true)}>编辑</Button>
                    {
                      // todo 事件不支持在这里删除
                      !editInfo.isTodo &&
                      <Button type="danger" onClick={() => this.delThing()}>删除</Button>
                    }
                    {
                      editInfo.isTodo &&
                      <a href={`#/kit/todo/?id=${editInfo.objectId}`}>
                        <Button>看看任务</Button>
                      </a>
                    }
                  </div>
                  <div className="mt_5">
                    {timer(info.time).str('YYYY-MM-DD HH:mm')}
                    {info.milestone && ` （${timer().to(timer(info.time))}）`}
                  </div>
                </div>
              </div>
              <div className="detail-body mt_20">
                <div className="markdown-content pl_20" dangerouslySetInnerHTML={{__html: markdown(info.content || '空空荡荡')}} />
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
  tags: PropTypes.array.isRequired,
};

export default CalendarDetail;
