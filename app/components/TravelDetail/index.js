/**
*
* TravelDetail
*
*/

import React from 'react';
import { Button, Input, Dialog } from 'antd';
import PropTypes from 'prop-types';
import { getQueryFromUrl, urlToLink } from '../../utils/stringHelper';
import DateInfo from './Date';
import MyIcon from '../Icon';
import Back from '../Back';
import './index.scss';

const TextArea = Input.TextArea;

// import styled from 'styled-components';


class TravelDetail extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);

    this.changeDate = this.changeDate.bind(this);
    this.moveDate = this.moveDate.bind(this);
    this.delDate = this.delDate.bind(this);

    props.queryDetail(getQueryFromUrl('id'));
  }

  onChange(key, val) {
    const { onChange } = this.props;
    const data = {};
    switch (key) {
      default: data[key] = val;
    }

    onChange(data);
  }

  // 修改date
  changeDate(index, v) {
    const { info, onChange } = this.props;
    const { dateList } = info;
    dateList[index] = v;
    onChange({ dateList });
  }

  moveDate(index) {
    const { info, onChange } = this.props;
    const { dateList } = info;
    const temp = dateList[index];
    dateList[index] = dateList[index + 1];
    dateList[index + 1] = temp;
    onChange({ dateList });
  }

  addDate() {
    const { info, onChange } = this.props;
    const { dateList } = info;
    dateList.push({
      title: '',
      point: dateList[dateList.length - 1].point,
    });

    onChange({ dateList });
  }

  delDate(index) {
    const { info, onChange } = this.props;
    const dateList = info.dateList.filter((o, i) => i !== index);
    onChange({ dateList });
  }

  priceCount(info) {
    const map = {
      ticket: '门票',
      traffic: '交通',
      eat: '吃滴',
      hotel: '住滴',
      other: '其他',
    };
    const result = { price: { total: 0, txt: [] }, list: [] };
    const total = {};
    info.dateList.forEach((d, i) => {
      result.list[i] = {};
      const priceObj = {};
      let priceNum = 0;
      d.list.forEach((o) => {
        Object.keys(map).forEach((k) => {
          const price = o[`${k}_price`];
          if (price) {
            total[k] = (total[k] || 0) + price;
            priceObj[k] = (priceObj[k] || 0) + price;
            priceNum += price;
          }
        });
      });
      result.list[i] = Object.keys(priceObj).map((pk) => `${map[pk]}: ${priceNum}`);
    });
  }

  render() {
    const { info, onSave, onCancel, onDel, changeUrl, isEdit } = this.props;
    const { title, desc, dateList } = info;



    return (
      <div className="travel-detail">
        {/* 标题区块 */}
        <div>
          <Back url="#/kit/travel" />
          <div className="inline-block" style={{ width: '300px' }}>
            { isEdit ?
              <Input size="large" value={title} onChange={(e) => this.onChange('title', e.target.value)} /> :
              <span className="ft_20">{title || '不知名的远方'}</span> }
          </div>
          <div className="inline-block">
            { isEdit && <Button className="ml_20" type="primary" onClick={onSave}>保存</Button> }
            { isEdit && <Button className="ml_10" onClick={() => onCancel(info.objectId)}>取消</Button> }
            { !isEdit && <Button className="ml_10" type="primary" onClick={() => changeUrl({ edit: 1 })}>编辑</Button> }
            <Button className="ml_10" type="danger">删除</Button>
          </div>
        </div>

        <div></div>

        {/* 简介区块 */}
        {
          isEdit ?
            <TextArea
              className="mt_20"
              autosize={{ minRows: 3 }}
              value={desc}
              placeholder="说点什么..."
              onChange={(e) => this.onChange('desc', e.target.value)}
            /> :
            <div className="detail-desc" dangerouslySetInnerHTML={{ __html: urlToLink(desc) }} />
        }

        {dateList.map((date, index) =>
          (<DateInfo
            length={dateList.length}
            onMove={this.moveDate}
            edit={isEdit}
            key={`date-${index}`}
            info={date}
            index={index}
            onChange={this.changeDate}
            onDel={this.delDate}
          />)
        )}

        {
          isEdit &&
          <div className="add-date" onClick={() => this.addDate()}>
            <MyIcon type="add" className="mr_10" /> 再来一天
          </div>
        }
      </div>
    );
  }
}

TravelDetail.propTypes = {
  info: PropTypes.object,
  onChange: PropTypes.func,
  onSave: PropTypes.func,
  onCancel: PropTypes.func,
  changeUrl: PropTypes.func,
  isEdit: PropTypes.bool,
  queryDetail: PropTypes.func,
};

export default TravelDetail;
