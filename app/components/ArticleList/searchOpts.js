import React from 'react';
import PropTypes from 'prop-types';

import { Input } from 'antd';

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
            onChange={(e) => changeSearchOpts('search', e.target.value)}
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
      </div>
    );
  }
}

SearchOpts.propTypes = {
  changeSearchOpts: PropTypes.func.isRequired,
}

export default SearchOpts;
