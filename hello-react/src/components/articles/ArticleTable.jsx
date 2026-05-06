import { useDispatch, useSelector } from 'react-redux';
import { fetchArticleList } from '../../http/article/fetchArticleList';
import { articleAction } from '../../stores/toolkit/slices/articleSlice';

const ArticleTable = ({ children }) => {
  const {
    pagination: { pageNo = 0, pageCount = 0 },
  } = useSelector((state) => state.articles);

  const dispatch = useDispatch();

  const refreshArticleList = async (viewPageNo) => {
    const articleList = await fetchArticleList(viewPageNo);
    if (articleList.error) {
      alert(articleList.error);
      return;
    }

    dispatch(articleAction.refresh(articleList));
  };
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
