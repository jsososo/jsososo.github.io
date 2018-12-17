import React from 'react';
import PropTypes from 'prop-types';
import { Input, Button, message, Modal } from 'antd';
import AvatarImg from './AvatarImg';

import Storage from '../../utils/Storage';
import timer from '../../utils/timer';
import Notice from '../../utils/notice';
import { getQueryFromUrl } from "../../utils/stringHelper";

class Comment extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      commentVal: '',
      showModal: false,
    };
  }

  componentDidMount() {
    setTimeout(() => {
      const l = getQueryFromUrl('l');
      if (l) {
        const cDiv = document.getElementById(`comment-${l}`);
        window.scrollTo(0, cDiv ? cDiv.offsetTop - 200 : 0);
      }
    }, 200);
  }

  sendComment() {
    const { info, user, getArticleInfo } = this.props;
    const { commentVal } = this.state;
    if (!commentVal) {
      message.warning('啥都没有还发');
      return;
    }
    const remind = [];
    const mention = commentVal.match(/@([^@\s\r\t\n])+/g) || [];
    mention.push(`@${info.author}`);
    mention.forEach((n) => {
      let s = n.replace(/^@/, '');
      if (remind.indexOf(s) < 0 && s !== '一个路人' && s !== '游客' && s !== user.username) {
        remind.push(s);
      }
    });
    Storage.arrAdd(
      'Article',
      info.objectId,
      'comment',
      {
        content: commentVal,
        userId: user.objectId,
        isDel: false,
        time: timer().time,
      },
      () => {
        message.success('评论成功～');
        this.setState({
          commentVal: '',
          showModal: false,
        });
        getArticleInfo(info.objectId, (res) => Notice.createComment(res, remind));
      }
    );
  }

  replay(index) {
    const name = this[`comment-${index}`].state.name;
    this.setState({
      commentVal: `回复#${index + 1} @${name} ：`,
      showModal: true,
    });
  }

  render() {
    const { user, info } = this.props;
    const { commentVal, showModal } = this.state;
    return (
      <div className="comment-box pl_20">
        <div className="input-comment-container">
          <div className="inline-block">
            <AvatarImg id={user.objectId} isAuthor={user.objectId === info.authorId} isHide={info.author === '匿名'} />
          </div>
          <Input.TextArea
            value={commentVal}
            onChange={(e) => this.setState({ commentVal: e.target.value })}
            className="comment-input-area"
            placeholder="随便你说啥"
            rows={3}
            autosize={{ minRows: 3, maxRows: 3 }}
          />
          <Button className="comment-btn" type="primary" onClick={() => this.sendComment()}>
            <i className="iconfont icon-zhifeiji-copy" style={{ fontSize: '26px' }} />
          </Button>
        </div>
        <div className="comment-list">
          {info.comment && info.comment.map((item, index) => (
            <div id={`comment-${index}`} className={`comment-item comment-item-${index}`} key={`comment-${index}`}>
              <div className="inline-block w_150">
                <AvatarImg id={item.userId} ref={(a) => this[`comment-${index}`] = a} showName isAuthor={item.userId === info.authorId} isHide={info.author === '匿名'} />
              </div>
              <div className="comment-content">
                <div className="pb_20">#{index + 1}：{item.content}</div>
                <div className="comment-operation">
                  <span className="pointer fc_blue" onClick={() => this.replay(index)}>回复</span>
                  <span className="pl_15">{timer(item.time).str('YY-MM-DD HH:mm:ss')}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <Modal
          visible={showModal}
          okText="发～"
          cancelText="不发嘞"
          onCancel={() => this.setState({ commentVal: '', showModal: false })}
          onOk={() => this.sendComment()}
        >
          <Input.TextArea
            value={commentVal}
            onChange={(e) => this.setState({ commentVal: e.target.value })}
            className="mt_20"
            rows={3}
            autosize={{ minRows: 3, maxRows: 3 }}
          />
        </Modal>
      </div>
    );
  }
}

Comment.propTypes = {
  user: PropTypes.object.isRequired,
  info: PropTypes.object.isRequired,
  getArticleInfo: PropTypes.func.isRequired,
};

export default Comment;
