/** @format */

import { useEffect, useRef } from 'react';
import { isString } from '../../utils/type';
import { getValidationResult } from '../../utils/errorHandler';
import { useDispatch, useSelector } from 'react-redux';
import { userAction } from '../../stores/toolkit/slices/userSlice';
import { fetchJsonWebToken, fetchMyInfo } from '../../http/article/fetchLogin';

const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();

  const dispatch = useDispatch();
  const { tokenInfo, loginErrors, info } = useSelector((state) => state.user);

  useEffect(() => {
    if (!tokenInfo) {
      dispatch(userAction.autoLogin());
      return;
    }
    const loadMyInfo = async () => {
      // "/api/member/me" 엔드포인트 호출.
      // token이 있을 때만 수정
      const myInfo = await fetchMyInfo(tokenInfo);

      if (myInfo.error) {
        // token이 변조되었거나 만료기간이 도래한 경우
        // slice store도 제거
        if (myInfo.status === 401 || myInfo.code === 'EXPIRED_TOKEN') {
          sessionStorage.removeItem('token');
          dispatch(userAction.logout());
        }
      } else {
        return dispatch(userAction.loadMyInfo(myInfo));
      }
    };
    loadMyInfo();
  }, [tokenInfo, dispatch]);

  if (tokenInfo) {
    const onLogoutButtonClickHandler = () => {
      sessionStorage.removeItem('token');
      dispatch(userAction.logout());
    };
    return (
      <div>
        {info?.name} ({info?.email})
        <button onClick={onLogoutButtonClickHandler}>Logout</button>
      </div>
    );
  }

  const onLoginButtonClickHandler = async () => {
    const tokenResult = await fetchJsonWebToken(
      emailRef.current.value,
      passwordRef.current.value,
    );

    if (tokenResult.error) {
      const errorMessage = isString(tokenResult.error)
        ? tokenResult.error
        : getValidationResult(tokenResult.error);
      dispatch(userAction.setLoginErrors(errorMessage));
    } else {
      sessionStorage.setItem('token', tokenResult.token);
      dispatch(userAction.setToken(tokenResult.token));
    }
  };

  return (
    <div>
      {isString(loginErrors) && <div>{loginErrors}</div>}

      <div>
        <label htmlFor="email">EMAIL</label>
        <input type="email" id="email" ref={emailRef} />
        {loginErrors?.email && <div>{loginErrors.email}</div>}
      </div>
      <div>
        <label htmlFor="password">PWD</label>
        <input type="password" id="password" ref={passwordRef} />
        {loginErrors?.password && <div>{loginErrors.password}</div>}
      </div>
      <button type="button" onClick={onLoginButtonClickHandler}>
        로그인
      </button>
    </div>
  );
};
export default Login;
