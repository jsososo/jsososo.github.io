import React from 'react';
import NoticeSetting from '../NoticeSetting';
import PropTypes from 'prop-types';
import { Button, Modal } from 'antd';

class NoticeCenter extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showNoticeSetting: false,
    };
  }

  render() {
    const { showNoticeSetting } = this.state;
    const { user } = this.props;
    return (
      <div>
        <div>
          <Button onClick={() => this.setState({ showNoticeSetting: true })}>事件提醒设置</Button>
          <span className="fc_999 pl_15">根据标签进行设置和提醒</span>
        </div>
        <Modal
          footer={null}
          visible={showNoticeSetting}
          onCancel={() => this.setState({ showNoticeSetting: false })}
        >
          <NoticeSetting user={user} visible={showNoticeSetting} />
        </Modal>
      </div>
    );
  }
}

NoticeCenter.propTypes = {
  user: PropTypes.object.isRequired,
};

export default NoticeCenter;
