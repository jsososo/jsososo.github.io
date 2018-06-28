import React from 'react';
import { Button, Input, Modal, Icon, message } from 'antd';
import PropTypes from 'prop-types';
import Storage from '../../utils/Storage';

class Info extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      edit: false,
      preview: '',
      editInfo: { ...props.user },
      newAvatar: '',
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      editInfo: { ...nextProps.user },
    });
  }

  cancelEdit() {
    const { user } = this.props;
    this.setState({
      edit: false,
      editInfo: {
        ...user,
      },
      newAvatar: '',
    });
  }

  changeEditInfo(key, val) {
    const { editInfo } = this.state;
    editInfo[key] = val;

    this.setState({
      editInfo,
    });
  }

  previewAvatar(url) {
    this.setState({
      preview: url,
    });
  }

  uploadAvatar() {
    const inputArea = document.getElementById('input-avatar');
    const that = this;
    inputArea.click();
    inputArea.onchange = () => {
      const reader = new FileReader();
      reader.readAsDataURL(inputArea.files[0]);
      reader.onload = function () {
        that.setState({
          newAvatar: this.result,
        });
      };
    };
  }

  onSave() {
    const { editInfo } = this.state;
    const { user } = this.props;
    if (user.username !== editInfo.username) {
      Storage.queryBmob(
        '_User',
        (q) => {
          q.equalTo('username', editInfo.username);
          return q;
        },
        (res) => {
          if (res) {
            message.error('名字被取走了');
          } else {
            this.updateInfo();
          }
        }
      );
    } else {
      this.updateInfo();
    }
  }

  updateInfo() {
    const { newAvatar, editInfo } = this.state;
    if (newAvatar) {
      editInfo.avatar = newAvatar;
    }
    const _this = this;
    Storage.updateUser(editInfo, () => {
      _this.cancelEdit();
      _this.props.logIn(editInfo);
    });
  }

  render() {
    const { user } = this.props;
    const { edit, editInfo, preview, newAvatar } = this.state;
    return (
      <div className="user-info-content">
        <div className="pull-right" style={{ marginRight: '100px' }}>
          {
            edit ?
              <div>
                <Button type="primary" onClick={() => this.onSave()}>保存</Button>
                <Button onClick={() => this.cancelEdit()} className="ml_20">取消</Button>
              </div> :
              <Button onClick={() => this.setState({ edit: true })}>编辑</Button>
          }
        </div>
        <div className="info-row" style={{ height: '90px' }}>
          <div className="info-label">头像：</div>
          <div className="info-show">
            <div className="info-show-img">
              {
                editInfo.avatar &&
                <div className="img-preview-btn">
                  <Icon type="eye" className="pointer" color="white" onClick={() => this.previewAvatar(editInfo.avatar)} />
                  {
                    edit && <Icon type="delete" className="pointer ml_5" color="white" onClick={() => this.changeEditInfo('avatar', '')} />
                  }
                </div>
              }
              {
                editInfo.avatar ?
                  <img
                    style={{ width: '70px', height: '70px' }}
                    src={editInfo.avatar}
                  /> :
                  <div className="big-no-avatar">
                    {editInfo.username.split('')[0]}
                  </div>
              }
            </div>
            {
              edit && (
                <div className="info-show-img ml_20">
                  {
                    newAvatar && (
                      <div className="img-preview-btn">
                        <Icon type="eye" className="pointer" color="white" onClick={() => this.previewAvatar(user.avatar)} />
                      </div>
                    )
                  }
                  <div className="avatar-content">
                    { !newAvatar && (
                      <div className="no-content" onClick={() => this.uploadAvatar()}>
                        <Icon type="plus" />
                      </div>
                    )
                    }
                    {
                      !!newAvatar && (
                        <div>
                          <div className="img-preview-btn">
                            <Icon type="eye" className="pointer" onClick={() => this.previewAvatar(newAvatar)} />
                            <Icon type="delete" className="ml_5 pointer" onClick={() => this.setState({ newAvatar: '' })} />
                          </div>
                          <img
                            style={{ width: '70px', height: '70px' }}
                            src={newAvatar}
                          />
                        </div>
                      )
                    }
                    <input type="file" id="input-avatar" style={{display: 'none'}} />
                  </div>
                </div>
              )
            }
          </div>
        </div>
        <div className="info-row">
          <div className="info-label">昵称：</div>
          {
            edit ?
              <Input className="info-input" value={editInfo.username} onChange={(e) => this.changeEditInfo('username', e.target.value)} /> :
              <div className="info-show">{user.username}</div>
          }
        </div>
        <div className="info-row">
          <div className="info-label">微信：</div>
          {
            edit ?
              <div className="info-show">
                {
                  !user.wechat ? '暂未开放' :
                    <div>
                      {user.wechat}
                      <Button className="ml_20" type="danger">解除绑定</Button>
                    </div>
                }
              </div> :
              <div className="info-show">{user.wechat || '未绑定'}</div>
          }
        </div>
        <div className="info-row">
          <div className="info-label">邮箱：</div>
          <div className="info-show">{user.email || '未绑定'}</div>
        </div>
        <Modal
          footer={null}
          visible={!!preview}
          width={290}
          onCancel={() => this.previewAvatar('')}
        >
          <img src={preview} style={{ width: '250px', height: '250px' }}/>
        </Modal>
      </div>
    );
  }
}

Info.propTypes = {
  user: PropTypes.object,
  logIn: PropTypes.func,
};

export default Info;
