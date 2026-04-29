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
  const fetchTodoList = async () => {
    const todoResponse = await fetch('http://localhost:8888/api/v1/task');
    console.log(todoResponse);

    const todoList = await todoResponse.json(); // 비동기 함수
    console.log(todoList);

    setCachedData(todoList.body);
  };
  useEffect(() => {
    // 의존배열에 변화가 생기지 않으면 호출X
    fetchTodoList();
  }, []);

  const todoCount = useMemo(() => {
    return {
      all: cachedData.length,
      done: cachedData.filter((todo) => todo.done).length,
      process: cachedData.filter((todo) => !todo.done).length,
    };
  }, [cachedData]);

  const onAllDoneChangeHandler = useCallback((done) => {
    setCachedData((prevData) => {
      // cachedData를 반복하면서 모든 isDone의 값을 변경한다.
      const newData = prevData.map((todo) => ({ ...todo, done }));
      // 변경된 결과를 반환한다.
      return newData;
    });
  }, []);

  const [{ todo, dueDate, priority }, setNewTodoData] = useState({
    todo: '',
    dueDate: '',
    priority: 0,
  });

  // 특정 todo의 isDone 값을 반전시키는 함수
  // 이 함수를 TodoList에게 props로 전달
  // TodoList는 TodoItem에게 함수를 props로 전달
  const onDoneChangeHandler = (todoId) => {
    setCachedData((prevData) =>
      prevData.map((item) =>
        item.id === todoId ? { ...item, done: !item.done } : item,
      ),
    );

    console.log(todoId, []);
  };

  // 리렌더링 되지 않게 변경
  const onSaveButtonClickHandler = useCallback((todo, dueDate, priority) => {
    // setCachedData((prevData) => [
    //   ...prevData,
    //   { id: prevData.length + 1, todo, dueDate, priority, isDone: false },
    // ]);
    // setNewTodoData({ todo: '', dueDate: '', priority: 0 });

    // fetch --> 서버에게 todo를 등록하게 한다.
    const fetchResult = async () => {
      const a = await fetch('http://localhost:8888/api/v1/task', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          task: todo,
          dueDate,
          priority,
          isDone: false,
        }),
      });
      const addResult = await a.json();
      console.log(addResult);
    };
    fetchResult();
  }, []);

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
