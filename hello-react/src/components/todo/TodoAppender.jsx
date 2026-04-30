import { memo, useRef, useState } from 'react';
import { Alert } from '../ui/TodoModals';
import { fetchAddTodo, fetchTodoList } from '../../http/todo/fetchTodo';
import { useDispatch } from 'react-redux';

const TodoAppender = memo(({ onSaveButtonClick }) => {
  console.log('TodoAppender');

  const [isFetching, setIsFetching] = useState(false);

  const todoRef = useRef();
  const dateRef = useRef();
  const priorityRef = useRef();

  const todoAlertRef = useRef();

  const reactReduxDispatcher = useDispatch();

  const onSaveButtonClickHandler = async () => {
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
    reactReduxDispatcher({
      type: 'todo-add',
      payload: {
        task: todoRef.current.value,
        dueDate: dateRef.current.value,
        priority: priorityRef.current.value,
      },
    });
    setIsFetching(true);
    const addResult = await fetchAddTodo(
      todoRef.current.value,
      dateRef.current.value,
      priorityRef.current.value,
    );

    if (addResult.errors) {
      alert(addResult.errors);
    }
    setIsFetching(false);

    const fetchResult = await fetchTodoList();
    reactReduxDispatcher({ type: 'todo-refresh', payload: fetchResult.body });

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
      <button
        type="button"
        disable={isFetching}
        onClick={onSaveButtonClickHandler}
      >
        {isFetching ? '저장중...' : '저장'}
      </button>
    </footer>
  );
});

export default TodoAppender;
