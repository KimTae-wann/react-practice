const TrendSelector = ({ onButtonChange }) => {
  return (
    <>
      <button type="button" className="today" onClick={onButtonChange}>
        오늘
      </button>
      <button type="button" className="week" onClick={onButtonChange}>
        이번주
      </button>
    </>
  );
};

export default TrendSelector;
