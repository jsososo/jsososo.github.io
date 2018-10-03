import React from 'react';
import PropTypes from 'prop-types';
import { Icon, Button, Input, message } from 'antd';
import Storage from '../../utils/Storage';

class Box extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      list: [],
    };
  }

  componentWillMount() {
    Storage.queryBmob(
      'BoxInfo',
      undefined,
      (res) => {
        this.setState({
          list: res,
        });
      },
      (err) => {
        console.log(err);
      },
      'find',
    );
  }

  addNewBox() {
    const { list } = this.state;
    list.unshift({
      name: '',
      type: '',
      color: '',
      img: '',
      url: '',
      keyWords: '',
    });
    this.setState({
      list,
    });
  }

  render() {
    const { goBack } = this.props;
    const { list } = this.state;
    return (
      <div className="mt_20">
        <Icon type="arrow-left" className="pointer ft_20 mr_10 mt_5" onClick={goBack} />
        <Button onClick={() => this.addNewBox()}>添加</Button>
        <div>
          { list.map((b, i) => <SingleBox key={`box-${i}`} info={b} />) }
        </div>
      </div>
    );
  }
}

Box.propTypes = {
  goBack: PropTypes.func.isRequired,
}

export default Box;

class SingleBox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      info: props.info,
    };
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      info: nextProps.info,
    });
  }
  saveChange() {
    const { info } = this.state;
    if (info.objectId) {
      Storage.setBmob(
        'BoxInfo',
        info.objectId,
        info,
        () => {
          message.success('ojbk');
        },
      );
    } else {
      Storage.createBmob(
        'BoxInfo',
        info,
        (res) => {
          info.objectId = res;
          message.success('ojbk');
          this.setState({
            info,
          });
        },
      );
    }
  }

  changeInfo(k, v) {
    const { info } = this.state;
    info[k] = v;
    this.setState({
      info,
    });
  }

  render() {
    const { info } = this.state;
    return (
      <div className="mt_10 inline-block" style={{ width: '33.33%' }} >
        <div className="mt_10">
          <div className="w_100 inline-block">name: </div>
          <Input className="w_200" value={info.name} onChange={(e) => this.changeInfo('name', e.target.value)}/>
        </div>
        <div className="mt_10">
          <div className="w_100 inline-block">url: </div>
          <Input className="w_200" value={info.url} onChange={(e) => this.changeInfo('url', e.target.value)}/>
        </div>
        <div className="mt_10">
          <div className="w_100 inline-block">type: </div>
          <Input className="w_200" value={info.type} onChange={(e) => this.changeInfo('type', e.target.value)}/>
        </div>
        <div className="mt_10">
          <div className="w_100 inline-block">color: </div>
          <Input className="w_200" value={info.color} onChange={(e) => this.changeInfo('color', e.target.value)}/>
        </div>
        <div className="mt_10">
          <div className="w_100 inline-block">img: </div>
          <Input className="w_200" value={info.img} onChange={(e) => this.changeInfo('img', e.target.value)}/>
        </div>
        <div className="mt_10">
          <div className="w_100 inline-block">imgSize: </div>
          <Input className="w_200" value={info.imgSize} onChange={(e) => this.changeInfo('imgSize', e.target.value)}/>
        </div>
        <div className="mt_10">
          <div className="w_100 inline-block">keyWords: </div>
          <Input className="w_200" value={info.keyWords} onChange={(e) => this.changeInfo('keyWords', e.target.value)}/>
        </div>
        <Button style={{marginLeft: '100px'}} className="mt_10" onClick={() => this.saveChange()}>保存</Button>
      </div>
    )
  }
}

SingleBox.propTypes = {
  info: PropTypes.object.isRequired,
}
