import { useContext } from 'react';
import { Confirm } from '../ui/TodoModals.jsx';
import TodoItem, { TodoItemForChildren } from './TodoItem';
import { TodoContext } from './contexts/TaskContext.jsx';

const TodoList = () => {
  const priorities = ['없음', '높음', '보통', '낮음']; // ECMAScript의 배열

  const { todos } = useContext(TodoContext);

  return (
    <>
      {todos.map(({ id }) => (
        <TodoItem key={id} id={id} priorities={priorities} />
        // <TodoItemForChildren key={todo.id}>
        //   <input id={todo.id} type="checkbox" />
        //   <label htmlFor={todo.id}>{todo.todo}</label>
        //   <span className="due-date">{todo.dueDate}</span>
        //   <span className="priority">{priorities[todo.priority]}</span>
        // </TodoItemForChildren>
      ))}
    </>
  );
};

export default TodoList;
