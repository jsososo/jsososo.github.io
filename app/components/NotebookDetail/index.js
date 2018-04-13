/**
*
* NotebookDetail
*
*/

import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
import timer from '../../utils/timer';

import { Input, Button, Modal } from 'antd';
const { TextArea } = Input;


class NotebookDetail extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);

    this.state = {
      edit: false,
      editInfo: JSON.parse(JSON.stringify(props.info)),
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      editInfo: nextProps.info,
    });
  }

  changeInfo(v, k) {
    const { editInfo } = this.state;
    editInfo[k] = v;
    this.setState({
      editInfo,
    });
  }

  changeEdit(edit) {
    if (edit) {
      this.props.saveChange(this.state.editInfo);
    }

    this.setState({
      edit: !edit,
    });
  }

  delNote() {
    Modal.confirm({
      title: '删除',
      content: `确定要删除${this.props.info.title}？`,
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        this.props.delNote(this.props.info.id);
      },
    });
  }

  render() {
    const { info } = this.props;
    const { edit, editInfo } = this.state;
    return (
      <div>
        <div className="title">
          <span className="ft_18">
            { edit ?
              <Input
                style={{ width: '300px', fontSize: '18px' }}
                className="inline-block"
                size="large"
                onChange={(e) => this.changeInfo(e.target.value, 'title')}
                value={editInfo.title}
              /> : info.title
            }
          </span>
          <span className="pull-right">
            <Button type="primary" onClick={() => this.changeEdit(edit)} className="mr_10">{edit ? '保存' : '编辑'}</Button>
            {
              edit ?
                <Button onClick={() => this.setState({ edit: !edit, editInfo: JSON.parse(JSON.stringify(info)) })}>取消</Button>
                : <Button type="danger" onClick={() => this.delNote()} >删除</Button>
            }
          </span>
        </div>
        <div className="info-content mt_20 pt_20" style={{ borderTop: '1px solid #ccc' }}>
          {
            edit ?
              <TextArea
                autosize={{ minRows: 6 }}
                value={editInfo.content}
                onChange={(e) => this.changeInfo(e.target.value, 'content')}
              /> :
              <pre>
                {info.content || '啥也没有。。。'}
              </pre>
          }
        </div>
        <div className="pull-right ft_12 fc_999 text-right">
          <div>创建时间：{timer(info.createTime).str('YY-M-D H:m:s')}</div>
          <div>上次编辑时间：{timer(info.lastEditTime).str('YY-M-D H:m:s')}</div>
        </div>
      </div>
    );
  }
}

NotebookDetail.propTypes = {
  info: PropTypes.object.isRequired,
  delNote: PropTypes.func.isRequired,
  saveChange: PropTypes.func.isRequired,
};

export default NotebookDetail;
