/*
 *
 * Article reducer
 *
 */

import { fromJS } from 'immutable';
import { getQueryFromUrl } from "../../utils/stringHelper";
import {
  DEFAULT_ACTION,
  GET_ARTICLE_LIST,
  UPDATE_SEARCH_OPTS,
  SET_ARTICLE_INFO,
} from './constants';

const initialState = fromJS({
  list: [],
  searchOpts: {
    pageNo: 1,
    search: '',
    author: '',
  },
  articleInfo: null,
  editArticle: false,
});

function articleReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case GET_ARTICLE_LIST:
      return state
        .set('list', fromJS(action.data));
    case UPDATE_SEARCH_OPTS:
      return state
        .set('searchOpts', fromJS(action.data));
    case SET_ARTICLE_INFO:
      // 这段用来防止之前的文章内容太多时（图片太多），用户提前返回，下载未终止，下载结束后再渲染的问题
      if (getQueryFromUrl('id') === 'new' || !action.data || getQueryFromUrl('id') === action.data.objectId) {
        return state
          .set('articleInfo', action.data ? fromJS(action.data) : null)
          .set('editArticle', fromJS(action.edit));
      }
    default:
      return state;
  }
}

export default articleReducer;
