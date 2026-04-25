const TodoAppender = ({
  inputData = { todo, dueDate, priority },
  onTaskKeyUp,
  onDateChange,
  onPrioritySelectChange,
  onSaveButtonClick,
}) => {
  return (
    <footer>
      <input
        type="text"
        value={inputData.todo}
        placeholder="Input new Task"
        onChange={onTaskKeyUp} // 너무 길어지면 가독성이 떨어지므로 분리해서 적어준다.
      />
      <input type="date" value={inputData.dueDate} onChange={onDateChange} />
      <select value={inputData.priority} onChange={onPrioritySelectChange}>
        <option>우선순위</option>
        <option value="1">높음</option>
        <option value="2">보통</option>
        <option value="3">낮음</option>
      </select>
      <button type="button" onClick={onSaveButtonClick}>
        Save
      </button>
    </footer>
  );
};

export default TodoAppender;
