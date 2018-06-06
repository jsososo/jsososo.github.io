/**
 *
 * Notebook
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
import makeSelectNotebook from './selectors';
import reducer from './reducer';
import saga from './saga';

import NotebookCard from '../../components/NotebookCard';
import NotebookDetail from '../../components/NotebookDetail';

import { Button, Select, message, Icon } from 'antd';
import timer from '../../utils/timer';
import { getQueryFromUrl } from "../../utils/stringHelper";
import recentlyUsed from '../../utils/recentlyUsed';

import * as Action from './actions';
import arrayHelper from "../../utils/arrayHelper";
import Storage from '../../utils/Storage';
import { makeSelectUser } from "../App/selectors";
import { checkLogIn } from "../App/index";

const Option = Select.Option;

export class Notebook extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  componentWillMount() {
    recentlyUsed.set('记事本', 'kit');
    if (checkLogIn('记事本')) {
      this.queryNoteBooks();
      this.queryAllTags();
    } else {
      this.props.updateNotebook([]);
    }
  }

  componentDidMount() {
    const sTags = Storage.get('p_n_select_tags', true, '[]');
    if (sTags.length) {
      this.props.selectTags(sTags);
    }
  }

  /*
  *  查找所有该用户的notebook
  * */
  queryNoteBooks(cb) {
    const { user } = this.props;
    Storage.queryBmob(
      'Notebook',
      (q) => {
        q.equalTo('author', user.username);
        q.limit(1000);
        return q;
      },
      (res) => {
        this.props.updateNotebook(res || []);
        if (cb) {
          cb();
        }
      },
      () => {
        message.error('找着找着就出问题了 = =||');
      },
      'find'
    );
  }

  /*
  *  新建记事本
  * */
  createNote() {
    const { user } = this.props;
    Storage.createBmob(
      'Notebook',
      {
        author: user.username,
        created: timer().time,
        lastEdit: timer().time,
        title: '',
        content: '',
        tags: [],
      },
      (res) => {
        this.queryNoteBooks(() => {
          window.location = `#/kit/notebook/detail/?id=${res.id}&edit=true`;
        });
      },
      () => {
        message.error('创建失败 = =||');
      }
    );
    // window.location = `#/kit/notebook/detail/?id=${id}`;
  }

  /*
  *  获取所有的标签
  * */
  queryAllTags() {
    const { user } = this.props;
    Storage.queryBmob(
      'Tags',
      (q) => {
        q.equalTo('username', user.username);
        return q;
      },
      (res) => {
        this.props.changeTags(res);
      }
    );
  }

  /*
  * 更新tags
  * */
  updateTags(tags, cb = () => message.success('新增成功~')) {
    const { user, notebook } = this.props;
    const { tagsBmob } = notebook;
    const value = {
      username: user.username,
      notebook: tags,
    };
    const callback = () => {
      this.queryAllTags();
      cb();
    };
    if (!tagsBmob.objectId) {
      Storage.createBmob('Tags', value, callback);
    } else {
      Storage.setBmob('Tags', tagsBmob.objectId, value, callback);
    }
  }

  /*
  *  保存单个笔记
  * */
  saveChange(info, cb) {
    info.lastEdit = timer().time;
    Storage.setBmob(
      'Notebook',
      info.objectId,
      info,
      () => this.queryNoteBooks(cb),
      () => message.error('保存出问题了呀'),
    );
  }

  /*
  * 删除笔记
  * */
  delNote(id) {
    Storage.delBmob(
      'Notebook',
      id,
      () => this.queryNoteBooks(() => window.location = '#/kit/notebook'),
      () => message.error('删除出错啦'));
  }

  /*
  *  清空空标签
  * */
  clearTags() {
    let tags = [];
    this.props.notebook.list.forEach((item) => tags = [...tags, ...item.tags]);
    tags = arrayHelper.delDuplicate(tags);
    this.updateTags(tags, () => {
      message.success('已清空空标签~');
      this.props.selectTags(arrayHelper.getDuplicate(tags, Storage.get('p_n_select_tags', true, '[]')));
    });
  }

  render() {
    const { location, notebook, selectTags } = this.props;
    // 根据 url 决定是否筛选为 detail 和是否 编辑
    let isIndex = location.pathname !== '/kit/notebook/detail/';
    let info = {};
    let edit = false;
    if (!isIndex) {
      const search = getQueryFromUrl();
      info = notebook.list.find((item) => item.objectId === search.id);
      if (!info) {
        isIndex = true;
      } else {
        edit = search.edit ? JSON.parse(search.edit) : false;
      }
    }
    // 根据选择的标签来筛选订单
    const list = notebook.sTags.length > 0 ?
      notebook.list.filter((item) => arrayHelper.hasDuplicate(item.tags, notebook.sTags)) :
      notebook.list;

    return (
      <div>
        <Helmet>
          <title>记事本</title>
          <meta name="记事本" content="记事本" />
        </Helmet>
        <div>
          {
            isIndex &&
              <div>
                <a href="#/kit/" style={{ marginLeft: '2.5%' }}>
                  <Icon type="arrow-left" className="pointer ft_20 mr_20 mt_5 vat"/>
                </a>
                <Button
                  type="primary"
                  onClick={() => this.createNote()}
                >新建</Button>
                <div className="inline-block">
                  <Select
                    value={notebook.sTags}
                    className="ml_20"
                    style={{ minWidth: '200px' }}
                    mode="tags"
                    placeholder="Select tags"
                    onChange={selectTags}
                  >
                    {notebook.tags.map((item) => <Option value={item} key={`tag-o-${item}`}>{item}</Option>)}
                  </Select>
                  <Button className="ml_5" onClick={() => this.clearTags()} type="danger">清空空标签</Button>
                </div>
                {
                  list.length === 0 &&
                  <div className="mt_20" style={{ marginLeft: '2.5%' }}>啥也没有，还不快去记笔记</div>
                }
                <div className="mt_15">
                  {
                    list.map((item) =>
                      <NotebookCard
                        key={`nb-${item.objectId}`}
                        info={item}
                      />)
                  }
                </div>
              </div>
          }
          {
            !isIndex &&
            <NotebookDetail
              edit={edit}
              tags={notebook.tags || []}
              updateTags={(t) => this.updateTags(t)}
              delNote={(id) => this.delNote(id)}
              saveChange={(d) => this.saveChange(d)}
              info={info}
            />
          }
        </div>
      </div>
    );
  }
}

Notebook.propTypes = {
  notebook: PropTypes.object.isRequired,
  location: PropTypes.object,
  updateNotebook: PropTypes.func.isRequired,
  selectTags: PropTypes.func.isRequired,
  changeTags: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  notebook: makeSelectNotebook(),
  user: makeSelectUser(),
});

function mapDispatchToProps(dispatch) {
  return {
    updateNotebook: (d) => dispatch(Action.updateNotebook(d)),
    selectTags: (d) => dispatch(Action.selectTags(d)),
    changeTags: (d) => dispatch(Action.changeTags(d)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'notebook', reducer });
const withSaga = injectSaga({ key: 'notebook', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Notebook);
