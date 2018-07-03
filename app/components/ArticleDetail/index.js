/**
*
* ArticleDetail
*
*/

import React from 'react';
import ProptTypes from 'prop-types';

import { changeUrlQuery } from "../../utils/stringHelper";
import timer from '../../utils/timer';

import { Input, Button, Icon, Tooltip, Modal } from 'antd';
import md5 from 'js-md5';
import BraftEditor from 'braft-editor';
import 'braft-editor/dist/braft.css';
import './index.scss';
// import styled from 'styled-components';


class ArticleDetail extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);

    this.state = {
      info: JSON.parse(JSON.stringify(props.rawInfo)),
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      info: JSON.parse(JSON.stringify(nextProps.rawInfo)),
    });
  }

  changeInfo(k, v) {
    const { info } = this.state;
    info[k] = v;
    if (k === 'content' || k === 'title') {
      info[k] = v;
    }
    this.setState({
      info,
    });
  }

  delArticle() {
    const { info } = this.state;
    Modal.confirm({
      content: '真的删了？',
      onOk: () => this.props.delArticle(info.objectId),
      okText: '嗯哼',
      cancelText: '先等等',
    });
  }

  render() {
    const { rawInfo, edit, user, setArticleInfo, saveArticle } = this.props;
    const { info } = this.state;
    const editorProps = {
      contentFormat: 'html',
      initialContent: rawInfo.content,
      onChange: (v) => this.changeInfo('content', v),
      excludeControls: ['font-family', 'indent'],
      tabIndents: 4,
      pasteMode: 'text',
      onSave: () => saveArticle(info, true),
      media: {
        allowPasteImage: true, // 是否允许直接粘贴剪贴板图片（例如QQ截图等）到编辑器
        image: true, // 开启图片插入功能
        // video: true, // 开启视频插入功能
        // audio: true, // 开启音频插入功能
        validateFn: null, // 指定本地校验函数，说明见下文
        uploadFn: null, // 指定上传函数，说明见下文
        removeConfirmFn: null, // 指定删除前的确认函数，说明见下文
        onRemove: null, // 指定媒体库文件被删除时的回调，参数为被删除的媒体文件列表(数组)
        onChange: null, // 指定媒体库文件列表发生变化时的回调，参数为媒体库文件列表(数组)
        onInsert: null, // 指定从媒体库插入文件到编辑器时的回调，参数为被插入的媒体文件列表(数组)
      },
    };

    return (
      edit ?
        <div className="article-edit">
          <Input
            className="title-input"
            value={info.title}
            size="large"
            onChange={(e) => this.changeInfo('title', e.target.value)}
          />
          {
            user.username !== '游客' &&
            <div className="inline-block">
              <Tooltip placement="top" title={info.public ? '点击设为私密(只有你能看见)' : '点击设为公开(会出现在所有人的首页)'}>
                <Icon
                  style={info.public ? {} : { color: '#ffcc00' }}
                  type={info.public ? 'unlock' : 'lock'}
                  className="article-icon"
                  onClick={() => this.changeInfo('public', !info.public)}
                />
              </Tooltip>
              <Tooltip placement="top" title={info.author === '匿名' ? '点击取匿' : '点击设为匿名'}>
                <Icon
                  type="bulb"
                  className="article-icon"
                  style={info.author === '匿名' ? {} : { color: '#ffcc00' }}
                  onClick={() => this.changeInfo('author', info.author === '匿名' ? user.username : '匿名')}
                />
              </Tooltip>
            </div>
          }
          <div className="pull-right">
            <Button type="primary" className="mr_15" onClick={() => saveArticle(info, false)}>保存</Button>
            <Button type="primary" className="mr_15" onClick={() => saveArticle(info, true)}>暂存</Button>
            <Button
              onClick={() => {
                if (rawInfo.objectId) {
                  setArticleInfo(rawInfo);
                } else {
                  setArticleInfo(null);
                  changeUrlQuery({ id: '' });
                }
              }}
            >取消</Button>
          </div>
          <div style={{ border: '1px solid #ddd', borderRadius: '10px' }}>
            <BraftEditor {...editorProps} />
          </div>
        </div> :
        <div className="article-detail">
          <div>
            <a
              onClick={() => {
                changeUrlQuery({ id: undefined });
                setArticleInfo(null, false);
              }}
            >
              <Icon type="arrow-left" className="pointer ft_20 mr_20 mt_5 vat" />
            </a>
            <h2 className="article-title">{rawInfo.title || '无题'}</h2>
            <div className="article-info">
              <div className="inline-block ml_15">{rawInfo.author}</div>
              <div className="inline-block ml_15">{timer(rawInfo.lastEdit).str('YY-M-D HH:mm')}</div>
            </div>
            {
              md5(user.username || '') === rawInfo.authorId &&
              <div className="pull-right">
                <Button type="primary" className="mr_15" onClick={() => setArticleInfo(info, true)}>编辑</Button>
                <Button type="danger" onClick={() => this.delArticle()}>删除</Button>
              </div>
            }
          </div>
          <div className="article-content-box">
            {
              rawInfo.content !== 'undefined' && <div className="article-content" dangerouslySetInnerHTML={{ __html: rawInfo.content }} />
            }
            {
              rawInfo.content === 'undefined' && <div className="mt_20 text-center ft_20"><Icon type="loading" /></div>
            }
          </div>
          {/*<div className="comment-box pl_20">
            <b>评论：</b>
            <Input.TextArea
              placeholder="随便你说啥"
            />
          </div>*/}
        </div>
    );
  }
}

ArticleDetail.propTypes = {
  rawInfo: ProptTypes.object.isRequired,
  edit: ProptTypes.bool.isRequired,
  user: ProptTypes.object.isRequired,
  setArticleInfo: ProptTypes.func.isRequired,
  saveArticle: ProptTypes.func.isRequired,
  delArticle: ProptTypes.func.isRequired,
};

export default ArticleDetail;
