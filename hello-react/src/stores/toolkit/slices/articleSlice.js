// ReduxToolKit slice store 생성
import { createSlice } from '@reduxjs/toolkit';

export const articleSlice = createSlice({
  name: 'article-slice',
  initialState: {
    items: [],
    count: 0,
    pagination: { pageNo: 0, pageCount: 0 },
    tokenInfo: null,
    loginErrors: null,
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

    // 2. 로그인 정보 업데이트
    setToken(store, action) {
      store.tokenInfo = action.payload;
      store.loginErros = null;
    },

    // 3. 로그인 에러 업데이트
    setLoginErrors(store, action) {
      store.loginErrors = action.payload;
    },
  },
});

export const articleAction = articleSlice.actions;
