import { useState } from 'react';

export const HM0423 = () => {
  const [counterData, setCounterData] = useState(0);

  const onCounterButtonClickHandler = (event) => {
    if (event.target.id === 'plus-button' && counterData < 100) {
      setCounterData((prevData) => {
        return prevData + 1;
      });
    } else if (event.target.id === 'minus-button' && counterData > 0) {
      setCounterData((prevData) => {
        return prevData - 1;
      });
    }
  };

  const [{ targetData, amountData, calcData }, setNums] = useState({
    targetData: 0,
    amountData: 0,
    calcData: 0,
  }); // cache 의 사용률을 줄일 수 있음

  // const [targetData, setTargetData] = useState();
  // const [amountData, setAmountData] = useState();
  // const [calcData, setCalcData] = useState();
  const onTargetDataChange = (event) => {
    // setNums((prevData) => {
    //   const temp = { ...prevData, targetData: event.target.value };
    //   return temp;
    // });
    let value = parseInt(event.target.value || 0);
    setNums((prevNums) => {
      const newNums = { ...prevNums, targetData: value };
      return newNums;
    });
  };
  // const onTargetDataChange = (event) => {
  //   setTargetData(parseInt(event.target.value));
  // };
  const onAmountDataChange = (event) => {
    let value = parseInt(event.target.value);
    if (isNaN(value)) {
      value = 0;
    }
    setNums((prevNums) => {
      const newNums = { ...prevNums, amountData: value };
      return newNums;
    });
  };

  // const onAmountDataChange = (event) => {
  //   setAmountData(parseInt(event.target.value));
  // };

  const onCalcButtonClickHandler = (operator) => {
    let calcData = 0;
    if (operator === '+') {
      calcData = targetData + amountData;
    } else if (operator === '-') {
      calcData = targetData - amountData;
    } else if (operator === '*') {
      calcData = targetData * amountData;
    } else if (operator === '/') {
      calcData = targetData / amountData;
    }
    setNums((prevNums) => {
      const newNums = { ...prevNums, calcData: calcData };
      // const newNums = { ...prevNums, calcData };
      return newNums;
    });
  };

  return (
    <>
      <div className="counter-wrapper">
        <button
          type="button"
          id="minus-button"
          onClick={onCounterButtonClickHandler}
        >
          -
        </button>
        <div id="number-result">{counterData}</div>
        <button
          type="button"
          id="plus-button"
          onClick={onCounterButtonClickHandler}
        >
          +
        </button>
      </div>
      <div className="calc-wrapper">
        <input
          id="number-target"
          value={targetData}
          onChange={onTargetDataChange}
        ></input>
        <div id="calc-button">
          <button
            type="button"
            id="calc-plus-button"
            onClick={onCalcButtonClickHandler.bind(this, '+')}
          >
            +
          </button>
          <button
            type="button"
            id="calc-minus-button"
            onClick={onCalcButtonClickHandler.bind(this, '-')}
          >
            -
          </button>
          <button
            type="button"
            id="calc-multiple-button"
            onClick={onCalcButtonClickHandler.bind(this, '*')}
          >
            x
          </button>
          <button
            type="button"
            id="calc-divide-button"
            onClick={onCalcButtonClickHandler.bind(this, '/')}
          >
            /
          </button>
        </div>
        <input
          id="number-amount"
          value={amountData}
          onChange={onAmountDataChange}
        ></input>
        <div id="equal-sign">=</div>
        <div id="number-result">{calcData}</div>
      </div>
    </>
  );
};
