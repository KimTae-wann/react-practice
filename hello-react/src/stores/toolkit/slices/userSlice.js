// ReduxToolKit slice store 생성
import { createSlice } from '@reduxjs/toolkit';
import {
  fetchJsonWebToken,
  fetchMyInfo,
} from '../../../http/article/fetchLogin';
import { isString } from '../../../utils/type';
import { getValidationResult } from '../../../utils/errorHandler';

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
      if (isString(action.payload)) {
        store.loginErrors = action.payload;
      } else {
        store.loginErrors = getValidationResult(action.payload);
      }
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

// toolkit slice store 에 대한 custom action(reducer) ==> fetch + dispatch 생성
export const userThunks = {
  setToken(email, password) {
    // useDispatch의 결과가 파라미터로 전달
    return async (dispatcher) => {
      // fetch
      const tokenResult = await fetchJsonWebToken(email, password);
      // dispatch
      if (!tokenResult.error) {
        sessionStorage.setItem('token', tokenResult.token);
        dispatcher(userAction.setToken(tokenResult.token));
      } else {
        dispatcher(userAction.setLoginErrors(tokenResult.error));
      }
    };
  },
  loadMyInfo() {
    return async (dispatcher) => {
      const sessionToken = sessionStorage.getItem('token');
      const myInfo = await fetchMyInfo(sessionToken);
      if (myInfo.error) {
        if (myInfo.status === 401 || myInfo.code === 'EXPIRED_TOKEN') {
          sessionStorage.removeItem('token');
          dispatcher(userAction.logout());
        }
      } else {
        return dispatcher(userAction.loadMyInfo(myInfo));
      }
    };
  },
  logout() {
    return async (dispatcher) => {
      sessionStorage.removeItem('token');
      dispatcher(userAction.logout());
    };
  },
};
