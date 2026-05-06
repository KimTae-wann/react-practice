// ReduxToolKit slice store 생성
import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user-slice',
  initialState: {
    tokenInfo: null,
    loginErrors: null,
  },
  reducers: {
    // 2. 로그인 정보 업데이트
    setToken(store, action) {
      store.tokenInfo = action.payload;
      store.loginErrors = null;
    },

    // 3. 로그인 에러 업데이트
    setLoginErrors(store, action) {
      store.loginErrors = action.payload;
    },
  },
});

export const userAction = userSlice.actions;
