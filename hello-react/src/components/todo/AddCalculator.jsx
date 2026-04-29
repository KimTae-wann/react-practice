import { useCallback, useState } from 'react';

const AddCalculator = () => {
  const [addResult, setAddResult] = useState(0);
  const [startNum, setStartNum] = useState(1);
  const [endNum, setEndNum] = useState(10);

  const add = useCallback(() => {
    let sum = 0;
    for (let i = parseInt(startNum); i <= parseInt(endNum); i++) {
      sum += i;
    }
    setAddResult(sum);
  }, [startNum, endNum]);

  return (
    <div>
      <input
        type="number"
        value={startNum}
        onChange={(event) => {
          setStartNum(event.target.value);
        }}
      />
      <input
        type="number"
        value={endNum}
        onChange={(event) => {
          setEndNum(event.target.value);
        }}
      />{' '}
      = <span>{addResult}</span>
      <div>
        <button type="button" onClick={add}>
          계산하기
        </button>
      </div>
    </div>
  );
};

export default AddCalculator;
