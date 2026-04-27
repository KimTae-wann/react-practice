/** @format */
import { useRef, useState } from 'react';
import { Alert } from '../ui/Modals';

const Input = ({ id, title, type = 'text', value, ref, onChange }) => {
  return (
    <div className="input-field">
      <label htmlFor={id}>{title}</label>
      <input type={type} id={id} value={value} ref={ref} onChange={onChange} />
    </div>
  );
};

const Textarea = ({ id, title, value, ref, onChange }) => {
  return (
    <div className="input-field">
      <label htmlFor={id}>{title}</label>
      <textarea id={id} value={value} ref={ref} onChange={onChange}></textarea>
    </div>
  );
};

const ArticleWriter2 = ({ onSaveButtonClick }) => {
  const subjectRef = useRef();
  const nameRef = useRef();
  const emailRef = useRef();
  const contentRef = useRef();

  const alertRef = useRef();

  const [viewMode, setViewMode] = useState('button');

  const [errorMessage, setErrorMessage] = useState();

  // 저장을 클릭하면 입력했던 값을 가져와 출력한다.
  const onSaveButtonClickHandler = () => {
    console.log(alertRef);

    if (!subjectRef.current.value) {
      alertRef.current.showModal();
      setErrorMessage('제목을 입력해주세요');
    }
    if (!nameRef.current.value) {
      alertRef.current.showModal();
      setErrorMessage('이름을 입력해주세요');
    }
    if (!emailRef.current.value) {
      alertRef.current.showModal();
      setErrorMessage('이메일을 입력해주세요');
    }
    if (!contentRef.current.value) {
      alertRef.current.showModal();
      setErrorMessage('내용을 입력해주세요');
    }

    onSaveButtonClick(
      subjectRef.current.value,
      nameRef.current.value,
      emailRef.current.value,
      contentRef.current.value,
    );
    subjectRef.current.value = '';
    nameRef.current.value = '';
    emailRef.current.value = '';
    contentRef.current.value = '';
  };

  const onViewChangeButtonClickHandler = (viewName) => {
    setViewMode(viewName);
    if (viewName === 'button') {
    }
  };

  return (
    <div className="article-writer">
      {viewMode === 'button' && (
        <button
          type="button"
          className="write-mode-button"
          onClick={onViewChangeButtonClickHandler.bind(this, 'form')}
          style={{
            width: '100%',
            padding: '1rem',
            marginTop: '1rem',
            backgroundColor: '#345571',
            fontSize: '1rem',
            color: '#fff',
          }}
        >
          글쓰기
        </button>
      )}
      {viewMode === 'form' && (
        <>
          <Alert dialogRef={alertRef}>
            <div>{errorMessage}</div>
          </Alert>
          <Input id="subject" title="제목" ref={subjectRef} />
          <Input id="name" title="이름" ref={nameRef} />
          <Input id="email" title="이메일" ref={emailRef} />
          <Textarea id="content" title="내용" ref={contentRef} />

          <button
            type="button"
            className="positive-button"
            onClick={onSaveButtonClickHandler.bind(
              this,
              subjectRef.current?.value,
              nameRef.current?.value,
              emailRef.current?.value,
              contentRef.current?.value,
            )}
          >
            저장
          </button>
          <button
            type="button"
            className="negative-button"
            onClick={onViewChangeButtonClickHandler.bind(this, 'button')}
          >
            취소
          </button>
        </>
      )}
    </div>
  );
};
export default ArticleWriter2;
