const PracTodoAppender = ({ onSaveButtonClick }) => {
  return (
    <footer>
      <input type="text" placeholder="Input new Task" />
      <select>
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

export default PracTodoAppender;
