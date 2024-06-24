import React from 'react';
import { ExchangeRateProvider } from './context/ExchangeRateContext';
import CurrencySelector from './components/CurrencySelector';
import ExchangeRatesDisplay from './components/ExchangeRatesDisplay';
import InputField from './components/InputField';
import './App.css';

const App = () => {
  return (
    <ExchangeRateProvider>
      <div className="App">
        <header className="App-header">
          <h1>Currency Exchange Rates</h1>
        </header>
        <main>
          <InputField />
          <CurrencySelector />
          <ExchangeRatesDisplay />
        </main>
      </div>
    </ExchangeRateProvider>
  );
};

export default App;
