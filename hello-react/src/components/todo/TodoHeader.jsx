/** @format */

import { useContext, useRef } from 'react';
import { Confirm } from '../ui/TodoModals';
import TodoContext from './contexts/TodoContext.jsx';

const TodoHeader = ({ onAllDoneChange }) => {
  const checkboxRef = useRef();

  const confirmRef = useRef();

  const { componentName } = useContext(TodoContext);

  console.log('TodoItem :' + componentName);

  if (!componentName || componentName !== 'TodoGrid') {
    return <></>;
  }

  const onAllDoneChangeHandler = () => {
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
    onAllDoneChange(checkboxRef.current.checked);
  };
  const onConfirmCloseClickHandler = () => {
    checkboxRef.current.checked = !checkboxRef.current.checked;
  };

  return (
    <>
      <li className="tasks-header">
        <Confirm
          dialogRef={confirmRef}
          onOkClick={onConfirmOkClickHandler}
          onCloseClick={onConfirmCloseClickHandler}
        />
        <input
          id="checkall"
          type="checkbox"
          onChange={onAllDoneChangeHandler}
          ref={checkboxRef}
        />
        <label>Task</label>
        <span className="due-date">Due date</span>
        <span className="priority">Priority</span>
      </li>
    </>
  );
};

export default TodoHeader;
