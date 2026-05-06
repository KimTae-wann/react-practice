/** @format */

import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const ArticleList = () => {
  const articles = useSelector((state) => state.articles.items);
  return (
    <tbody>
      {articles.map((article) => (
        <tr key={article.id}>
          <td>{article.id}</td>
          <td>{article.subject}</td>
          <td>
            <Link to={`/article/${article.id}`}>{article.subject}</Link>
          </td>
          <td>{article.viewCnt}</td>
          <td>{article.crtDt}</td>
        </tr>
      ))}
    </tbody>
  );
};

export default ArticleList;
