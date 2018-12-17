import React from 'react';
import PropTypes from 'prop-types';

import { Input, Select, Icon, Tooltip } from 'antd';

class SearchOpts extends React.PureComponent {
  changeSort(v) {
    const sortArr = ['createdAt', 'createdAt', 'lastEdit', 'lastEdit'];
    const downArr = [true, false, true, false];
    this.props.changeSearchOpts('sort', sortArr[v]);
    this.props.changeSearchOpts('down', downArr[v]);
  }

  render() {
    const { changeSearchOpts, searchOpts } = this.props;
    return (
      <div className="article-search inline-block">
        <div className="inline-block mr_20">
          <div className="label">搜索：</div>
          <Input
            defaultValue={searchOpts.search}
            style={{ width: '150px' }}
            placeholder="标题 or 作者"
            onChange={(e) => changeSearchOpts('title', e.target.value)}
          />
        </div>
        <div className="inline-block">
          <div className="label">标签：</div>
          <Select value={searchOpts.tag} className="w_100" onChange={(v) => changeSearchOpts('tag', v)}>
            <Select.Option value="">全部</Select.Option>
            <Select.Option value="技术">技术</Select.Option>
            <Select.Option value="远方">远方</Select.Option>
            <Select.Option value="生活">生活</Select.Option>
          </Select>
        </div>
        <div className="inline-block ml_20">
          <Select defaultValue="0" className="w_100" onChange={(v) => this.changeSort(v)}>
            <Select.Option value="0">创建 <Icon type="arrow-down" /></Select.Option>
            <Select.Option value="1">创建 <Icon type="arrow-up" /></Select.Option>
            <Select.Option value="2">修改 <Icon type="arrow-down" /></Select.Option>
            <Select.Option value="3">修改 <Icon type="arrow-up" /></Select.Option>
          </Select>
        </div>
        <Tooltip placement="top" title={searchOpts.public ? '点击可查看全部文章' : '点击隐藏私密文章' }>
          <Icon
            className="ml_20 pointer"
            style={{ fontSize: '24px' }}
            type={!searchOpts.public ? 'unlock' : 'lock'}
            onClick={() => changeSearchOpts('public', !searchOpts.public)}
          />
        </Tooltip>
      </div>
    );
  }
}

SearchOpts.propTypes = {
  changeSearchOpts: PropTypes.func.isRequired,
  searchOpts: PropTypes.object,
}

export default SearchOpts;
