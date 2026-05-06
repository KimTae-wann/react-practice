/** @format */
import { useRef, useState } from 'react';
import { Alert } from '../ui/Modals';
import { isString } from '../../utils/type';
import { useDispatch, useSelector } from 'react-redux';
import { articleThunks } from '../../stores/toolkit/slices/articleSlice';

const Input = ({ id, title, type = 'text', value, ref, ...props }) => {
  return (
    <div className="input-field">
      <label htmlFor={id}>{title}</label>
      <input type={type} id={id} value={value} ref={ref} {...props} />
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

const ArticleWriter2 = () => {
  const dispatch = useDispatch();

  const subjectRef = useRef();
  const contentRef = useRef();
  const attachFileRef = useRef();
  const alertRef = useRef();

  const {
    error: { write: addError },
  } = useSelector((store) => store.articles);

  const [viewMode, setViewMode] = useState('button');

  // 저장을 클릭하면 입력했던 값을 가져와 출력한다.
  const onSaveButtonClickHandler = async () => {
    console.log(alertRef);

    if (!subjectRef.current.value) {
      alertRef.current.showModal('제목을 입력해주세요.');
      return;
    }

    if (!contentRef.current.value) {
      alertRef.current.showModal('내용을 입력해주세요.');
      return;
    }

    dispatch(
      articleThunks.write(
        subjectRef.current.value,
        contentRef.current.value,
        attachFileRef.current.files,
      ),
    );
    subjectRef.current.value = '';
    contentRef.current.value = '';
    attachFileRef.current.files = '';
  };

  const onViewChangeButtonClickHandler = (viewName) => {
    setViewMode(viewName);
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
          <Alert dialogRef={alertRef} />
          {isString(addError) && <div>{addError}</div>}
          <Input id="subject" title="제목" ref={subjectRef} />
          <Textarea id="content" title="내용" ref={contentRef} />
          <Input
            type="file"
            id="file"
            title="첨부파일"
            ref={attachFileRef}
            multiple
          />

          <button
            type="button"
            className="positive-button"
            onClick={onSaveButtonClickHandler}
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
