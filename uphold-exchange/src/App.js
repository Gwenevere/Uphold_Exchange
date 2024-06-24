import React from 'react';
import { ExchangeRateProvider } from './context/ExchangeRateContext';
import CurrencyConverter from './components/CurrencyConverter';
import ExchangeRatesDisplay from './components/ExchangeRatesDisplay';
import './App.css';

const App = () => {
  return (
    <ExchangeRateProvider>
      <div className="app">
        <div className="app-container">
          <header className="app-header">
            <h1 className="app-title">Currency Converter</h1>
            <p className="app-description">Receive competitive and transparent pricing with no hidden spreads. See how we compare.</p>
          </header>
          <main className="app-main">
            <CurrencyConverter/>
            <ExchangeRatesDisplay />
          </main>
        </div>
      </div>
    </ExchangeRateProvider>
  );
};

export default App;
