/** @format */
import { useImperativeHandle, useRef, useState } from 'react';
import { Alert } from '../ui/Modals';
import { isString } from '../../utils/type';
import { getValidationResult } from '../../utils/errorHandler';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchAddArticle,
  fetchArticleList,
} from '../../http/article/fetchArticleList';
import { articleAction } from '../../stores/toolkit/slices/articleSlice';

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

const ArticleWriter2 = ({ errorHandleRef }) => {
  const dispatch = useDispatch();
  const tokenInfo = useSelector((state) => state.user.tokenInfo);
  const pagination = useSelector((state) => state.articles.pagination);

  const subjectRef = useRef();
  const contentRef = useRef();
  const attachFileRef = useRef();
  const alertRef = useRef();
  const [addError, setAddError] = useState();

  // 글쓰기 중 에러가 발생했을 때 처리
  useImperativeHandle(errorHandleRef, () => {
    return {
      setResponseError(fetchError) {
        if (isString(fetchError)) {
          setAddError(fetchError);
        } else {
          setAddError(getValidationResult(fetchError));
        }
      },
    };
  });

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

    // API 직접 호출
    const addResult = await fetchAddArticle(
      tokenInfo,
      subjectRef.current.value,
      contentRef.current.value,
      attachFileRef.current.value,
    );

    if (addResult.error) {
      // 에러 처리 리듀서 활용
      const errorMessage = isString(addResult.error)
        ? addResult.error
        : getValidationResult(addResult.error);
      setAddError(errorMessage);
    } else {
      // 저장 성공 시 리스트 새로고침
      const articleList = await fetchArticleList(pagination.pageNo || 0);
      dispatch(articleAction.refresh(articleList));

      subjectRef.current.value = '';
      contentRef.current.value = '';
      attachFileRef.current.value = '';
      setAddError(null);
    }
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
