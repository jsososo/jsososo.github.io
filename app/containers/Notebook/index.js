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

import { Button } from 'antd';
import timer from '../../utils/timer';
import { getQueryFromUrl } from "../../utils/stringHelper";
import Num from '../../utils/num';

import * as Action from './actions';

export class Notebook extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  createNote() {
    const list = this.props.notebook.list;
    const id = !list.length ? 1 : list[list.length - 1].id + 1;
    list.push({
      id,
      title: '新东西',
      content: '',
      tags: [],
      createTime: timer().time,
      lastEditTime: timer().time,
    });
    this.updateList(list);
  }

  updateList(list) {
    window.localStorage.setItem('p_notebook', JSON.stringify(list));
    this.props.updateNotebook(list);
  }

  saveChange(info) {
    const { list } = this.props.notebook;
    list.forEach((item, index) => {
      if (item.id === info.id) {
        list[index] = info;
        list[index].lastEditTime = timer().time;
      }
    });
    this.updateList(list);
  }

  delNote(id) {
    const { list } = this.props.notebook;
    this.updateList(list.filter((item) => item.id !== id));
  }

  render() {
    const { location, notebook } = this.props;
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
                <div className="mt_15">
                  { notebook.list.map((item) => <NotebookCard delNote={(id) => this.delNote(id)} key={`nb-${item.id}`} info={item} />) }
                </div>
              </div>
          }
          {
            !isIndex &&
            <NotebookDetail
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
};

const mapStateToProps = createStructuredSelector({
  notebook: makeSelectNotebook(),
});

function mapDispatchToProps(dispatch) {
  return {
    updateNotebook: (d) => dispatch(Action.updateNotebook(d)),
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
