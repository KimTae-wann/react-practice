import { useRef } from 'react';
import { Alert } from '../ui/TodoModals';

const TodoAppender = ({ onSaveButtonClick }) => {
  const todoRef = useRef();
  const dateRef = useRef();
  const priorityRef = useRef();

  const todoAlertRef = useRef();

  const onSaveButtonClickHandler = () => {
    if (!todoRef.current.value) {
      todoAlertRef.current.showModal('할일을 입력해주세요');
      return;
    }
    if (!dateRef.current.value) {
      todoAlertRef.current.showModal('날짜를 입력해주세요');
      return;
    }
    if (!priorityRef.current.value) {
      todoAlertRef.current.showModal('우선순위를 입력해주세요');
      return;
    }

    onSaveButtonClick(
      todoRef.current.value,
      dateRef.current.value,
      priorityRef.current.value,
    );
    todoRef.current.value = '';
    dateRef.current.value = '';
    priorityRef.current.value = '';
  };

  return (
    <footer>
      <Alert dialogRef={todoAlertRef} />
      <input type="text" placeholder="Input new Task" ref={todoRef} />
      <input type="date" ref={dateRef} />
      <select ref={priorityRef}>
        <option value="">우선순위</option>
        <option value="1">높음</option>
        <option value="2">보통</option>
        <option value="3">낮음</option>
      </select>
      <button type="button" onClick={onSaveButtonClickHandler}>
        Save
      </button>
    </footer>
  );
};

export default TodoAppender;
