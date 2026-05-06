import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchArticleById } from '../../http/article/fetchArticleList';
import { handleFileDownload } from '../../utils/download.js';

export const ArticleDetail = () => {
  const { id } = useParams(); // {id: "BO-YYYYMMDD-000001"}

  const [article, setArticle] = useState();
  useEffect(() => {
    const loadArticleById = async () => {
      const articleResult = await fetchArticleById(id);
      if (!articleResult.error) {
        setArticle(articleResult);
      } else {
        alert(articleResult.error);
      }
    };
    loadArticleById();
  }, [id]);

  if (!article) {
    return <div>불러오는 중....</div>;
  }

  return (
    <div>
      {id} 게시글의 상세내용 입니다.
      <div>{article.id}</div>
      <div>{article.subject}</div>
      <div>{article.content}</div>
      <div>
        {article.membersVO.name}({article.email})
      </div>
      <div>{article.viewCnt}</div>
      <div>{article.crtDt}</div>
      <div>{article.mdfyDt}</div>
      <ul>
        {article.files.map((file) => (
          <li key={`${file.fileNum}_${file.fileGroupId}`}>
            {/* 파일 보기 또는 다운로드  */}
            {/* <a
                target="_blank"
                href={`http://192.168.227.1:8080/file/${file.fileGroupId}/${file.fileNum}`}
              >
                {file.displayName} ({file.fileLength} bytes)
              </a> */}

            {/* 파일 강제 다운로드 */}
            <a
              onClick={handleFileDownload.bind(
                this,
                `http://192.168.227.1:8080/file/${file.fileGroupId}/${file.fileNum}`,
              )}
            >
              {file.displayName} ({file.fileLength} bytes)
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};
