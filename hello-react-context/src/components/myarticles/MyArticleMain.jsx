import articleData from './articles.json';
import { MyArticleHeader } from './MyArticleHeader';
import { MyArticleList } from './MyArticleList';
import { MyArticleWriter } from './MyArticleWriter';

const MyArticleMain = () => {
  return (
    <div>
      <table>
        <ArticleHeader />
        <ArticleList item={articleData} />
      </table>
      <ArticleWriter />
      {/* <div>게시글 작성 폼 (제목, 이메일, 이름, 내용)</div> */}
    </div>
  );
};

export default MyArticleMain;
