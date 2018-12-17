/**
*
* ArticleList
*
*/

import React from 'react';
import PropTyps from 'prop-types';

import SearchOpts from './searchOpts';
import { Icon, Button, Pagination } from 'antd';

import { changeUrlQuery, shortString } from "../../utils/stringHelper";
import timer from '../../utils/timer';

import './index.scss';
// import styled from 'styled-components';


class ArticleList extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  componentWillMount() {
    this.props.queryArticleList();
  }

  // 根绝searchOpts筛选list
  getList() {
    const { list, searchOpts } = this.props;
    const result = list.filter((item) => {
      if (searchOpts.public && !item.public) {
        return false;
      }
      if (item.tag && item.tag === searchOpts.tag) {
        return false;
      }
      const val = `${item.title} ${item.author}`;
      if (val && searchOpts.title && !val.match(new RegExp(searchOpts.title, 'i'))) {
        return false;
      }
      return true;
    }).sort((a, b) => (searchOpts.down ? 1 : -1) * (timer(a[searchOpts.sort]).time - timer(b[searchOpts.sort].time)));
    return result.slice(20 * (searchOpts.pageNo - 1), 20 * (searchOpts.pageNo));
  }

  changeSearchOpts(k, v) {
    const { searchOpts, updateSearchOpts } = this.props;
    searchOpts.pageNo = 1;
    searchOpts[k] = v;
    updateSearchOpts(searchOpts);
  }

  render() {
    const showList = this.getList();
    const { setArticleInfo, user, searchOpts, list } = this.props;
    return (
      <div>
        <SearchOpts
          searchOpts={searchOpts}
          changeSearchOpts={(k, v) => this.changeSearchOpts(k, v)}
        />
        <Button
          className="ml_20"
          onClick={() => {
            changeUrlQuery({ id: 'new' });
            setArticleInfo({
              title: '',
              content: '',
              author: user.username,
              authorId: user.objectId || '',
              lastEdit: timer().time,
              tag: '',
              public: false,
              comment: [],
            }, true);
          }}
        >我也写一篇</Button>
        {
          showList.length === 0 &&
            <div className="mt_20 pt_20">
              这个列表贼空
            </div>
        }
        <div className="mt_20">
          {
            showList.map((a) => (
              <div
                className="article-item"
                key={a.objectId}
                onClick={() => {
                  changeUrlQuery({ id: a.objectId });
                  setArticleInfo(a);
                }}
              >
                <div className="article-title">{a.tag && `【${a.tag}】`}{shortString(a.title) || '无题'}</div>
                <div className="pull-right">
                  <div className="article-author">{a.author}</div>
                  {
                    a.comment && a.comment.length > 0 &&
                    <div className="inline-block"><Icon type="message" className="pr_5" />{a.comment.length}</div>
                  }
                  <div className="article-time">{timer(a[searchOpts.sort]).str('YY-M-D HH:mm')}</div>
                </div>
              </div>
            ))
          }
        </div>
        {
          list.length > 20 &&
          <div style={{ width: '770px' }}>
            <Pagination
              current={searchOpts.pageNo}
              total={list.length}
              pageSize={20}
              className="pull-right mt_20"
              onChange={(v) => this.changeSearchOpts('pageNo', v)}
            />
          </div>
        }
      </div>
    );
  }
}

ArticleList.propTypes = {
  list: PropTyps.array.isRequired,
  searchOpts: PropTyps.object.isRequired,
  updateSearchOpts: PropTyps.func.isRequired,
  setArticleInfo: PropTyps.func.isRequired,
  queryArticleList: PropTyps.func.isRequired,
  user: PropTyps.object.isRequired,
};

export default ArticleList;
