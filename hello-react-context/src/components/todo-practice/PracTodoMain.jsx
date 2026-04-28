import { useState } from 'react';
import PracTodoHeader from './PracTodoHeader';
import PracTodoList from './PracTodoList';
import PracTodoAppender from './PracTodoAppender';

const PracTodoMain = () => {
  const todoDatas = [
    {
      id: 'todo_1',
      todo: 'React Component Master',
      dueDate: '2026-04-22',
      priority: 1,
      isDone: true,
    },
    {
      id: 'todo_2',
      todo: 'React Component Master',
      dueDate: '2026-04-23',
      priority: 2,
      isDone: false,
    },
    {
      id: 'todo_3',
      todo: 'React Component Master',
      dueDate: '2026-04-24',
      priority: 3,
      isDone: false,
    },
  ];

  const onSaveButtonClickHandler = () => {
    console.log('저장합니다');
    setCachedData((prevData) => [
      ...prevData,
      { id: prevData.length + 1, todo, dueDate, priority, isDone: false },
    ]);
    setNewTodoDate({ todo: '', dueDate: '', priority: 0 });
  };

  const [cachedData, setCachedData] = useState(todoDatas);
  const [{ todo, dueDate, priority }, setNewTodoDate] = useState({
    todo: '',
    duedate: '',
    priority: 0,
  });

  const onAllDoneChangeHandler = (isDone) => {
    setCachedData((prevData) => {
      return prevData.map((todo) => ({ ...todo, isDone }));
    });
  };

  const onDoneChangeHandler = (todoId) => {
    setCachedData((prevData) =>
      prevData.map((item) =>
        item.id === todoId ? { ...item, isDone: !item.isDone } : item,
      ),
    );
  };
  const onTaskKeyUpHandler = (event) => {
    setNewTodoDate((prevData) => ({ ...prevData, todo: event.target.value }));
  };
  const onDateChangeHandler = (event) => {
    setNewTodoDate((prevData) => ({
      ...prevData,
      dueDate: event.target.value,
    }));
  };
  const onPriorityChangeHandler = (event) => {
    setNewTodoDate((prevData) => ({
      ...prevData,
      priority: parseInt(event.target.value),
    }));
  };

  return (
    <div className="wrapper">
      <header>React Todo</header>
      <ul className="tasks">
        <PracTodoHeader onAllDoneChange={onAllDoneChangeHandler} />
        <PracTodoList
          todoDatas={cachedData}
          onDoneChange={onDoneChangeHandler}
        />
      </ul>
      <PracTodoAppender
        inputData={{ todo, dueDate, priority }}
        onTaskKeyUp={onTaskKeyUpHandler}
        onDateChange={onDateChangeHandler}
        onPrioritySelectChange={onPriorityChangeHandler}
        onSaveButtonClick={onSaveButtonClickHandler}
      />
    </div>
  );
};

export default PracTodoMain;
