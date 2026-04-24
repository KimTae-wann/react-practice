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

  const [targetData, setTargetData] = useState();
  const onTargetDataChange = (event) => {
    setTargetData(parseInt(event.target.value));
  };

  const [amountData, setAmountData] = useState();
  const onAmountDataChange = (event) => {
    setAmountData(parseInt(event.target.value));
  };

  const [calcData, setCalcData] = useState();
  const onCalcButtonClickHandler = (operator) => {
    if (operator === '+') {
      setCalcData(targetData + amountData);
    } else if (operator === '-') {
      setCalcData(targetData - amountData);
    } else if (operator === '*') {
      setCalcData(targetData * amountData);
    } else if (operator === '/') {
      setCalcData(targetData / amountData);
    }
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
