/** @format */

import { useContext, useRef } from 'react';
import { Confirm } from '../ui/TodoModals';
import TodoContext from './contexts/TodoContext.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllDoneTodo, fetchTodoList } from '../../http/todo/fetchTodo.js';

const TodoHeader = () => {
  console.log('TodoHeader');
  const checkboxRef = useRef();

  const confirmRef = useRef();

  const { componentName } = useContext(TodoContext);

  // react-redux store -> todo 가져오기
  const todoList = useSelector((store) => store.todo);
  const count = {
    all: todoList.length,
    done: todoList.filter((todo) => todo.done).length,
    process: todoList.filter((todo) => !todo.done).length,
  };

  console.log('TodoItem :' + componentName);

  const reactReduxDispatcher = useDispatch();

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

  const onConfirmOkClickHandler = async () => {
    // all done 에 대한 낙관적 업데이트 진행
    // 사용자가 all done을 요청했을 때, 요청 결과와 상관 없이 우선 all done이 된 것처럼 보여준다.
    // fetch 이후에 실패했을 경우, 원래 상태로 돌려준다.
    //              성공했을 경우, 변경된 상태 유지
    //               all done을 수행하는 중에 다른 사용자로 인해 데이터가 추가됐다면 불러올 필요.
    // store 에 있는 fetch를 바꾸고
    reactReduxDispatcher({ type: 'todo-all-done' });

    const allDoneResult = await fetchAllDoneTodo();

    if (allDoneResult.errors) {
      alert(allDoneResult.errors);
    }
    const fetchResult = await fetchTodoList();
    reactReduxDispatcher({ type: 'todo-refresh', payload: fetchResult.body });
  };
  const onConfirmCloseClickHandler = () => {
    checkboxRef.current.checked = !checkboxRef.current.checked;
  };

  return (
    <>
      <li className="tasks-counter">
        <div>전체: {count.all}</div>
        <div>진행중: {count.process}</div>
        <div>완료: {count.done}</div>
      </li>
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
