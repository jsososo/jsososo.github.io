/**
*
* ArticleDetail
*
*/

import React from 'react';
import ProptTypes from 'prop-types';

import { changeUrlQuery } from "../../utils/stringHelper";
import timer from '../../utils/timer';

import { Input, Button, Icon, Tooltip, Modal, Select } from 'antd';
import Comment from './Comment';
import BraftEditor, { EditorState } from 'braft-editor';
import { ContentUtils } from 'braft-utils';
import CodeHighlighter from 'braft-extensions/dist/code-highlighter';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-python';
// import 'prismjs/components/prism-php';
import Prism from 'prismjs';

import Storage from '../../utils/Storage';
import { getUserInfo } from "../../utils/constants";

import 'braft-editor/dist/index.css';
import './index.scss';
import 'braft-extensions/dist/code-highlighter.css';
// import styled from 'styled-components';

const options = {
  syntaxs: [
    {
      name: 'JavaScript',
      syntax: 'javascript',
    }, {
      name: 'HTML',
      syntax: 'html',
    }, {
      name: 'CSS',
      syntax: 'css',
    }, {
      name: 'JAVA',
      syntax: 'java',
    }, {
      name: 'Python',
      syntax: 'python',
    },
  ],
};
BraftEditor.use(CodeHighlighter(options));

class ArticleDetail extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      info: JSON.parse(JSON.stringify(props.rawInfo)),
      editorInfo: EditorState.createFrom(''),
    };
  }

  componentDidMount() {
    getUserInfo(this.props.rawInfo.authorId, () => {});
  }

  componentWillReceiveProps(nextProps) {
    const info = JSON.parse(JSON.stringify(nextProps.rawInfo));
    this.setState({
      info,
      editorInfo: EditorState.createFrom(info.content),
    });
  }

  componentDidUpdate() {
    if (!this.props.edit) {
      // Prism.highlightAll 这个方法里面的 document.querySelectorAll 有点问题，自己写一下
      // Prism.highlightAll();

      const elements = document.querySelectorAll('[class*="language-"], [class*="language-"] code, [class*="lang-"], [class*="lang-"] code');

      elements.forEach((el) => el && Prism.highlightElement(el, false));
    }
  }

  changeInfo(k, v) {
    const { info } = this.state;
    info[k] = v;
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

  saveArticleInfo(edit) {
    const { info, editorInfo } = this.state;
    info.content = editorInfo.toHTML().replace(/\<br\/\>/g, '\n');
    this.props.saveArticle(info, edit);
  }

  render() {
    const { rawInfo, edit, user, setArticleInfo, getArticleInfo } = this.props;
    const { info, editorInfo } = this.state;
    const editorProps = {
      value: editorInfo,
      onChange: (v) => this.setState({ editorInfo: v }),
      excludeControls: [ 'indent'],
      extendControls: [
        {
          key: 'custom-button',
          type: 'button',
          text: 'code',
          onClick: () => {
            let eI = ContentUtils.insertText(editorInfo, ' ');
            eI = ContentUtils.insertHTML(eI, '<code>code</code>', 'paste');
            this.setState({
              editorInfo: ContentUtils.insertText(eI, ' '),
            });
          },
        },
      ],
      stripPastedStyles: true,
      colors: [
        '#000000', '#333333', '#666666', '#999999', '#cccccc', '#ffffff',
        '#61a951', '#16a085', '#07a9fe', '#003ba5', '#8e44ad', '#f32784',
        '#c0392b', '#d35400', '#f39c12', '#fff392', '#ffda00', '#2c3e50',
        '#ffcccc', '#FFFFD5', '#ccffff', '#ccffcc', '#FF14E7', '#FF709B',
      ],
      onSave: () => this.saveArticleInfo(true),
      media: {
        allowPasteImage: true, // 是否允许直接粘贴剪贴板图片（例如QQ截图等）到编辑器
        image: true, // 开启图片插入功能
        // video: true, // 开启视频插入功能
        // audio: true, // 开启音频插入功能
        validateFn: null, // 指定本地校验函数，说明见下文
        uploadFn: (param) => {
          Storage.saveFile(param.file, (res) => {
            param.success(res);
          }, (event) => {
            param.progress((event.loaded / event.total) * 100);
          });
        }, // 指定上传函数，说明见下文
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
          <Select value={info.tag || ''} className="w_100" onChange={(v) => this.changeInfo('tag', v)}>
            <Select.Option value="技术">技术</Select.Option>
            <Select.Option value="远方">远方</Select.Option>
            <Select.Option value="生活">生活</Select.Option>
            <Select.Option value="">么有标签</Select.Option>
          </Select>
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
                <i
                  className={`iconfont icon-${info.author === '匿名' ? 'niming' : 'yanjing'}`}
                  style={info.author === '匿名' ? {} : { color: '#ffcc00' }}
                  onClick={() => this.changeInfo('author', info.author === '匿名' ? user.username : '匿名')}
                />
              </Tooltip>
            </div>
          }
          <div className="pull-right">
            <Button type="primary" className="mr_15" onClick={() => this.saveArticleInfo(false)}>保存</Button>
            <Button type="primary" className="mr_15" onClick={() => this.saveArticleInfo(true)}>暂存</Button>
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
                changeUrlQuery({ id: undefined, l: undefined });
                setArticleInfo(null, false);
              }}
            >
              <Icon type="arrow-left" className="pointer ft_20 mr_20 mt_5 vat" />
            </a>
            <h2 className="article-title">{rawInfo.tag && `【${rawInfo.tag}】`}{rawInfo.title || '无题'}</h2>
            <div className="article-info">
              <div className="inline-block ml_15">{rawInfo.author}</div>
              <div className="inline-block ml_15">{timer(rawInfo.lastEdit).str('YY-M-D HH:mm')}</div>
            </div>
            {
              (user.objectId || '') === rawInfo.authorId &&
              <div className="pull-right">
                <Button type="primary" className="mr_15" onClick={() => {changeUrlQuery({ l: '' });setArticleInfo(info, true);}}>
                  编辑
                </Button>
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
          <Comment user={user} info={info} getArticleInfo={getArticleInfo} />
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
  getArticleInfo: ProptTypes.func.isRequired,
};

export default ArticleDetail;
