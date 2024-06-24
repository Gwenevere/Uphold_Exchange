import React, { useContext } from 'react';
import { ExchangeRateContext } from '../context/ExchangeRateContext';

const CurrencySelector = () => {
    const { currencies, currency, setCurrency } = useContext(ExchangeRateContext);

    return (
        <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
          {currencies.map((currency) => (
            <option key={currency.code} value={currency.code}>
              {currency.name}
            </option>
          ))}
        </select>
    );
};

export default React.memo(CurrencySelector);