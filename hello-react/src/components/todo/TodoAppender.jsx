import { useRef } from 'react';

const TodoAppender = ({ onSaveButtonClick }) => {
  const todoRef = useRef();
  const dateRef = useRef();
  const priorityRef = useRef();

  const onSaveButtonClickHandler = () => {
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
