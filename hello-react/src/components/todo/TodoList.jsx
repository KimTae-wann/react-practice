import { Component, useContext } from 'react';
import { Confirm } from '../ui/TodoModals';
import TodoItem, { TodoItemForChildren } from './TodoItem';
import TodoContext from './contexts/TodoContext';

const TodoList = ({ children }) => {
  const { componentName } = useContext(TodoContext);

  if (!componentName || componentName !== 'TodoGrid') {
    return <></>;
  }

  const providerProps = {
    componentName: 'TodoList',
  };

  return (
    <TodoContext.Provider value={providerProps}>
      {children}
      {/* // <TodoItemForChildren key={todo.id}>
        //   <input id={todo.id} type="checkbox" />
        //   <label htmlFor={todo.id}>{todo.todo}</label>
        //   <span className="due-date">{todo.dueDate}</span>
        //   <span className="priority">{priorities[todo.priority]}</span>
        // </TodoItemForChildren> */}
    </TodoContext.Provider>
  );
};

export default TodoList;
