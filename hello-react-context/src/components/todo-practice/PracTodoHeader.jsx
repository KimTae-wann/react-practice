const PracTodoHeader = () => {
  return (
    <li className="tasks-header">
      <input id="checkall" type="checkbox" />
      <label>Task</label>
      <span className="due-date">Due Date</span>
      <span className="priority">Priority</span>
    </li>
  );
};

export default PracTodoHeader;
