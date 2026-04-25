/** @format */

const TodoHeader = ({ onAllDoneChange }) => {
  const onAllDoneChangeHandler = () => {
    onAllDoneChange(event.target.checked);
  };

  return (
    <li className="tasks-header">
      <input id="checkall" type="checkbox" onChange={onAllDoneChangeHandler} />
      <label>Task</label>
      <span className="due-date">Due date</span>
      <span className="priority">Priority</span>
    </li>
  );
};

export default TodoHeader;
