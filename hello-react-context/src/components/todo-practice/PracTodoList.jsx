import PracTodoItem from './PracTodoItem';

const PracTodoList = ({ todoDatas, onDoneChange }) => {
  const priorities = ['없음', '높음', '보통', '낮음'];
  return (
    <>
      {todoDatas.map((todo) => (
        <PracTodoItem
          key={todo.id}
          todo={todo}
          priorities={priorities}
          onDoneChange={onDoneChange}
        />
      ))}
    </>
  );
};

export default PracTodoList;
