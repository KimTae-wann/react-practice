import TrendSelector from './TrendSelector';

const TrendHeader = ({ children, onButtonChange }) => {
  // const onSelectorButtonHandler = () => {};

  return (
    <>
      {children}
      <TrendSelector onButtonChange={onButtonChange} />
    </>
  );
};

export default TrendHeader;
