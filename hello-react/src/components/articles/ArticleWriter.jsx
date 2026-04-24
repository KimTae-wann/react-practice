/** @format */

const Input = ({ id, title, type = 'text' }) => {
  return (
    <div className="input-field">
      <label htmlFor={id}>{title}</label>
      <input type={type} id={id} />
    </div>
  );
};

const Textarea = ({ id, title }) => {
  return (
    <div className="input-field">
      <label htmlFor={id}>{title}</label>
      <textarea id={id}></textarea>
    </div>
  );
};

const ArticleWriter = () => {
  return (
    <div className="article-writer">
      <Input id="subject" title="제목" />
      <Input id="name" title="이름" />
      <Input id="email" title="이메일" />
      <Textarea id="content" title="내용" />

      <button type="button" className="positive-button">
        저장
      </button>
      <button type="button" className="negative-button">
        취소
      </button>
    </div>
  );
};
export default ArticleWriter;
