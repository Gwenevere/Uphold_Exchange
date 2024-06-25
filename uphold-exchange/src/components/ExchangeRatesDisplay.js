import React, { useContext } from 'react';
import { ExchangeRateContext } from '../context/ExchangeRateContext';
import '../styles/ExchangeRatesDisplay.css';
import Spinner from '../components/Spinner';

const ExchangeRatesDisplay = () => {
  const { exchangeRates, amount, exchangesLoading, exchangesError, currency } = useContext(ExchangeRateContext);

  const getImageSrc = (currencyCode) => {
    try {
      return require(`../assets/${currencyCode}.png`);
    } catch (error) {
      return require(`../assets/Crypto.png`);
    }
  };

  if (exchangesLoading) return <Spinner/>;
  if (exchangesError) return <p>{exchangesError}</p>;
  if (!exchangeRates || !exchangeRates.length || amount === 0) return <p>Enter an amount to check the rates.</p>;

  return (
    <div className="exchange-rates-display">
      <ul className="exchange-rates-list">
        {exchangeRates.map(({ pair, rate }) => {
          const [from, to] = pair.split('-');
          if (from === currency) {
            return (
              <li key={pair} className="exchange-rate-item">
                <span className="exchange-rate">{(rate * amount).toFixed(2)}</span>
                <div className="currency-container">
                  <img src={getImageSrc(to)} width="24" height="24" alt={to} className="currency-icon" />
                  <span className="currency-to">{to}</span>
                </div>
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
