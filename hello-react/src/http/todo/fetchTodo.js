export const fetchTodoList = async () => {
  try {
    const todoResponse = await fetch('http://localhost:8888/api/v1/task');
    console.log(todoResponse);

    const todoList = await todoResponse.json(); // 비동기 함수
    console.log(todoList);

    return todoList;
  } catch (e) {
    return {
      status: 500,
      statusMessage: 'Internal Server Error',
      pages: 0,
      next: false,
      errors: '서비스가 잠시 중단되었습니다. 잠시 후 다시 시도해주세요.',
      count: 0,
      body: [],
    };
  }
};

export const fetchDoneTodo = async (todoId) => {
  try {
    const fetchResult = await fetch(
      `http://localhost:8888/api/v1/task/${todoId}`,
      { method: 'put' },
    );
    console.log(fetchResult);

    const doneResult = await fetchResult.json();
    console.log(doneResult);

    return doneResult;
  } catch (e) {
    return {
      status: 500,
      statusMessage: 'Internal Server Error',
      pages: 0,
      next: false,
      errors: '서비스가 잠시 중단되었습니다. 잠시 후 다시 시도해주세요.',
      count: 0,
      body: [],
    };
  }
};

export const fetchAllDoneTodo = async () => {
  try {
    const fetchList = await fetch('http://localhost:8888/api/v1/task', {
      method: 'put',
    });

    const allDoneResult = await fetchList.json();

    return allDoneResult;
  } catch (e) {
    return {
      status: 500,
      statusMessage: 'Internal Server Error',
      pages: 0,
      next: false,
      errors: '서비스가 잠시 중단되었습니다. 잠시 후 다시 시도해주세요.',
      count: 0,
      body: [],
    };
  }
};

export const fetchAddTodo = async ({ todo, dueDate, priority }) => {
  try {
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
  } catch (e) {
    return {
      status: 500,
      statusMessage: 'Internal Server Error',
      pages: 0,
      next: false,
      errors: '서비스가 잠시 중단되었습니다. 잠시 후 다시 시도해주세요.',
      count: 0,
      body: {},
    };
  }
};
