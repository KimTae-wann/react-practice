const PracTodoHeader = ({ onAllDoneChange }) => {
  const onAllDoneChangeHandler = (event) => {
    onAllDoneChange(event.target.checked);
  };

  return (
    <li className="tasks-header">
      <input id="checkall" type="checkbox" onChange={onAllDoneChangeHandler} />
      <label>Task</label>
      <span className="due-date">Due Date</span>
      <span className="priority">Priority</span>
    </li>
  );
};

export default PracTodoHeader;
