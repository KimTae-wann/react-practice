/** @format */
// articles.json 파일 불러오기
import { useEffect, useRef } from 'react';
import ArticleHeader from './ArticleHeader.jsx';
import ArticleList from './ArticleList.jsx';
import ArticleWriter2 from './ArticleWriter2.jsx';
import {
  fetchAddArticle,
  fetchArticleList,
} from '../../http/article/fetchArticleList.js';
import { useDispatch, useSelector } from 'react-redux';
import { articleAction } from '../../stores/toolkit/slices/articleSlice.js';
import Login from '../user/login.jsx';
import ArticleTable from './ArticleTable.jsx';

const ArticleMain2 = () => {
  const dispatch = useDispatch();

  // Store 에서 필요한 상태만 셀렉트
  const {
    items: articles,
    count,
    pagination,
  } = useSelector((state) => state.articles);
  const { pageNo = 0, pageCount = 0 } = pagination;

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

  const onSaveButtonClickHandler = async (subject, content, attachFile) => {
    const addResult = await fetchAddArticle(subject, content, attachFile);
    if (addResult.error) {
      writerRef.current.setResponseError(addResult.error);
    } else {
      refreshArticleList(pageNo);
    }
  };

  return (
    <div className="wrapper">
      <Login />
      <div>{count}개의 게시글이 검색되었습니다.</div>
      <ArticleTable>
        <ArticleHeader />
        <ArticleList contents={articles} />
      </ArticleTable>

      <ArticleWriter2
        errorHandleRef={writerRef}
        onSaveButtonClick={onSaveButtonClickHandler}
      />
    </div>
  );
};
export default ArticleMain2;
