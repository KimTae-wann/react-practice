/** @format */
// articles.json 파일 불러오기
import { useEffect, useRef, useState } from 'react';
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

const ArticleMain = () => {
  const [viewPageNo, setViewPageNo] = useState(0);

  const onPagintationButtonClickHandler = (nextPageNo) => {
    setViewPageNo(nextPageNo);
  };

  const [
    {
      count,
      result: articles,
      pagination: { pageNo = 0, pageCount = 0 },
    },
    setArticles,
  ] = useState({
    count: 0,
    result: [],
    pagination: {},
  });
  // console.log(count, result, pagination);

  const refreshArticleList = async () => {
    const articleList = await fetchArticleList(viewPageNo);
    const {
      result: { count, result },
      pagination,
    } = articleList;

    setArticles({ count, result, pagination });

    if (articleList.error) {
      alert(articleList.error);
    }
  };

  useEffect(() => {
    refreshArticleList();
  }, [viewPageNo]);

  const [loginErrors, setLoginErrors] = useState();

  const [tokenInfo, setTokenInfo] = useState();
  const idRef = useRef();
  const passwordRef = useRef();

  const onLoginButtonClickHandler = () => {
    const loginArticleMain = async () => {
      const token = await fetchJsonWebToken(
        idRef.current.value,
        passwordRef.current.value,
      );
      const tokenResult = token;
      setTokenInfo(tokenResult.token);

      if (tokenResult.error) {
        if (isString(tokenResult.error)) {
          setLoginErrors(tokenResult.error);
        } else {
          setLoginErrors(getValidationResult(tokenResult.error));
        }
      }
    };

    loginArticleMain();
  };

  const writerRef = useRef();

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
      refreshArticleList();
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
          <button
            onClick={onPagintationButtonClickHandler.bind(this, pageNo - 1)}
          >
            이전
          </button>
        )}
        {pageNo === 0 && pageCount - 1 > pageNo && (
          <button
            onClick={onPagintationButtonClickHandler.bind(this, pageNo + 1)}
          >
            다음
          </button>
        )}
      </div>
      <ArticleWriter2
        errorHandleRef={writerRef}
        onSaveButtonClick={onSaveButtonClickHandler}
      />
    </div>
  );
};
export default ArticleMain;
