import React, { useContext } from 'react';
import { ExchangeRateContext } from '../context/ExchangeRateContext';

const ExchangeRatesDisplay = () => {
  const { exchangeRates, amount, loading, error, currency } = useContext(ExchangeRateContext);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!exchangeRates || !exchangeRates.length) return <p>No exchange rates available</p>;

  return (
    <div>
      <h2>Exchange Rates</h2>
      <ul>
        {exchangeRates.map(({ pair, rate }) => {
          const [from, to] = pair.split('-');
          if (from === currency) {
            return (
              <li key={pair}>
                {to}: {(rate * amount).toFixed(2)}
              </li>
            );
          }
          return null;
        })}
      </ul>
    </div>
  );
};

export default React.memo(ExchangeRatesDisplay);
