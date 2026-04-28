// ECMA function (fat arrow function)
// const: 상수를 정의하는 키워드
// (parameter) => {function body} : fat arrow function
// const abc = () => {};

import TodoHeader from './TodoHeader';
import TodoList from './TodoList';
import TodoAppender from './TodoAppender';
import { StateTest } from './StateTest';
import { useState } from 'react';
import TodoItem from './TodoItem';
import TodoGrid from './TodoGrid';

// function과 fat arrow function의 기능적 차이
// function => 함수를 호출한 대상을 this 객체로 알 수 있다
// fat arrow function => this 키워드 사용 불가
//     함수를 호출한 대상을 알 수 없다? event 파라미터로만 알 수 있음

// export default function TodoMain() {}; -->
// export default const TodoMain = () => {};
// export default 이후에 const 키워드가 나타날 수 없음.
const TodoMain = () => {
  // const ==> 상수 정의
  // let ==> 변수 정의
  // TODO JSON DATA
  const todoDatas = [
    {
      id: 'todo_1',
      todo: 'React Component Master1',
      dueDate: '2026-04-22',
      priority: 1,
      isDone: true,
    },
    {
      id: 'todo_2',
      todo: 'React Component Master2',
      dueDate: '2026-04-23',
      priority: 2,
      isDone: false,
    },
    {
      id: 'todo_3',
      todo: 'React Component Master3',
      dueDate: '2026-04-24',
      priority: 3,
      isDone: false,
    },
  ];

  const [cachedData, setCachedData] = useState(todoDatas);
  const [{ todo, dueDate, priority }, setNewTodoData] = useState({
    todo: '',
    dueDate: '',
    priority: 0,
  });

  const onAllDoneChangeHandler = (isDone) => {
    setCachedData((prevData) => {
      // cachedData를 반복하면서 모든 isDone의 값을 변경한다.
      const newData = prevData.map((todo) => ({ ...todo, isDone }));
      // 변경된 결과를 반환한다.
      return newData;
    });
  };

  // 특정 todo의 isDone 값을 반전시키는 함수
  // 이 함수를 TodoList에게 props로 전달
  // TodoList는 TodoItem에게 함수를 props로 전달
  const onDoneChangeHandler = (todoId, isDone) => {
    setCachedData((prevData) =>
      prevData.map((item) =>
        item.id === todoId ? { ...item, isDone: !item.isDone } : item,
      ),
    );

    console.log(todoId, todoDatas);
  };

  const onSaveButtonClickHandler = (todo, dueDate, priority) => {
    setCachedData((prevData) => [
      ...prevData,
      { id: prevData.length + 1, todo, dueDate, priority, isDone: false },
    ]);
    setNewTodoData({ todo: '', dueDate: '', priority: 0 });
  };

  // 컴포넌트가 만들어줄 HTML Tag set를 반환.
  return (
    <div className="wrapper">
      {/* <StateTest /> */}
      <header>React Todo</header>
      <TodoGrid>
        {/* <TodoHeader onAllDoneChange={onAllDoneChangeHandler} /> */}
        <TodoHeader onAllDoneChange={onAllDoneChangeHandler} />
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
