import { useState } from 'react';
import './App.css';
//test

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick} id={text}>
    {text}
  </button>
);

const StatisticLine = ({ text, value }) => (
  <tr>
    <th>{text}</th>
    <td>{value}</td>
  </tr>
);

const Statistics = ({ good, neutral, bad, total, average, positive }) => (
  <table>
    <caption>feedback</caption>
    <thead>
      <tr>
        <th>feedback</th>
        <th>count</th>
      </tr>
    </thead>
    <tbody>
      <StatisticLine text='good' value={good} />
      <StatisticLine text='neutral' value={neutral} />
      <StatisticLine text='bad' value={bad} />
      <StatisticLine text='total' value={total} />
      <StatisticLine text='average' value={average} />
      <StatisticLine text='positive' value={positive} />
    </tbody>
  </table>
);

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const total = good + neutral + bad;
  const average = (good - bad) / total;
  const positive = (good / total) * 100 + '%';

  return (
    <>
      <h1>give your feedback to the unicafe</h1>
      <Button handleClick={() => setGood(good + 1)} text='good' />
      <Button handleClick={() => setNeutral(neutral + 1)} text='neutral' />
      <Button handleClick={() => setBad(bad + 1)} text='bad' />
      <h1>statistics</h1>
      {total === 0 ? (
        <p>no feedback given yet</p>
      ) : (
        <Statistics
          good={good}
          neutral={neutral}
          bad={bad}
          total={total}
          average={average}
          positive={positive}
        />
      )}
    </>
  );
};

export default App;
