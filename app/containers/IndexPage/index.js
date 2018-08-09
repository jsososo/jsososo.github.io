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

import BoxComponent from '../../components/BoxesComponent';
import './index.scss';
import {message} from "antd/lib/index";

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
      Storage.queryBmob(
        'BoxInfo',
        undefined,
        (res) => {
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
        },
        () => {
          message.error('获取基本信息失败');
        },
        'find',
      );
    } else {
      this.getKits();
    }
  }

  getArticles() {
    Storage.queryBmob(
      'Article',
      (q) => {
        q.equalTo('public', true);
        q.select('author', 'lastEdit', 'title');
        return q;
      },
      (res) => {
        res.sort((a, b) => b.lastEdit - a.lastEdit);
        this.setState({
          articles: res.map(a => ({ ...a, title: shortString(decodeURI(decodeURI(a.title))) })).slice(0, 5),
        });
      },
      (err) => {
        console.log(err);
      },
      'find',
    );
  }

  getKits() {
    const { user } = this.props;
    Storage.queryBmob(
      'RecentlyUsed',
      (q) => {
        q.equalTo('user', user.username);
        return q;
      },
      (res) => {
        if (res) {
          const rU = recentlyUsed.get('kit', res, this.state.kits);
          const boxes = arrayHelper.delDuplicateObj([...rU, ...(this.props.boxes.kit)], ['name']);
          this.setState({
            kits: boxes,
          });
        } else {
          // 说明该用户没有最近使用的数据，建一个空对象
          Storage.createBmob(
            'RecentlyUsed',
            {
              user: user.username,
              value: '{}',
            },
          );
        }
      }
    );
  }

  render() {
    const { kits, articles } = this.state;
    const [showKits, showArticles] = [kits.slice(0, 4), articles.slice(0, 5)];
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
                    {article.title || '无题'}
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
