import TodoItem, { TodoItemForChildren } from './TodoItem';

const TodoList = ({ todoDatas, onDoneChange }) => {
  const priorities = ['없음', '높음', '보통', '낮음']; // ECMAScript의 배열
  return (
    <>
      {todoDatas.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          priorities={priorities}
          onDoneChange={onDoneChange}
        />
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
