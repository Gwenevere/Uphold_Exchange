import React, { useContext } from 'react';
import { ExchangeRateContext } from '../context/ExchangeRateContext';
import CurrencySelector from './CurrencySelector';
import '../styles/CurrencyConverter.css';

const CurrencyConverter = () => {
  const { amount, setAmount } = useContext(ExchangeRateContext);

  return (
    <div className="currency-converter">
        <input
            type="number"
            value={amount > 0 ? amount : ''}
            onChange={(e) => setAmount(Number(e.target.value))}
            placeholder="0.00"
            className="amount-input"
        />
        <CurrencySelector/>
    </div>
  );
};

export default React.memo(CurrencyConverter);
