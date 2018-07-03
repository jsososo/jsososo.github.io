/**
 *
 * Article
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectReducer from 'utils/injectReducer';
import makeSelectArticle from './selectors';
import { makeSelectUser } from "../App/selectors";
import reducer from './reducer';
import * as Action from './actions';

import Storage from '../../utils/Storage';
import { changeUrlQuery, getQueryFromUrl } from "../../utils/stringHelper";

import { message } from 'antd';
import md5 from 'js-md5';
import ArticleList from '../../components/ArticleList';
import ArticleDetail from '../../components/ArticleDetail';

export class Article extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  componentWillMount() {
    if (getQueryFromUrl('id')) {
      this.props.setArticleInfo({
        objectId: getQueryFromUrl('id'),
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    const { article, setArticleInfo } = this.props;
    // 看看url里有没有id，没有就展示列表
    if (getQueryFromUrl('id')) {
      const newId = nextProps.article.articleInfo && nextProps.article.articleInfo.objectId;
      const oldId = article.articleInfo && article.articleInfo.objectId;
      if (newId && newId !== oldId) {
        const loading = document.getElementById('xhr-loading');
        loading.style.display = 'block';
        Storage.getBmob(
          'Article',
          newId,
          null,
          (res) => {
            loading.style.display = 'none';
            const articleDetail = JSON.parse(JSON.stringify(res));
            setArticleInfo({
              ...articleDetail,
              title: decodeURI(decodeURI(articleDetail.title)),
              content: decodeURI(decodeURI(articleDetail.content)),
            });
          },
        );
      }
    } else {
      setArticleInfo(null);
    }
  }

  componentWillUnmount() {
    this.props.setArticleInfo(null, false);
  }

  delArticle(id) {
    Storage.delBmob(
      'Article',
      id,
      () => {
        changeUrlQuery({ id: '' });
        this.props.setArticleInfo(null, false);
        this.queryArticleList();
        message.success('删除成功~');
      }
    );
  }
  /*
  *  获取所有的文章
  * */
  queryArticleList() {
    const { user, getArticleList } = this.props;
    Storage.queryBmobOr(
      'Article',
      [
        (q) => {
          q.equalTo('public', true);
          return q;
        },
        (q) => {
          q.equalTo('authorId', md5(user.username || ' '));
          return q;
        },
      ],
      (q) => {
        q.select('author', 'lastEdit', 'authorId', 'comment', 'title');
        return q;
      },
      (res) => {
        res.sort((a, b) => b.lastEdit - a.lastEdit);
        getArticleList(res.map(a => ({
          ...a,
          title: decodeURI(decodeURI(a.title)),
          content: decodeURI(decodeURI(a.content)),
        })));
      }
    );
  }

  /*
  * 保存文章
  * */
  saveArticle(info, edit, time) {
    const { setArticleInfo } = this.props;
    const saveInfo = {
      ...JSON.parse(JSON.stringify(info)),
      title: encodeURI(encodeURI(info.title)),
      content: encodeURI(encodeURI(info.content)),
    };
    if (info.objectId) {
      // 保存
      Storage.setBmob(
        'Article',
        info.objectId,
        saveInfo,
        () => {
          setArticleInfo(info, edit, time);
          message.success('保存成功~');
        }
      );
    } else {
      // 新建
      Storage.createBmob(
        'Article',
        saveInfo,
        (res) => {
          info.objectId = res.id;
          setArticleInfo(info, edit, time);
          message.success('保存成功~');
        }
      );
    }
  }

  render() {
    const { article, updateSearchOpts, setArticleInfo, user } = this.props;

    return (
      <div>
        <Helmet>
          <title>随性的文字</title>
          <meta name="soso" content="随性的文字" />
        </Helmet>
        {
          !article.articleInfo ?
            <ArticleList
              queryArticleList={() => this.queryArticleList()}
              user={user}
              setArticleInfo={setArticleInfo}
              searchOpts={article.searchOpts}
              updateSearchOpts={updateSearchOpts}
              list={article.list || []}
            /> :
            <ArticleDetail
              delArticle={(id) => this.delArticle(id)}
              user={user}
              saveArticle={(info, edit) => this.saveArticle(info, edit)}
              setArticleInfo={setArticleInfo}
              rawInfo={article.articleInfo}
              edit={article.editArticle}
            />
        }
      </div>
    );
  }
}

Article.propTypes = {
  user: PropTypes.object.isRequired,
  article: PropTypes.object.isRequired,
  getArticleList: PropTypes.func.isRequired,
  updateSearchOpts: PropTypes.func.isRequired,
  setArticleInfo: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  article: makeSelectArticle(),
  user: makeSelectUser(),
});

function mapDispatchToProps(dispatch) {
  return {
    getArticleList: (list) => dispatch(Action.getArticleList(list)),
    updateSearchOpts: (data) => dispatch(Action.updateSearchOpts(data)),
    setArticleInfo: (data, edit, time) => dispatch(Action.setArticleInfo(data, edit, time)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'article', reducer });

export default compose(
  withReducer,
  withConnect,
)(Article);
