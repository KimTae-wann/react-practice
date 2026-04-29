export const fetchTodoList = async () => {
  const todoResponse = await fetch('http://localhost:8888/api/v1/task');
  console.log(todoResponse);

  const todoList = await todoResponse.json(); // 비동기 함수
  console.log(todoList);

  return todoList;
};

export const fetchDoneTodo = async (todoId) => {
  const fetchResult = await fetch(
    `http://localhost:8888/api/v1/task/${todoId}`,
    { method: 'put' },
  );
  console.log(fetchResult);

  const doneResult = await fetchResult.json();
  console.log(doneResult);

  return doneResult;
};

export const fetchAllDoneTodo = async () => {
  const fetchList = await fetch('http://localhost:8888/api/v1/task', {
    method: 'put',
  });

  const allDoneResult = await fetchList.json();

  return allDoneResult;
};

export const fetchAddTodo = async ({ todo, dueDate, priority }) => {
  const fetchResult = await fetch('http://localhost:8888/api/v1/task', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      task: todo,
      dueDate,
      priority,
      isDone: false,
    }),
  });

  const addResult = await fetchResult.json();
  console.log(addResult);

  return addResult;
};
