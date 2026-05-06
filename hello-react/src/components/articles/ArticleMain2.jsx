/** @format */
// articles.json 파일 불러오기
import ArticleHeader from './ArticleHeader.jsx';
import ArticleList from './ArticleList.jsx';
import ArticleWriter2 from './ArticleWriter2.jsx';
import { useSelector } from 'react-redux';
import Login from '../user/login.jsx';
import ArticleTable from './ArticleTable.jsx';

const ArticleMain2 = () => {
  // Store 에서 필요한 상태만 셀렉트
  const { count } = useSelector((state) => state.articles);

  return (
    <div className="wrapper">
      <Login />
      <div>{count}개의 게시글이 검색되었습니다.</div>
      <ArticleTable>
        <ArticleHeader />
        <ArticleList />
      </ArticleTable>
      <ArticleWriter2 />
    </div>
  );
};
export default ArticleMain2;
