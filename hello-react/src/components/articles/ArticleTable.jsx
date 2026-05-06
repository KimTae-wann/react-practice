import { useDispatch, useSelector } from 'react-redux';
import { articleThunks } from '../../stores/toolkit/slices/articleSlice';
import { useEffect } from 'react';

const ArticleTable = ({ children }) => {
  const {
    pagination: { pageNo = 0, pageCount = 0 },
  } = useSelector((state) => state.articles);

  const dispatch = useDispatch();

  const refreshArticleList = (pageNo) => {
    dispatch(articleThunks.refresh(pageNo));
  };

  useEffect(() => {
    refreshArticleList(pageNo);
  }, []);
  return (
    <>
      <table>{children}</table>
      <div>
        {pageNo > 0 && (
          <button onClick={() => refreshArticleList(pageNo - 1)}>이전</button>
        )}
        {pageCount - 1 > pageNo && (
          <button onClick={() => refreshArticleList(pageNo + 1)}>다음</button>
        )}
      </div>
    </>
  );
};

export default ArticleTable;
