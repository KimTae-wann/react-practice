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
  };

  const [cachedData, setCachedData] = useState(todoDatas);

  const onDoneChangeHandler = (todoId) => {
    setCachedData((prevData) => {
      const newStateMemory = [...prevData];

      for (const todo of newStateMemory) {
        if (todo.id === todoId) {
          todo.isDone = true;
          break;
        }
      }
      return newStateMemory;
    });
  };

  return (
    <div className="wrapper">
      <header>React Todo</header>
      <ul className="tasks">
        <PracTodoHeader />
        <PracTodoList
          todoDatas={cachedData}
          onDoneChange={onDoneChangeHandler}
        />
      </ul>
      <PracTodoAppender onSaveButtonClick={onSaveButtonClickHandler} />
    </div>
  );
};

export default PracTodoMain;
