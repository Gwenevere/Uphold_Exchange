import React, { useState } from 'react';
import './App.css';
import useCurrencies from './hooks/useCurrencies';
import useExchangeRates from './hooks/useExchangeRates';
import { useDebounce } from 'use-debounce';

function App() {

  const currencies = useCurrencies();
  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  const [debouncedCurrency] = useDebounce(selectedCurrency, 300); 
  const { exchangeRates, loading, error } = useExchangeRates(debouncedCurrency);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Currencies</h1>
        <ul>
          {Array.isArray(currencies) && currencies.map(currency => (
            <li
              key={currency.code}
              onClick={() => setSelectedCurrency(currency.code)}
              style={{ cursor: 'pointer', color: selectedCurrency === currency.code ? 'blue' : 'black' }}
            >
              {currency.name}
            </li>
          ))}
        </ul>

        <h1>Exchange Rates for {debouncedCurrency}</h1>
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {!loading && !error && Array.isArray(exchangeRates) && (
          <ul>
            {exchangeRates.map(rate => (
              <li key={rate.pair}>{rate.pair}: {rate.ask}</li>
            ))}
          </ul>
        )}
      </header>
    </div>
  );
}

export default App;
