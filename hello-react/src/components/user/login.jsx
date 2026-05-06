/** @format */

import { useEffect, useRef } from 'react';
import { isString } from '../../utils/type';
import { useDispatch, useSelector } from 'react-redux';
import { userAction, userThunks } from '../../stores/toolkit/slices/userSlice';

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
    dispatch(userThunks.loadMyInfo());
  }, [tokenInfo, dispatch]);

  if (tokenInfo) {
    const onLogoutButtonClickHandler = () => {
      dispatch(userThunks.logout());
    };
    return (
      <div>
        {info?.name} ({info?.email})
        <button onClick={onLogoutButtonClickHandler}>Logout</button>
      </div>
    );
  }

  const onLoginButtonClickHandler = async () => {
    dispatch(
      userThunks.setToken(emailRef.current.value, passwordRef.current.value),
    );
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
