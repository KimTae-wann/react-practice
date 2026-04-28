import { useState } from 'react';

export const StateTest = () => {
  console.log('StateTest Component(함수) 실행 됨.');
  // 변경 가능한 상수를 생성 (state)
  const [value, setValue] = useState('Initiate Value');

  const onTaskKeyUpHandler = (event) => {
    console.log(event.target.value);
    setValue(event.target.value);
  };

  return <StateTestItem text={value} onTaskKeyUp={onTaskKeyUpHandler} />;
};

const StateTestItem = ({ text, onTaskKeyUp }) => {
  console.log('StateTestItem Component(함수) 실행 됨.');
  return (
    <div>
      {text}
      <div>
        <input type="text" onKeyUp={onTaskKeyUp} />
      </div>
    </div>
  );
};
