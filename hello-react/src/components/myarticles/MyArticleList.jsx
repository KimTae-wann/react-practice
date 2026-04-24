export const MyArticleList = ({ item }) => {
  item.articles.map((article) => console.log(article.files));
  return (
    <table
      border="1"
      style={{ width: '100%', textAlign: 'center', borderCollapse: 'collapse' }}
    >
      <thead>
        <tr>
          <th>ID</th>
          <th>제목</th>
          <th>파일</th>
          <th>작성자</th>
          <th>조회수</th>
          <th>작성일</th>
        </tr>
      </thead>
      <tbody>
        {item.articles.map((article) => (
          <tr key={article.id}>
            <td>{article.id}</td>
            <td>{article.subject}</td>
            <td>
              {article.files.length > 0 ? (
                <div className="file-list">
                  {article.files.map((file, index) => (
                    <span key={file.fileNum} className="file-tag">
                      File {index + 1} : {file.displayName} /
                    </span>
                  ))}
                </div>
              ) : (
                <span className="no-file">-</span>
              )}
            </td>
            <td>{article.membersVO.name}</td>
            <td>{article.viewCnt}</td>
            <td>{article.crtDt}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
