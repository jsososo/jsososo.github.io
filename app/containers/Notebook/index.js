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
import { getQueryFromUrl, shortString } from '../../utils/stringHelper';
import recentlyUsed from '../../utils/recentlyUsed';

import * as Action from './actions';
import arrayHelper from '../../utils/arrayHelper';
import Storage from '../../utils/Storage';
import { makeSelectUser } from '../App/selectors';
import { checkLogIn } from '../App/index';
import { setSpinning as AppSetSpinning } from '../App/actions';
import DataSaver from '../../utils/hydrogen';

const Option = Select.Option;

export class Notebook extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);

    this.updateTags = this.updateTags.bind(this);
    this.saveChange = this.saveChange.bind(this);
    this.delNote = this.delNote.bind(this);
  }

  componentWillMount() {
    if (checkLogIn('记事本')) {
      this.queryNoteBooks();
      this.queryAllTags();
      recentlyUsed.set('记事本', 'kit');
    } else {
      this.props.updateNotebook([]);
    }
  }

  componentDidMount() {
    const { user } = this.props;
    const sTags = Storage.get(`p_n_select_tags_${user.username}`, true, '[]');
    this.props.selectTags(sTags);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user.objectId && nextProps.user.objectId !== this.props.user.objectId) {
      this.queryNoteBooks(nextProps.user);
      this.queryAllTags(nextProps.user);
      const { user } = nextProps;
      const sTags = Storage.get(`p_n_select_tags_${user.username}`, true, '[]');
      this.props.selectTags(sTags);
    }
  }

  /*
  *  查找所有该用户的notebook
  * */
  queryNoteBooks(user = this.props.user) {
    this.props.setSpinning(true);
    if (!user.login) {
      return;
    }
    return DataSaver.query({
      table: 'Notebook',
      e: { userId: user.objectId },
      select: ['title', 'star', 'lastEdit', 'shortContent', 'tags'],
      pageNo: 1,
      pageSize: 1000,
    }).then((res) => {
      const list = res || [];
      list.sort((a, b) => {
        if (Boolean(b.star) !== Boolean(a.star)) {
          return Boolean(b.star) - Boolean(a.star);
        }
        return b.lastEdit - a.lastEdit;
      });
      this.props.updateNotebook(list.map((n) => ({
        ...n,
        title: decodeURI(decodeURI(n.title)),
      })));
      this.props.setSpinning(false);
    });
  }

  getNotebookDetail() {
    const id = getQueryFromUrl('id');
    const { notebook, updateNotebook } = this.props;

    DataSaver.get({
      table: 'Notebook',
      id,
    }).then((res) => {
      const index = notebook.list.findIndex((v) => v.objectId === id);
      res.title = decodeURI(decodeURI(res.title));
      res.content = decodeURI(decodeURI(res.content));
      notebook.list[index] = res;
      updateNotebook(notebook.list);
    });
  }

  /*
  *  新建记事本
  * */
  async createNote() {
    const { user } = this.props;
    if (!user.login) {
      return;
    }
    const res = await DataSaver.create({
      table: 'Notebook',
      obj: {
        userId: user.objectId,
        created: timer().time,
        lastEdit: timer().time,
        title: '',
        content: '',
        shortContent: '',
        tags: [],
      },
    });
    await this.queryNoteBooks();
    window.location = `#/kit/notebook/detail/?id=${res.objectId}&edit=true`;
  }

  /*
  *  获取所有的标签
  * */
  queryAllTags(user = this.props.user) {
    DataSaver.query({
      table: 'Tags',
      e: { userId: user.objectId },
      single: true,
    }).then((res) => this.props.changeTags(res));
  }

  /*
  * 更新tags
  * */
  async updateTags(tags) {
    const { user, notebook } = this.props;
    const { tagsBmob } = notebook;
    const value = {
      userId: user.objectId,
      notebook: tags,
    };

    if (!tagsBmob.objectId) {
      await DataSaver.create({ table: 'Tags', obj: value });
      message.success('新增成功~');
    } else {
      await DataSaver.set({
        table: 'Tags',
        id: tagsBmob.objectId,
        obj: value,
      });
    }
    this.queryAllTags();
  }

  /*
  *  保存单个笔记
  * */
  saveChange(info) {
    this.props.setSpinning(true);
    const saveInfo = {
      ...JSON.parse(JSON.stringify(info)),
      lastEdit: timer().time,
      title: encodeURI(encodeURI(info.title)),
      content: encodeURI(encodeURI(info.content)),
      shortContent: shortString(info.content, 57),
    };
    DataSaver.set({
      table: 'Notebook',
      obj: saveInfo,
      id: info.objectId,
    }).then(() => this.queryNoteBooks());
  }

  /*
  * 删除笔记
  * */
  delNote(id) {
    DataSaver.del({
      table: 'Notebook',
      id,
    }).then(() => this.queryNoteBooks())
      .then(() => window.location = '#/kit/notebook');
  }

  /*
  *  清空空标签
  * */
  clearTags() {
    const { user } = this.props;
    let tags = [];
    this.props.notebook.list.forEach((item) => tags = [...tags, ...item.tags]);
    tags = arrayHelper.delDuplicate(tags);
    this.updateTags(tags)
      .then(() => {
        message.success('已清空空标签~');
        this.props.selectTags(arrayHelper.getDuplicate(tags, Storage.get(`p_n_select_tags_${user.username}`, true, '[]')));
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
        if (!info.content) {
          this.getNotebookDetail();
        }
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
                  <Icon type="arrow-left" className="pointer ft_20 mr_20 mt_5 vat" />
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
                    {(notebook.tags || []).map((item) => <Option value={item} key={`tag-o-${item}`}>{item}</Option>)}
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
                      (<NotebookCard
                        key={`nb-${item.objectId}`}
                        info={item}
                      />))
                  }
                </div>
              </div>
          }
          {
            !isIndex &&
            <NotebookDetail
              edit={edit}
              tags={notebook.tags || []}
              updateTags={this.updateTags}
              delNote={this.delNote}
              saveChange={this.saveChange}
              info={info}
              content={info.content}
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
  setSpinning: PropTypes.func.isRequired,
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
    setSpinning: (d) => dispatch(AppSetSpinning(d)),
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
