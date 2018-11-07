import PropTypes from "prop-types";
import React from "react";

import { Icon } from 'antd';

import { getUserInfo } from "../../utils/constants";

class AvatarImg extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      avatar: '',
      name: '',
    };
  }

  componentWillMount() {
    getUserInfo(this.props.id, (user) => {
      this.setState({
        avatar: user.avatar,
        name: user.username,
      });
    });
  }

  render() {
    const { avatar, name } = this.state;
    const { showName, isAuthor, isHide } = this.props;
    return (
      <div>
        <div className="inline-block">
          {
            (!avatar || (isAuthor && isHide)) ?
              <Icon className="comment-avatar no-avatar" type="user" /> :
              <img className="comment-avatar" src={avatar} />
          }
        </div>
        {
          showName && <div className="ml_10 inline-block">{ isHide ? '匿名' : name }{ isAuthor && '（作者）' }</div>
        }
      </div>
    );
  }
}

AvatarImg.propTypes = {
  id: PropTypes.string,
  showName: PropTypes.bool,
  isAuthor: PropTypes.bool,
  isHide: PropTypes.bool,
};

export default AvatarImg;
