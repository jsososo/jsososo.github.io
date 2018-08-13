import React from 'react';
import PropTypes from 'prop-types';

import { Input, Select } from 'antd';

class SearchOpts extends React.PureComponent {
  render() {
    const { changeSearchOpts, searchOpts } = this.props;
    return (
      <div className="article-search inline-block">
        <div className="inline-block mr_20">
          <div className="label">搜索：</div>
          <Input
            defaultValue={searchOpts.search}
            style={{ width: '150px' }}
            placeholder="只能搜标题哟"
            onChange={(e) => changeSearchOpts('title', e.target.value)}
          />
        </div>
        <div className="inline-block">
          <div className="label">作者：</div>
          <Input
            style={{ width: '100px' }}
            placeholder="可以搜 匿名"
            onChange={(e) => changeSearchOpts('author', e.target.value)}
          />
        </div>
        <div className="inline-block ml_10">
          <div className="label">标签：</div>
          <Select value={searchOpts.tag} className="w_100" onChange={(v) => changeSearchOpts('tag', v)}>
            <Select.Option value="">全部</Select.Option>
            <Select.Option value="技术">技术</Select.Option>
            <Select.Option value="远方">远方</Select.Option>
            <Select.Option value="生活">生活</Select.Option>
          </Select>
        </div>
      </div>
    );
  }
}

SearchOpts.propTypes = {
  changeSearchOpts: PropTypes.func.isRequired,
  searchOpts: PropTypes.object,
}

export default SearchOpts;
