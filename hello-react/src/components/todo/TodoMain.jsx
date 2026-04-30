// ECMA function (fat arrow function)
// const: 상수를 정의하는 키워드
// (parameter) => {function body} : fat arrow function
// const abc = () => {};

import TodoHeader from './TodoHeader';
import TodoList from './TodoList';
import TodoAppender from './TodoAppender';
import { StateTest } from './StateTest';
import { useCallback, useEffect } from 'react';
import TodoItem from './TodoItem';
import TodoGrid from './TodoGrid';
import AddCalculator from './AddCalculator';
import {
  fetchAddTodo,
  fetchDoneTodo,
  fetchTodoList,
} from '../../http/todo/fetchTodo';
import { useDispatch, useSelector } from 'react-redux';

// function과 fat arrow function의 기능적 차이
// function => 함수를 호출한 대상을 this 객체로 알 수 있다
// fat arrow function => this 키워드 사용 불가
//     함수를 호출한 대상을 알 수 없다? event 파라미터로만 알 수 있음

// export default function TodoMain() {}; -->
// export default const TodoMain = () => {};
// export default 이후에 const 키워드가 나타날 수 없음.
const TodoMain = () => {
  console.log('TodoMain');
  // const ==> 상수 정의
  // let ==> 변수 정의
  // TODO JSON DATA

  // const [cachedData, setCachedData] = useState([]);

  // ReactRedux Store에서 todo state를 가져옴
  const todoList = useSelector((store) => store.todo);
  const storeDispatcher = useDispatch(); // store의 state를 변경

  // Eternal Loop
  const refreshTodoList = async () => {
    const fetchResult = await fetchTodoList();

    // setCachedData(todoList.body);

    // Reducer(reactReduxReducer) 호출
    storeDispatcher({ type: 'todo-refresh', payload: fetchResult.body });

    if (todoList.errors) {
      alert(todoList.errors);
    }
  };
  useEffect(() => {
    // 의존배열에 변화가 생기지 않으면 호출X
    refreshTodoList();
  }, []);

  // 컴포넌트가 만들어줄 HTML Tag set를 반환.
  return (
    <div className="wrapper">
      {/* <StateTest /> */}
      {/* <AddCalculator /> */}
      <header>React Todo</header>
      <TodoGrid>
        {/* <TodoHeader onAllDoneChange={onAllDoneChangeHandler} /> */}
        <TodoHeader />
        <TodoList>
          {todoList.map((todo) => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
        </TodoList>
      </TodoGrid>
      <TodoAppender />
    </div>
  );
};

export default TodoMain;
