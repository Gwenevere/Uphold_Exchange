import React from 'react';
import './App.css';
import useCurrencies from './hooks/useCurrencies';

function App() {

  const currencies = useCurrencies();

  return (
    <div className="App">
    <header className="App-header">
      <h1>Currencies</h1>
      <ul> {Array.isArray(currencies) ? (
            currencies.map((currency) => (
              <li key={currency.code}>{currency.name}</li>
            ))
          ) : (
            <li>Loading currencies...</li>
          )}
      </ul>
    </header>
  </div>
  );
}

export default App;
