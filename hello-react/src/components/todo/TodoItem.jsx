import { useContext, useRef } from 'react';
import { Confirm } from '../ui/TodoModals';
import TodoContext from './contexts/TodoContext.jsx';
import { fetchDoneTodo, fetchTodoList } from '../../http/todo/fetchTodo.js';
import { useDispatch } from 'react-redux';
import { todoAction } from '../../stores/toolkit/slices/todoSlice.js';

const TodoItem = ({ todo }) => {
  console.log('TodoItem');
  const priorities = ['없음', '높음', '보통', '낮음']; // ECMAScript의 배열

  const checkboxRef = useRef();
  const confirmRef = useRef();

  const { componentName } = useContext(TodoContext);

  // console.log('TodoItem :' + componentName);

  const reactReduxDispatcher = useDispatch();

  if (!componentName || componentName !== 'TodoList') {
    return <></>;
  }

  // props todo의 이름과 todo.todo의 이름이 같아 객체 구조 분해 불가.
  // todo.todo의 이름을 todoTask로 변경해 할당.
  const { id, task: todoTask, dueDate, priority } = todo;

  const doneClass = todo.done ? 'done' : '';

  const onDoneChangeHandler = async () => {
    reactReduxDispatcher(todoAction.doneItem(id));
    const doneResult = await fetchDoneTodo(todo.id);
    if (doneResult.errors) {
      alert(doneResult.errors);
    } else {
      const fetchResult = await fetchTodoList();
      reactReduxDispatcher(todoAction.refresh(fetchResult.body));
    }
  };

  const onDoneConfirmChangeHandler = () => {
    const checked = checkboxRef.current.checked;
    let message = `"${todoTask}"을 "${checkboxRef.current.checked ? '완료' : '미완료'}" 하시겠습니까?`;

    confirmRef.current.showConfirm(message);
  };

  const onConfirmOkClickHandler = () => {
    onDoneChangeHandler();
  };

  const onConfirmCloseClickHandler = () => {
    // checkboxRef.current.checked = todo.done;
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
        checked={todo.done}
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
