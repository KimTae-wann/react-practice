// ReduxToolKit slice store 생성
import { createSlice } from '@reduxjs/toolkit';
import {
  fetchAddArticle,
  fetchArticleList,
} from '../../../http/article/fetchArticleList';
import { getValidationResult } from '../../../utils/errorHandler';
import { isString } from '../../../utils/type';

export const articleSlice = createSlice({
  name: 'article-slice',
  initialState: {
    items: [],
    count: 0,
    pagination: { pageNo: 0, pageCount: 0 },
    error: {
      list: null,
      write: null,
    },
  },
  reducers: {
    // 1. 게시글 목록 갱신
    refresh(store, action) {
      const {
        result: { count, result },
        pagination,
      } = action.payload;
      store.count = count;
      store.items = result;
      store.pagination = pagination;
      store.error.list = null;
    },
    listError(store, action) {
      store.error.list = action.payload;
    },
    writeError(store, action) {
      if (isString(action.payload)) {
        store.error.write = action.payload;
      } else {
        store.error.write = getValidationResult(action.payload);
      }
    },
    clearWriteError(store) {
      store.error.write = null;
    },
  },
});

export const articleAction = articleSlice.actions;

export const articleThunks = {
  refresh(pageNo) {
    return async (dispatcher) => {
      const articleList = await fetchArticleList(pageNo);
      if (articleList.error) {
        alert(articleList.error);
        return;
      }

      dispatcher(articleAction.refresh(articleList));

      if (articleList.error) {
        dispatcher(articleAction.listError(articleList.error));
      }
    };
  },
  write(subject, content, attachFile) {
    return async (dispatcher) => {
      const addResult = await fetchAddArticle(
        sessionStorage.getItem('token'),
        subject,
        content,
        attachFile,
      );
      if (addResult.error) {
        dispatcher(articleAction.writeError(addResult.error));
      } else {
        dispatcher(articleAction.clearWriteError);
        dispatcher(articleThunks.refresh(0));
      }
    };
  },
};
