export const MyArticleWriter = () => {
  return (
    <div>
      <form>
        <div className="input-group">
          <label htmlFor="subject">제목</label>
          <input
            className="subject"
            id="subject"
            placeholder="제목을 입력하세요"
          ></input>
          <label htmlFor="email">이메일</label>
          <input
            className="email"
            id="email"
            placeholder="이메일을 입력하세요"
          ></input>
          <label htmlFor="name">이름</label>
          <input
            className="name"
            id="name"
            placeholder="이름을 입력하세요"
          ></input>
        </div>
        <label htmlFor="content">내용</label>
        <textarea
          className="content"
          id="content"
          placeholder="내용을 입력하세요"
        ></textarea>
      </form>
      <button className="button" type="button">
        저장
      </button>
    </div>
  );
};
