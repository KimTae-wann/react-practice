import { useState } from 'react';
import trendData from './trend.json';
import TrendHeader from './TrendHeader';
import TrendList from './TrendList';
import TrendBox from './TrendBox';
import TrendItem from './TrendItem';

const TmdbMain = () => {
  const sectionName = trendData.sectionName;
  const [selectors, setMovie] = useState('today');

  const onButtonChangeHandler = (button) => {
    console.log('button', button.target.className);
    if (button.target.className === 'today') {
      setMovie('today');
    } else {
      setMovie('week');
    }
  };
  console.log(trendData.items[selectors]);

  return (
    // <TrendBox>
    //   <TrendHeader>
    //     <h1>{sectionName}</h1>
    //   </TrendHeader>
    //   <TrendList>
    //     <TrendItem />
    //   </TrendList>
    // </TrendBox>
    <TrendBox>
      <TrendHeader onButtonChange={onButtonChangeHandler}>
        <h1>{sectionName}</h1>
      </TrendHeader>
      <TrendList>
        <TrendItem items={trendData.items[selectors]} />
      </TrendList>
    </TrendBox>
  );
};

export default TmdbMain;
