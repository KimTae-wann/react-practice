/** @format */

const Input = ({ id, title, type = 'text', value, onChange }) => {
  return (
    <div className="input-field">
      <label htmlFor={id}>{title}</label>
      <input type={type} id={id} value={value} onChange={onChange} />
    </div>
  );
};

const Textarea = ({ id, title, value, onChange }) => {
  return (
    <div className="input-field">
      <label htmlFor={id}>{title}</label>
      <textarea id={id} value={value} onChange={onChange}></textarea>
    </div>
  );
};

const ArticleWriter = ({
  subject,
  name,
  email,
  content,
  onSubjectChange,
  onNameChange,
  onEmailChange,
  onContentChange,
  onSaveButtonClick,
  onResetButtonClick,
}) => {
  return (
    <div className="article-writer">
      <Input
        id="subject"
        title="제목"
        value={subject}
        onChange={onSubjectChange}
      />
      <Input id="name" title="이름" value={name} onChange={onNameChange} />
      <Input id="email" title="이메일" value={email} onChange={onEmailChange} />
      <Textarea
        id="content"
        title="내용"
        value={content}
        onChange={onContentChange}
      />

      <button
        type="button"
        className="positive-button"
        onClick={onSaveButtonClick}
      >
        저장
      </button>
      <button
        type="button"
        className="negative-button"
        onClick={onResetButtonClick}
      >
        취소
      </button>
    </div>
  );
};
export default ArticleWriter;
