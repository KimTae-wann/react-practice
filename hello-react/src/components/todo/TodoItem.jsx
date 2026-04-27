import { useRef } from 'react';
import { Confirm } from '../ui/TodoModals';

const TodoItem = ({ todo, priorities, onDoneChange }) => {
  //        props todo의 이름과 todo.todo의 이름이 같아 객체 구조 분해 불가.
  //        todo.todo의 이름을 todoTask로 변경해 할당.
  const { id, todo: todoTask, dueDate, priority } = todo;

  const doneClass = todo.isDone ? 'done' : '';

  const onDoneChangeHandler = () => {
    onDoneChange(id);
  };

  const checkboxRef = useRef();
  const confirmRef = useRef();

  const onDoneConfirmChangeHandler = () => {
    const checked = checkboxRef.current.checked;
    let message = '';
    if (checked) {
      message = "모든 Item들을 '완료' 하시겠습니까?";
    } else {
      message = "모든 Item들을 '미완료' 하시겠습니까?";
    }

    confirmRef.current.showConfirm(message);
  };

  const onConfirmOkClickHandler = () => {
    onDoneChangeHandler();
    onDoneChange(checkboxRef.current.checked);
  };

  const onConfirmCloseClickHandler = () => {
    checkboxRef.current.checked = todo.isDone;
  };

  return (
    <li className="tasks-item">
      {/* 체크박스의 상태가 변경되면 todo의 데이터를 바꿔준다
        props는 읽기전용 데이터라 바꿀 수 없다.
        그래서 TodoMain에서 주는 todoDatas 를 바꿔야 한다.
      */}
      <Confirm
        dialogRef={confirmRef}
        onOkClick={onConfirmOkClickHandler}
        onCloseClick={onConfirmCloseClickHandler}
      />
      <input
        id={id}
        type="checkbox"
        checked={todo.isDone}
        onChange={onDoneConfirmChangeHandler}
        ref={checkboxRef}
      />
      <label className={doneClass} htmlFor={id}>
        {todoTask}
      </label>
      <span className={`due-date ${doneClass}`}>{dueDate}</span>
      <span className={`priority ${doneClass}`}>{priorities[priority]}</span>
    </li>
  );
};

export default TodoItem;

export const TodoItemForChildren = ({ children }) => {
  return <li className="tasks-item">{children}</li>;
};
