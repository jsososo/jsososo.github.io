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

import { Button, Select, message } from 'antd';
import timer from '../../utils/timer';
import { getQueryFromUrl } from "../../utils/stringHelper";
import Num from '../../utils/num';
import recentlyUsed from '../../utils/recentlyUsed';

import * as Action from './actions';
import arrayHelper from "../../utils/arrayHelper";
import Storage from '../../utils/localStorage';

const Option = Select.Option;

export class Notebook extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  componentWillMount() {
    recentlyUsed.set('记事本', 'kit');
  }

  componentDidMount() {
    const sTags = Storage.get('p_n_select_tags', true, '[]');
    if (sTags.length) {
      this.props.selectTags(sTags);
    }
  }

  createNote() {
    const localNotebook = this.props.notebook.localNotebook;
    const id = !localNotebook.length ? 1 : localNotebook[localNotebook.length - 1].id + 1;
    localNotebook.push({
      id,
      title: '新东西',
      content: '',
      tags: [],
      createTime: timer().time,
      lastEditTime: timer().time,
    });
    this.updateList(localNotebook);
    window.location = `#/kit/notebook/detail/?id=${id}`;
  }

  updateList(localNotebook) {
    Storage.set('p_notebook', localNotebook, true);
    this.props.updateNotebook(localNotebook);
  }

  saveChange(info) {
    const { localNotebook } = this.props.notebook;
    localNotebook.forEach((item, index) => {
      if (item.id === info.id) {
        localNotebook[index] = info;
        localNotebook[index].lastEditTime = timer().time;
      }
    });
    const tags = arrayHelper.delDuplicate(this.props.notebook.tags, info.tags);
    Storage.set('p_n_tags', tags, true);
    this.props.changeTags(tags);
    this.updateList(localNotebook);
  }

  delNote(id) {
    const { localNotebook } = this.props.notebook;
    this.updateList(localNotebook.filter((item) => item.id !== id));
  }

  clearTags() {
    let tags = [];
    this.props.notebook.localNotebook.forEach((item) => tags = [...tags, ...item.tags]);
    tags = arrayHelper.delDuplicate(tags);
    message.success('已清空空标签~');
    Storage.set('p_n_tags', tags, true);
    this.props.changeTags(tags);
  }

  render() {
    const { location, notebook, selectTags } = this.props;
    let isIndex = location.pathname !== '/kit/notebook/detail/';
    let info = {};
    if (!isIndex) {
      const id = Num(getQueryFromUrl(location.search, 'id'));
      info = notebook.list.find((item) => item.id === id);
      if (!info) {
        isIndex = true;
      }
    }

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
                <Button
                  style={{ marginLeft: '2.5%' }}
                  type="primary"
                  onClick={() => this.createNote()}
                >新建</Button>
                {
                  notebook.tags.length !== 0 &&
                  <div className="inline-block">
                    <Select
                      value={Storage.get('p_n_select_tags', true, '[]')}
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
                }
                <div className="mt_15">
                  {
                    notebook.list.map((item) =>
                      <NotebookCard
                        delNote={(id) => this.delNote(id)}
                        key={`nb-${item.id}`}
                        info={item}
                      />)
                  }
                </div>
              </div>
          }
          {
            !isIndex &&
            <NotebookDetail
              tags={notebook.tags}
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
};

const mapStateToProps = createStructuredSelector({
  notebook: makeSelectNotebook(),
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
