import React, { useState } from 'react';

const Header = ({ headerText }) => <h1>{headerText}</h1>;

const Button = ({ text, onClick }) => <button onClick={onClick}>{text}</button>;

const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad;
  let averange = 0;
  let positive = 0;

  if (all > 0) {
    averange = good / all - bad / all;
    positive = good * 100 / all;
  }

  return (
    <div>
      <h2>Statistics</h2>
      <p>Good: {good}</p>
      <p>Neutral: {neutral}</p>
      <p>Bad: {bad}</p>
      <p>All: {all}</p>
      <p>Averange: {averange}</p>
      <p>Positive: {positive}%</p>
    </div>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGoodClick = () => {
    setGood(good + 1);
  };

  const handleNeutralClick = () => {
    setNeutral(neutral + 1);
  };

  const handleBadClick = () => {
    setBad(bad + 1);
  };

  return (
    <div>
      <Header headerText={'Give Feedback'} />
      <Button text={'good'} onClick={handleGoodClick} />
      <Button text={'neutral'} onClick={handleNeutralClick} />
      <Button text={'bad'} onClick={handleBadClick} />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
}

export default App;