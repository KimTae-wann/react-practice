const PracTodoItem = ({ todo, priorities, onDoneChange }) => {
  const { id, todo: todoTask, dueDate, priority } = todo;

  const doneClass = todo.isDone ? 'done' : '';

  const onDoneChangeHandler = () => {
    onDoneChange(id);
  };

  return (
    <li className="tasks-item">
      <input
        id={id}
        type="checkbox"
        checked={todo.isDone}
        onChange={onDoneChangeHandler}
      />
      <label className={doneClass} htmlFor={id}>
        {todoTask}
      </label>
      <span className="due-date ${doneClass}">{dueDate}</span>
      <span className="priority ${doneClass}">{priorities[priority]}</span>
    </li>
  );
};

export default PracTodoItem;
