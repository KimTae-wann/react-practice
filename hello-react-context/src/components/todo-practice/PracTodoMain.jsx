const PracTodoMain = () => {
  const priorities = ['없음', '높음', '보통', '낮음'];

  const todoDatas = [
    {
      id: 'todo_1',
      todo: 'React Component Master',
      dueDate: '2026-04-22',
      priority: 1,
    },
    {
      id: 'todo_2',
      todo: 'React Component Master',
      dueDate: '2026-04-23',
      priority: 2,
    },
    {
      id: 'todo_3',
      todo: 'React Component Master',
      dueDate: '2026-04-24',
      priority: 3,
    },
  ];

  const onSaveButtonClickHandler = () => {
    console.log('저장합니다');
  };

  return (
    <div className="wrapper">
      <header>React Todo</header>
      <ul className="tasks">
        <li className="tasks-header">
          <input id="checkall" type="checkbox" />
          <label>Task</label>
          <span className="due-date">Due Date</span>
          <span className="priority">Priority</span>
        </li>
        {todoDatas.map((todo) => (
          <li className="tasks-item">
            <input id={todo.id} type="checkbox" />
            <label htmlFor={todo.id}>{todo.todo}</label>
            <span className="due-date">{todo.dueDate}</span>
            <span className="priority">{todo.priority}</span>
          </li>
        ))}
      </ul>
      <footer>
        <input type="text" placeholder="Input new Task" />
        <select>
          <option>우선순위</option>
          <option value="1">높음</option>
          <option value="2">보통</option>
          <option value="3">낮음</option>
        </select>
        <button type="button" onClick={onSaveButtonClickHandler}>
          Save
        </button>
      </footer>
    </div>
  );
};

export default PracTodoMain;
