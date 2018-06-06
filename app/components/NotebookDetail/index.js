/**
*
* NotebookDetail
*
*/

import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
import timer from '../../utils/timer';
import { markdown } from '../../utils/stringHelper';

import { Input, Button, Modal, Select, message, Icon } from 'antd';
const { TextArea } = Input;
const { Option } = Select;

import ArrayHelper from '../../utils/arrayHelper';
import { changeUrlQuery } from "../../utils/stringHelper";

class NotebookDetail extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);

    this.state = {
      tags: props.tags,
      edit: props.edit,
      editInfo: JSON.parse(JSON.stringify(props.info)),
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.tags.length === this.state.tags) {
      this.setState({
        edit: nextProps.edit,
        editInfo: JSON.parse(JSON.stringify(nextProps.info)),
      });
    } else {
      this.setState({
        tags: nextProps.tags,
      });
    }
  }

  changeInfo(v, k) {
    const { tags } = this.props;
    const { editInfo } = this.state;
    editInfo[k] = v;
    // 修改标签的时候，如果是新增标签，需要掉接口更新
    if (k === 'tags') {
      const newTags = ArrayHelper.delDuplicate(tags, v);
      if (newTags.length > tags.length) {
        this.props.updateTags(newTags);
      }
    }
    this.setState({
      editInfo,
    });
  }

  /*
  *  修改编辑状态，需要判断是否为保存
  * */
  changeEdit(edit, save = true) {
    if (save) {
      const _this = this;
      const cb = () => {
        message.success('保存成功~');
        _this.changeEdit(true, false);
      };
      this.props.saveChange(this.state.editInfo, cb);
    }
    changeUrlQuery({ edit: !edit });
    this.setState({
      edit: !edit,
      editInfo: save ? this.state.editInfo : JSON.parse(JSON.stringify(this.props.info)),
    });
  }

  /*
  *  删除单个笔记
  * */
  delNote() {
    Modal.confirm({
      title: '删除',
      content: `确定要删除${this.props.info.title}？`,
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        this.props.delNote(this.props.info.objectId);
      },
    });
  }

  render() {
    const { info } = this.props;
    const { edit, editInfo, tags } = this.state;
    return (
      <div>
        <div className="title mb_15">
          <span className="ft_18">
            { edit ?
              <Input
                style={{ width: '300px', fontSize: '18px' }}
                className="inline-block"
                size="large"
                onChange={(e) => this.changeInfo(e.target.value, 'title')}
                value={editInfo.title}
              /> :
              <span>
                <a href="#/kit/notebook/">
                  <Icon type="arrow-left" className="pointer ft_20 mr_10 mt_5 vat"/>
                </a>
                {(info.title || '无题')}
              </span>
            }
          </span>
          <span className="pull-right">
            <Button type="primary" onClick={() => this.changeEdit(edit, edit)} className="mr_10">{edit ? '保存' : '编辑'}</Button>
            {
              edit ?
                <Button onClick={() => this.changeEdit(edit, false)}>取消</Button>
                : <Button type="danger" onClick={() => this.delNote()} >删除</Button>
            }
          </span>
        </div>
        {
          edit ?
            <div>
              标签：
              <Select
                className="mr_20"
                style={{ minWidth: '200px' }}
                value={editInfo.tags}
                mode="tags"
                placeholder="Select tags"
                onChange={(v) => this.changeInfo(v, 'tags')}
              >
                {tags.map((item) => <Option value={item} key={`tag-o-${item}`}>{item}</Option>)}
              </Select>
              (tips: 也可以直接在输入框中新增一个标签)
            </div> :
            info.tags.length !== 0 && <div className="mt_20 ft_12">标签：{info.tags.join(', ')}</div>
        }
        <div className="info-content mt_20 pt_20" style={{ borderTop: '1px solid #ccc' }}>
          {
            edit ?
              <TextArea
                autosize={{ minRows: 6 }}
                value={editInfo.content}
                onChange={(e) => this.changeInfo(e.target.value, 'content')}
              /> :
              <div id="notebook-pre">
                {<div className="markdown-content" dangerouslySetInnerHTML={{__html: markdown(editInfo.content)}} /> || '啥也没有。。。'}
              </div>
          }
        </div>
        <div className="pull-right ft_12 fc_999 text-right mt_20">
          <div>创建时间：{timer(info.createTime).str('YY-M-D HH:mm:ss')}</div>
          <div>上次编辑时间：{timer(info.lastEditTime).str('YY-M-D HH:mm:ss')}</div>
        </div>
      </div>
    );
  }
}

NotebookDetail.propTypes = {
  info: PropTypes.object.isRequired,
  delNote: PropTypes.func.isRequired,
  tags: PropTypes.array.isRequired,
  saveChange: PropTypes.func.isRequired,
  updateTags: PropTypes.func.isRequired,
  edit: PropTypes.bool,
};

export default NotebookDetail;
