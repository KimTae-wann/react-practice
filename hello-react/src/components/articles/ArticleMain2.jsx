/** @format */
// articles.json 파일 불러오기
import { useEffect, useRef } from 'react';
import ArticleHeader from './ArticleHeader.jsx';
import ArticleList from './ArticleList.jsx';
import ArticleWriter2 from './ArticleWriter2.jsx';
import {
  fetchAddArticle,
  fetchArticleList,
  fetchJsonWebToken,
} from '../../http/article/fetchArticleList.js';
import { isString } from '../../utils/type.js';
import { getValidationResult } from '../../utils/errorHandler.js';
import { useDispatch, useSelector } from 'react-redux';
import { articleAction } from '../../stores/toolkit/slices/articleSlice.js';

const ArticleMain2 = () => {
  const dispatch = useDispatch();

  // Store 에서 필요한 상태만 셀렉트
  const {
    items: articles,
    count,
    pagination,
    tokenInfo,
    loginErrors,
  } = useSelector((state) => state.articles);
  const { pageNo = 0, pageCount = 0 } = pagination;

  const idRef = useRef();
  const passwordRef = useRef();
  const writerRef = useRef();

  const refreshArticleList = async (viewPageNo) => {
    const articleList = await fetchArticleList(viewPageNo);
    if (articleList.error) {
      alert(articleList.error);
      return;
    }

    dispatch(articleAction.refresh(articleList));
  };

  useEffect(() => {
    refreshArticleList(pageNo);
  }, []);

  const onLoginButtonClickHandler = async () => {
    const tokenResult = await fetchJsonWebToken(
      idRef.current.value,
      passwordRef.current.value,
    );

    if (tokenResult.token) {
      dispatch(articleAction.setToken(tokenResult.token));
    } else {
      const errorMessage = isString(tokenResult.error)
        ? tokenResult.error
        : getValidationResult(tokenResult.error);
      dispatch(articleAction.setLoginErrors(errorMessage));
    }
  };

  const onSaveButtonClickHandler = async (subject, content, attachFile) => {
    const addResult = await fetchAddArticle(
      tokenInfo,
      subject,
      content,
      attachFile,
    );
    if (addResult.error) {
      writerRef.current.setResponseError(addResult.error);
    } else {
      refreshArticleList(pageNo);
    }
  };

  return (
    <div className="wrapper">
      {tokenInfo ? (
        <div>로그인완료</div>
      ) : (
        <>
          {isString(loginErrors) && <div>{loginErrors}</div>}
          <label htmlFor="loginId">Email</label>
          <input type="text" id="loginId" ref={idRef}></input>
          {loginErrors?.email && <div>{loginErrors.email}</div>}
          <br></br>
          <label htmlFor="loginPassword">PWD</label>
          <input type="password" id="loginPassword" ref={passwordRef}></input>
          {loginErrors?.password && <div>{loginErrors.password}</div>}
          <br></br>
          <button onClick={onLoginButtonClickHandler}>로그인</button>
        </>
      )}
      <div>{count}개의 게시글이 검색되었습니다.</div>
      <table>
        <ArticleHeader />
        <ArticleList contents={articles} />
      </table>
      <div>
        {pageNo > 0 && (
          <button onClick={() => refreshArticleList(pageNo - 1)}>이전</button>
        )}
        {pageNo === 0 && pageCount - 1 > pageNo && (
          <button onClick={() => refreshArticleList(pageNo + 1)}>다음</button>
        )}
      </div>
      <ArticleWriter2
        errorHandleRef={writerRef}
        onSaveButtonClick={onSaveButtonClickHandler}
      />
    </div>
  );
};
export default ArticleMain2;
