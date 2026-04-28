// CommonJS
// const { createContext } = require('react');

import { createContext, useState } from 'react';

export const TodoContext = createContext({
  todos: [],
  done(todoId, doneStatus) {},
  allDone(doneStatus) {},
  addTodo(taskName, dueDate, priority) {},
  getTodo(todoId) {},
});

const TodoContextProvider = ({ children }) => {
  // children 은 provider 값을 공유받는 자식 컴포넌트 명시
  // TodoContext를 제공하는 컴포넌트

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

  const todoContextProps = {
    todos: cachedData,
    done(todoId, doneStatus) {
      setCachedData((prevData) => {
        const newStateMemory = prevData.map((todo) => {
          if (todo.id === todoId) {
            todo.isDone = doneStatus;
          }
          return todo;
        });
        return newStateMemory;
      });
    },
    allDone(doneStatus) {
      setCachedData((prevData) => {
        const newData = prevData.map((todo) => ({ ...todo, doneStatus }));
        return newData;
      });
    },
    addTodo(taskName, dueDate, priority) {
      setCachedData((prevData) => [
        ...prevData,
        {
          id: prevData.length + 1,
          todo: taskName,
          dueDate,
          priority,
          isDone: false,
        },
      ]);
    },
    getTodo(todoId) {
      const todo = cachedData.find((eachTodo) => eachTodo.id === todoId);
      return todo;
    },
  };

  // Context의 Provider 값을 공유받을 수 있는 컴포넌트는
  // Context.Provider의 자식 컴포넌트만 대상.
  return (
    <TodoContext.Provider value={todoContextProps}>
      {children}
    </TodoContext.Provider>
  );
};

export default TodoContextProvider;
