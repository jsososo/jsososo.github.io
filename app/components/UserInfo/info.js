import React from 'react';
import { Button, Input, Modal, Icon, message } from 'antd';
import PropTypes from 'prop-types';
import Storage from '../../utils/Storage';
import md5 from 'js-md5';
import wxQR from '../../resources/img/wx-qr.png';

class Info extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      edit: false,
      preview: '',
      editInfo: { ...props.user },
      newAvatar: '',
      changePassword: false,
      passwordInfo: {
        old: '',
        new1: '',
        new2: '',
      },
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
    Storage.updateUser(editInfo, () => {
      this.cancelEdit();
      this.props.logIn(editInfo);
    });
  }

  inputPassword(type, val) {
    const { passwordInfo } = this.state;
    passwordInfo[type] = val;
    this.setState({
      passwordInfo,
    });
  }

  changePassword() {
    const { passwordInfo } = this.state;
    const { user } = this.props;
    if (passwordInfo.new1 !== passwordInfo.new2) {
      message.error('新的两个不一样，逗我呢');
      return;
    }
    Storage.queryBmob(
      '_User',
      (q) => {
        q.equalTo('username', user.username);
        q.equalTo('password', md5(passwordInfo.old));
        return q;
      },
      (res) => {
        if (res) {
          Storage.setBmob(
            '_User',
            res.objectId,
            {
              password: md5(passwordInfo.new1),
            },
            () => {
              message.success('改好了');
              Storage.set('user', `${user.username}-${md5(passwordInfo.new2).split('').reverse().join('')}`);
              this.closePasswordDialog();
            }
          );
        } else {
          message.error('你怕是密码输错了');
        }
      }
    );
  }

  closePasswordDialog() {
    this.setState({
      changePassword: false,
      passwordInfo: {
        old: '',
        new1: '',
        new2: '',
      },
    });
  }

  unbindWx() {
    const { editInfo } = this.state;
    Modal.confirm({
      content: '确认解除绑定？',
      okText: '解除',
      cancelText: '别吧',
      onOk: () => {
        editInfo.wechat = '';
        editInfo.wxOpenId = '';
        this.setState({ editInfo }, this.updateInfo);
      },
    });
  }

  showQr() {
    Modal.info({
      content: (
        <div style={{ marginTop: '-10px'}}>
          <div>微信扫码登陆小程序绑定哟</div>
          <div className="mt_10">
            <img src={wxQR} height="80px" />
          </div>
        </div>
      ),

    });
  }

  render() {
    const { user } = this.props;
    const { edit, editInfo, preview, newAvatar, changePassword, passwordInfo } = this.state;
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
        {/* 头像 */}
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
        {/* 昵称 */}
        <div className="info-row">
          <div className="info-label">昵称：</div>
          <div className="info-show">{user.username}</div>
        </div>
        {/* 密码 */}
        <div className="info-row">
          <div className="info-label">密码：</div>
          <div className="info-show">
            <Button onClick={() => this.setState({ changePassword: true })}>修改密码</Button>
          </div>
        </div>
        <div className="info-row">
          <div className="info-label">微信：</div>
          {
            edit ?
              <div className="info-show">
                {
                  !user.wechat ?
                    <div>未绑定 <span className="fc_blue pointer pl_10" onClick={() => this.showQr()}>点我绑定</span></div> :
                    <div>
                      {user.wechat}
                      <Button className="ml_20" type="danger" onClick={() => this.unbindWx()}>解除绑定</Button>
                    </div>
                }
              </div> :
              <div className="info-show">
                {user.wechat || (<div>未绑定 <span className="fc_blue pointer pl_10" onClick={() => this.showQr()}>点我绑定</span></div>)}
              </div>
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
        <Modal
          visible={changePassword}
          cancelText="不改了不改了"
          okText="改！"
          onCancel={() => this.closePasswordDialog()}
          onOk={() => this.changePassword()}
        >
          <div className="mg_20">
            <div className="inline-block w_100">旧密码：</div>
            <Input
              className="w_200"
              value={passwordInfo.old}
              type="password"
              onChange={(e) => this.inputPassword('old', e.target.value)}
            />
          </div>
          <div className="mg_20">
            <div className="inline-block w_100">新密码：</div>
            <Input
              className="w_200"
              value={passwordInfo.new1}
              type="password"
              onChange={(e) => this.inputPassword('new1', e.target.value)}
            />
          </div>
          <div className="mg_20">
            <div className="inline-block w_100">one more：</div>
            <Input
              className="w_200"
              value={passwordInfo.new2}
              type="password"
              onChange={(e) => this.inputPassword('new2', e.target.value)}
            />
          </div>
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
