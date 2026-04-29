// ECMA function (fat arrow function)
// const: 상수를 정의하는 키워드
// (parameter) => {function body} : fat arrow function
// const abc = () => {};

import TodoHeader from './TodoHeader';
import TodoList from './TodoList';
import TodoAppender from './TodoAppender';
import { StateTest } from './StateTest';
import { useCallback, useEffect, useMemo, useState } from 'react';
import TodoItem from './TodoItem';
import TodoGrid from './TodoGrid';
import AddCalculator from './AddCalculator';
import {
  fetchAddTodo,
  fetchAllDoneTodo,
  fetchDoneTodo,
  fetchTodoList,
} from '../../http/todo/fetchTodo';

// function과 fat arrow function의 기능적 차이
// function => 함수를 호출한 대상을 this 객체로 알 수 있다
// fat arrow function => this 키워드 사용 불가
//     함수를 호출한 대상을 알 수 없다? event 파라미터로만 알 수 있음

// export default function TodoMain() {}; -->
// export default const TodoMain = () => {};
// export default 이후에 const 키워드가 나타날 수 없음.
const TodoMain = () => {
  console.log('TodoMain');
  // const ==> 상수 정의
  // let ==> 변수 정의
  // TODO JSON DATA

  const [cachedData, setCachedData] = useState([]);

  // Eternal Loop
  const refreshTodoList = async () => {
    const todoList = await fetchTodoList();

    setCachedData(todoList.body);

    if (todoList.errors) {
      alert(todoList.errors);
    }
  };
  useEffect(() => {
    // 의존배열에 변화가 생기지 않으면 호출X
    refreshTodoList();
  }, []);

  const todoCount = useMemo(() => {
    return {
      all: cachedData.length,
      done: cachedData.filter((todo) => todo.done).length,
      process: cachedData.filter((todo) => !todo.done).length,
    };
  }, [cachedData]);

  const onAllDoneChangeHandler = useCallback(async () => {
    const allDoneResult = await fetchAllDoneTodo();
    if (!allDoneResult.errors) {
      refreshTodoList();
    } else {
      alert(allDoneResult.errors);
    }
    // setCachedData((prevData) => {
    //   // cachedData를 반복하면서 모든 isDone의 값을 변경한다.
    //   const newData = prevData.map((todo) => ({ ...todo, done }));
    //   // 변경된 결과를 반환한다.
    //   return newData;
    // });
  }, []);

  // 특정 todo의 isDone 값을 반전시키는 함수
  // 이 함수를 TodoList에게 props로 전달
  // TodoList는 TodoItem에게 함수를 props로 전달
  const onDoneChangeHandler = async (todoId) => {
    const doneResult = await fetchDoneTodo();
    if (!doneResult.errors) {
      refreshTodoList();
    } else {
      alert(doneResult.errors);
    }

    // setCachedData((prevData) =>
    //   prevData.map((item) =>
    //     item.id === todoId ? { ...item, done: !item.done } : item,
    //   ),
    // );

    // console.log(todoId, []);
  };

  // 리렌더링 되지 않게 변경
  const onSaveButtonClickHandler = useCallback(
    // setCachedData((prevData) => [
    //   ...prevData,
    //   { id: prevData.length + 1, todo, dueDate, priority, isDone: false },
    // ]);
    // setNewTodoData({ todo: '', dueDate: '', priority: 0 });

    // fetch --> 서버에게 todo를 등록하게 한다.
    async (todo, dueDate, priority) => {
      console.log('저장합니다');
      const addResult = fetchAddTodo(todo, dueDate, priority);
      if (!addResult.errors) {
        refreshTodoList();
      } else {
        alert(addResult.errors);
      }
    },
    [],
  );

  // 컴포넌트가 만들어줄 HTML Tag set를 반환.
  return (
    <div className="wrapper">
      {/* <StateTest /> */}
      {/* <AddCalculator /> */}
      <header>React Todo</header>
      <TodoGrid>
        {/* <TodoHeader onAllDoneChange={onAllDoneChangeHandler} /> */}
        <TodoHeader
          count={todoCount}
          onAllDoneChange={onAllDoneChangeHandler}
        />
        <TodoList>
          {cachedData.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onDoneChange={onDoneChangeHandler}
            />
          ))}
        </TodoList>
      </TodoGrid>
      <TodoAppender onSaveButtonClick={onSaveButtonClickHandler} />
    </div>
  );
};

export default TodoMain;
