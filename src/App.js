import React from 'react';
import Calendar from './components/Calendar';
import './App.css';

const now=new Date(2017,2,8);

function App() {
  return (
    <Calendar date={now} />
  );
}

export default App;
