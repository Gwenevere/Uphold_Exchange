import React, { useContext } from 'react';
import './App.css';
import { ExchangeRateContext, ExchangeRateProvider } from './context/exchangeRateContext';
import InputField from './components/InputField';

function App() {

  return (
    <ExchangeRateProvider>
      <div className="App">
        <header className="App-header">
          <h1>InputField Test</h1>
          <InputField />
        </header>
      </div>
    </ExchangeRateProvider>
  );
};

export default App;
