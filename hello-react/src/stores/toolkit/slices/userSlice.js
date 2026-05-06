// ReduxToolKit slice store 생성
import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user-slice',
  initialState: {
    tokenInfo: null,
    loginErrors: null,
    info: null, // 사용자 정보
  },
  reducers: {
    // 로그인 정보 업데이트
    setToken(store, action) {
      store.tokenInfo = action.payload;
      store.loginErrors = null;
    },

    // 로그인 에러 업데이트
    setLoginErrors(store, action) {
      store.loginErrors = action.payload;
    },

    autoLogin(store) {
      // sessionStorage 에 있는 token을 가져와서 userSlice에 등록한다.
      const token = sessionStorage.getItem('token');
      if (token) {
        store.tokenInfo = token;
      }
    },

    logout(store) {
      store.tokenInfo = null;
      store.info = null;
      store.loginErrors = null;
    },

    loadMyInfo(store, action) {
      store.info = action.payload;
    },
  },
});

export const userAction = userSlice.actions;
