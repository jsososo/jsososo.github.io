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
import { makeSelectUser } from '../App/selectors';
import reducer from './reducer';
import * as Action from './actions';

import { changeUrlQuery, getQueryFromUrl } from '../../utils/stringHelper';

import { message } from 'antd';
import ArticleList from '../../components/ArticleList';
import ArticleDetail from '../../components/ArticleDetail';
import { setSpinning as AppSpinning } from '../App/actions';
import DataSaver from '../../utils/hydrogen';

export class Article extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);

    this.getArticleInfo = this.getArticleInfo.bind(this);
  }

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
        this.getArticleInfo(newId);
      }
    } else {
      setArticleInfo(null);
    }
  }

  componentWillUnmount() {
    this.props.setArticleInfo(null, false);
  }

  getArticleInfo(newId, showLoading = true, cb) {
    const loading = document.getElementById('xhr-loading');
    showLoading && (loading.style.display = 'block');
    const params = {
      table: 'Article',
      id: newId,
    };

    return DataSaver.get(params)
      .then((res) => {
        loading.style.display = 'none';
        const articleDetail = JSON.parse(JSON.stringify(res));
        this.props.setArticleInfo({
          ...articleDetail,
          title: decodeURI(decodeURI(articleDetail.title)),
          content: decodeURI(articleDetail.content.split('').reverse().join('')),
        });
        return res;
      });
  }

  delArticle(id) {
    DataSaver.del({ table: 'Article', id })
      .then(() => {
        changeUrlQuery({ id: '' });
        this.props.setArticleInfo(null, false);
        this.queryArticleList();
        message.success('删除成功~');
      });
  }
  /*
  *  获取所有的文章
  * */
  queryArticleList() {
    const { user, getArticleList, setSpinning } = this.props;
    setSpinning(true);
    DataSaver.query({
      table: 'Article',
      or: [
        ['public', '==', true],
        ['authorId', '==', user.objectId || ' '],
      ],
      select: ['author', 'lastEdit', 'authorId', 'comment', 'title', 'tag', 'public'],
    }).then((res) => {
      setSpinning(false);
      getArticleList(res.map((a) => ({
        ...a,
        title: decodeURI(decodeURI(a.title)),
        content: decodeURI(decodeURI(a.content)),
      })));
    });
  }

  /*
  * 保存文章
  * */
  saveArticle(info, edit, time, lastEdit = true) {
    const { setArticleInfo, setSpinning } = this.props;
    setSpinning(true);
    const saveInfo = {
      ...JSON.parse(JSON.stringify(info)),
      title: encodeURI(encodeURI(info.title)),
      content: encodeURI(info.content).split('').reverse().join(''),
    };
    if (lastEdit) {
      saveInfo.lastEdit = new Date().getTime();
    }
    if (info.objectId) {
      // 保存
      DataSaver.get({ table: 'Article', id: info.objectId })
        .then((q) => DataSaver.set({ q, obj: saveInfo }))
        .then(() => {
          setArticleInfo(info, edit, time);
          setSpinning(false);
          message.success('保存成功~');
        });
    } else {
      // 新建
      DataSaver.create({ table: 'Article', obj: saveInfo })
        .then((res) => {
          info.objectId = res.objectId;
          changeUrlQuery({ id: res.objectId });
          setArticleInfo(info, edit, time);
          setSpinning(false);
          message.success('保存成功~');
        });
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
              getArticleInfo={this.getArticleInfo}
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
  setSpinning: PropTypes.func.isRequired,
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
    setSpinning: (v) => dispatch(AppSpinning(v)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'article', reducer });

export default compose(
  withReducer,
  withConnect,
)(Article);
