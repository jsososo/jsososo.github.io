/**
*
* NoticeSetting
*
*/

import React from 'react';
import PropTyeps from 'prop-types';
import Storage from '../../utils/Storage';
import timer from '../../utils/timer';

import { Button, Tag, Input, InputNumber, Select, Icon, message } from 'antd';
// import styled from 'styled-components';


class NoticeSetting extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);

    this.state = {
      thingSettings: [],
      selectThingId: '',
      selectThing: {},
      btnLoading: false,
    };
  }

  componentWillMount() {
    this.getThingSettingList();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.visible) {
      this.getThingSettingList();
    }
  }

  getThingSettingList(selId) {
    const { user } = this.props;
    Storage.queryBmob(
      'NoticeSetting',
      (q) => {
        q.equalTo('username', user.username);
        q.equalTo('type', 'thing');
        return q;
      },
      (res) => {
        if (selId) {
          this.setState({
            thingSettings: res,
            selectThingId: selId,
            btnLoading: false,
          });
        } else {
          this.setState({
            thingSettings: res,
            selectThingId: '',
            selectThing: {},
            btnLoading: false,
          });
        }
      },
      null,
      'find',
    );
  }

  createThingTag() {
    const { user } = this.props;
    Storage.createBmob(
      'NoticeSetting',
      {
        rules: [],
        tag: timer().str('YYMDHms'),
        type: 'thing',
        username: user.username,
        isSys: false,
      },
      (res) => this.getThingSettingList(res.id),
    );
  }

  selectThing(id) {
    const { thingSettings } = this.state;
    const thing = thingSettings.find((item) => item.objectId === id);
    this.setState({
      selectThingId: id,
      selectThing: JSON.parse(JSON.stringify(thing)),
    });
  }

  changeRule(index, content) {
    const { selectThing } = this.state;

    if (index === undefined) {
      selectThing.rules.push({
        type: 'YYYYMMDD',
        count: 0,
      });
    } else if (content) {
      selectThing.rules[index] = {
        ...(selectThing.rules[index]),
        ...content,
      };
    } else {
      selectThing.rules = selectThing.rules.filter((item, i) => i !== index);
    }
    this.setState({
      selectThing,
    });
  }

  saveRule() {
    const { user } = this.props;
    const { selectThing } = this.state;
    this.setState({
      btnLoading: true,
    });
    Storage.queryBmob(
      'NoticeSetting',
      (q) => {
        q.equalTo('username', user.username);
        q.equalTo('tag', selectThing.tag);
        q.notEqualTo('objectId', selectThing.objectId);
        return q;
      },
      (res) => {
        if (res > 0) {
          message.error('不能与其他tag重名');
          this.setState({
            btnLoading: false,
          });
          return;
        }
        Storage.setBmob('NoticeSetting', selectThing.objectId, selectThing, () => this.getThingSettingList());
      },
      null,
      'count',
    );
  }

  changeTagName(v) {
    const { selectThing } = this.state;
    selectThing.tag = v;
    this.setState({
      selectThing,
    });
  }

  render() {
    const { thingSettings, selectThingId, selectThing, btnLoading } = this.state;
    return (
      <div style={{ height: '300px', width: '500px' }}>
        {
          selectThingId ?
            <div>
              <div className="mb_10">
                <Icon type="arrow-left" onClick={() => this.getThingSettingList()} />
                <Button loading={btnLoading} className="ml_10" type="primary" onClick={() => this.saveRule()}>保存</Button>
              </div>
              <Input disabled={selectThing.isSys} value={selectThing.tag} onChange={(e) => this.changeTagName(e.target.value)} className="w_200" />
              <div>
                { selectThing.rules.map((r, index) => (
                  <div className="mt_10">
                    <Select value={r.type} className="w_100" onChange={(v) => this.changeRule(index, { type: v })}>
                      <Select.Option value="YYYYMMDD">提前</Select.Option>
                      <Select.Option value="Date">每隔</Select.Option>
                      <Select.Option value="MMDD">每年提前</Select.Option>
                    </Select>
                    <InputNumber min={0} precision={0} value={r.count} onChange={(v) => this.changeRule(index, { count: v })} />天提醒
                    <Icon type="delete" className="ml_10 fc_red pointer" onClick={() => this.changeRule(index)} />
                  </div>
                ))}
                <Button className="mt_15" onClick={() => this.changeRule()}>新的提醒</Button>
              </div>
            </div> :
            <div>
              <Button className="mb_10" onClick={() => this.createThingTag()}>加一个规则</Button>
              <div>
                { thingSettings.map((item) => (
                  <Tag
                    key={item.objectId}
                    onClick={() => this.selectThing(item.objectId)}
                    style={{ minHeight: '30px', lineHeight: '30px' }}
                  >{item.tag}</Tag>
                ))}
              </div>
            </div>
        }
      </div>
    );
  }
}

NoticeSetting.propTypes = {
  user: PropTyeps.object,
  visible: PropTyeps.bool.isRequired,
};

export default NoticeSetting;
