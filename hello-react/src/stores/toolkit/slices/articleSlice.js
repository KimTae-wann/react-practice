// ReduxToolKit slice store 생성
import { createSlice } from '@reduxjs/toolkit';

export const articleSlice = createSlice({
  name: 'article-slice',
  initialState: {
    items: [],
    count: 0,
    pagination: { pageNo: 0, pageCount: 0 },
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
    },
  },
});

export const articleAction = articleSlice.actions;
