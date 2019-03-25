import React from 'react';
import PropTypes from 'prop-types';
import { Input, Button, Tooltip } from 'antd';
import timer from '../../utils/timer';
import MyIcon from '../Icon';

import { urlToLink, stringCalculate } from '../../utils/stringHelper';

const TextArea = Input.TextArea;

const ItemList = [
  { type: 'ticket', label: '景点', placeholder: '要去哪儿' },
  { type: 'traffic', label: '交通', placeholder: '怎么走怎么走' },
  { type: 'eat', label: '吃滴', placeholder: '有啥好吃滴' },
  { type: 'hotel', label: '住滴', placeholder: '在哪儿休息咧' },
  { type: 'other', label: '其他', placeholder: '还有啥' },
  { type: 'strategy', icon: 'search', label: '攻略', textArea: true },
];

class Date extends React.PureComponent {
  onChange(k, v) {
    const { info, onChange, index } = this.props;
    info[k] = v;
    onChange(index, info);
  }

  addItem() {
    const { info, onChange, index } = this.props;
    info.list = info.list || [];
    info.list.push({
      point: info.point,
      place: '',
      id: timer().time,
    });
    onChange(index, info);
  }

  changeItem(k, v, i) {
    const { info, onChange, index } = this.props;
    const { list } = info;
    list[i][k] = v;
    onChange(index, info);
  }

  delItem(id) {
    const { info, onChange, index } = this.props;
    const { list } = info;
    info.list = list.filter((item) => item.id !== id);
    onChange(index, info);
  }

  moveItem(i) {
    const { info, onChange, index } = this.props;
    const { list } = info;
    const temp = list[i];
    list[i] = list[i + 1];
    list[i + 1] = temp;
    onChange(index, info);
  }

  render() {
    const { info, index, edit, onDel, onMove, length } = this.props;
    const { list = [], title } = info;
    return (
      <div className="date-info">
        <div className="inline-block vat">
          <div className="date-index">
            <span>D</span>
            <span className="date-index-num">{index + 1}</span>
          </div>
        </div>
        <div className="inline-block" style={{ width: 'calc(100% - 120px)' }}>
          <div>
            { edit ?
              <Input style={{ width: '300px' }} size="large" value={title} onChange={(e) => this.onChange('title', e.target.value)} /> :
              <span className="ft_18">{title}</span>
            }
            { edit && (
              <div className="inline-block">
                { index !== 0 &&
                  <Tooltip placement="top" title="上移">
                    <span>
                      <MyIcon
                        onClick={() => onMove(index - 2)}
                        className="ml_5 mr_5 pointer"
                        type="to-top"
                      />
                    </span>
                  </Tooltip>
                }
                { index !== length &&
                  <Tooltip placement="top" title="下移">
                    <span>
                      <MyIcon
                        onClick={() => onMove(index - 1)}
                        className="ml_5 mr_5 pointer"
                        type="to-bottom"
                      />
                    </span>
                  </Tooltip>
                }
                <MyIcon type="del" className="ml_20 pointer fc_red" onClick={() => onDel(index)} />
              </div>
            )}
          </div>
          <div>
            {list.map((item, i) => (
              <div key={item.id}>
                { edit ?
                  <div className="mt_15">
                    <div>
                      <Input style={{ width: '300px' }} value={item.place} onChange={(e) => this.changeItem('place', e.target.value, i)} />
                      {ItemList.map((icon) => (
                        <Tooltip placement="top" title={icon.label} key={`${item.id}-${icon.type}`}>
                          <span>
                            <MyIcon
                              onClick={() => this.changeItem(icon.type, item[icon.type] === undefined ? '' : undefined, i)}
                              className="ml_5 mr_5 pointer"
                              type={icon.icon || icon.type}
                              color={item[icon.type] !== undefined ? '#3089DC' : '#999'}
                            />
                          </span>
                        </Tooltip>
                      ))}
                      { i !== 0 &&
                        <Tooltip placement="top" title="上移">
                          <span>
                            <MyIcon
                              onClick={() => this.moveItem(i - 1)}
                              className="ml_5 mr_5 pointer"
                              type="to-top"
                            />
                          </span>
                        </Tooltip>
                      }
                      { i !== (list.length - 1) &&
                        <Tooltip placement="top" title="下移">
                          <span>
                            <MyIcon
                              onClick={() => this.moveItem(i)}
                              className="ml_5 mr_5 pointer"
                              type="to-bottom"
                            />
                          </span>
                        </Tooltip>
                      }
                      <MyIcon type="del" className="ml_20 pointer fc_red" onClick={() => this.delItem(item.id)} />
                    </div>
                    <div>
                      {ItemList.map((icon) => item[icon.type] !== undefined && (
                        <div className="mt_5" key={`${item.id}-val-${icon.type}`}>
                          <MyIcon className="mr_20 vat" height={32} type={icon.icon || icon.type} />
                          { !icon.textArea &&
                          <Input
                            value={item[icon.type]}
                            onChange={(e) => this.changeItem(icon.type, e.target.value, i)}
                            placeholder={icon.placeholder || ''}
                            style={{ width: '50%' }}
                          /> }
                          { !icon.textArea &&
                          <Input
                            onChange={(e) => this.changeItem(`${icon.type}_price`, e.target.value, i)}
                            onBlur={(e) => this.changeItem(`${icon.type}_price`, stringCalculate(e.target.value, 2), i)}
                            value={item[`${icon.type}_price`]}
                            placeholder="价格，可以加减乘除哟"
                            style={{ width: '30%' }}
                          /> }
                          { icon.textArea &&
                            <TextArea
                              value={item[icon.type]}
                              onChange={(e) => this.changeItem(icon.type, e.target.value, i)}
                              autosize={{ minRows: 2 }}
                              style={{ width: '80%' }}
                            />
                          }
                        </div>
                      ))}
                    </div>
                  </div> :
                  <div className="mt_15">
                    <b>{item.place}</b>
                    <div>
                      {ItemList.map((icon) => item[icon.type] !== undefined && (
                        <div className="mt_5" key={`${item.id}-show-${icon.type}`}>
                          <MyIcon color="#999" className="mr_20 vat" height={20} type={icon.icon || icon.type} />
                          { icon.textArea ?
                            <div className="date-detail-rows" dangerouslySetInnerHTML={{ __html: urlToLink(item[icon.type]) }} /> :
                            <div className="date-detail-line">
                              <div className="date-detail-val">{item[icon.type]}</div>
                              { item[`${icon.type}_price`] && <div className="date-detail-price">¥ {item[`${icon.type}_price`]}</div>}
                            </div>
                          }
                        </div>
                      ))}
                    </div>
                  </div>
                  }
              </div>
            ))}
          </div>
          {
            edit &&
            <Button type="secondary" className="mt_10" onClick={() => this.addItem()}>
              <MyIcon type="add" className="mr_10" size={14} />
              <span>添加行程</span>
            </Button>
          }
        </div>
      </div>
    );
  }
}

Date.propTypes = {
  info: PropTypes.object,
  index: PropTypes.number,
  onChange: PropTypes.func,
  onDel: PropTypes.func,
  edit: PropTypes.bool,
  onMove: PropTypes.func,
  length: PropTypes.number,
};

export default Date;
