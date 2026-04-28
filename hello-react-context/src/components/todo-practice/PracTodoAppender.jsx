const PracTodoAppender = ({
  inputData,
  onTaskKeyUp,
  onDateChange,
  onPrioritySelectChange,
  onSaveButtonClick,
}) => {
  return (
    <footer>
      <input
        type="text"
        placeholder="Input new Task"
        value={inputData.todo}
        onChange={onTaskKeyUp}
      />
      <input type="date" value={inputData.dueDate} onChange={onDateChange} />
      <select value={inputData.priority} onChange={onPrioritySelectChange}>
        <option value="0">우선순위</option>
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

export default PracTodoAppender;
