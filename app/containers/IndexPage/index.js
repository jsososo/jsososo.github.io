/**
 *
 * IndexPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectIndexPage from './selectors';
import { makeSelectUser, makeSelectBoxes } from "../App/selectors";
import reducer from './reducer';
import saga from './saga';
import { setArticleInfo } from "../Article/actions";
import { getBoxInfo } from "../App/actions";

import Storage from '../../utils/Storage';
import recentlyUsed from '../../utils/recentlyUsed';
import arrayHelper from '../../utils/arrayHelper';
import { shortString } from "../../utils/stringHelper";
import timer from '../../utils/timer';

import BoxComponent from '../../components/BoxesComponent';
import './index.scss';
import {message} from "antd/lib/index";
import DataSaver from '../../utils/hydrogen';

export class IndexPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);

    this.state = {
      articles: [],
      kits: props.boxes.kit || [],
    };
  }

  componentWillMount() {
    this.getArticles();
    this.getBoxInfo();
  }

  getBoxInfo() {
    if (!this.state.kits.length) {
      // 获取所有的子应用大致信息
      DataSaver.query({
        table: 'BoxInfo',
      }).then((res) => {
        // 把box列表按照type为key名分来排好
        const boxInfo = {};
        res.forEach((item) => {
          if (!boxInfo[item.type]) {
            boxInfo[item.type] = [];
          }
          boxInfo[item.type].push(item);
        });
        this.props.getBoxInfo(boxInfo);
        this.setState({
          kits: boxInfo.kit,
        }, this.getKits);
      }).catch(() => message.error('获取基本信息失败'));
    } else {
      this.getKits();
    }
  }

  getArticles() {
    DataSaver.query({
      table: 'Article',
      e: { 'public': true },
      select: ['author', 'lastEdit', 'title', 'tag'],
    }).then((res) => {
      res.sort((a, b) => timer(b.createdAt).time - timer(a.createdAt).time);
      this.setState({
        articles: res.map(a => ({ ...a, title: shortString(decodeURI(decodeURI(a.title))) })),
      });
    });
  }

  async getKits() {
    const rU = await recentlyUsed.query('kit', this.state.kits);
    const boxes = arrayHelper.delDuplicateObj([...rU, ...(this.props.boxes.kit)], ['name']);
    this.setState({
      kits: boxes,
    });
  }

  render() {
    const { kits, articles } = this.state;
    const [showKits, showArticles] = [kits.slice(0, 4), articles.slice(0, 8)];
    return (
      <div>
        <Helmet>
          <title>首页</title>
          <meta name="soso" content="首页" />
        </Helmet>
        <div>
          <div className="inline-block vat" style={{ width: '40%' }}>
            <h2 className="index-title" onClick={() => window.location = '#/kit/'}>没用的工具</h2>
            {
              showKits.map((kit, index) => <BoxComponent key={`index-kit-${index}`} boxInfo={kit} />)
            }
          </div>
          <div className="inline-block vat" style={{ width: '50%' }}>
            <h2 className="index-title" onClick={() => window.location = '#/article/'}>随性的文字</h2>
            {
              showArticles.map((article, index) =>
                <a
                  key={`index-article-${index}`}
                  href={`#/article/?id=${article.objectId}`}
                  onClick={() => this.props.setArticle(article)}
                >
                  <div className="index-article-item">
                    {article.tag && `【${article.tag}】`}{article.title || '无题'}
                    <span className="pull-right">{article.author}</span>
                  </div>
                </a>
              )
            }
          </div>
        </div>
      </div>
    );
  }
}

IndexPage.propTypes = {
  user: PropTypes.object.isRequired,
  boxes: PropTypes.object.isRequired,
  setArticle: PropTypes.func.isRequired,
  getBoxInfo: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  indexpage: makeSelectIndexPage(),
  user: makeSelectUser(),
  boxes: makeSelectBoxes(),
});

function mapDispatchToProps(dispatch) {
  return {
    setArticle: (data) => dispatch(setArticleInfo(data)),
    getBoxInfo: (data) => dispatch(getBoxInfo(data)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'indexPage', reducer });
const withSaga = injectSaga({ key: 'indexPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(IndexPage);
