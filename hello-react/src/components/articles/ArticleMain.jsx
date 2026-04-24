/** @format */
// articles.json 파일 불러오기
import ArticleHeader from './ArticleHeader.jsx';
import ArticleList from './ArticleList.jsx';
import articleData from './articles.json';
import ArticleWriter from './ArticleWriter.jsx';

const ArticleMain = () => {
  console.log(articleData);
  return (
    <div className="wrapper">
      <div>{articleData.articles.length}개의 게시글이 검색되었습니다.</div>
      <table>
        <ArticleHeader />
        <ArticleList contents={articleData.articles} />
      </table>
      <ArticleWriter />
    </div>
  );
};
export default ArticleMain;
