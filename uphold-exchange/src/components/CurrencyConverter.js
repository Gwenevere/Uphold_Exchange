import React, { useContext, useState } from 'react';
import { ExchangeRateContext } from '../context/ExchangeRateContext';
import { useDebouncedCallback } from 'use-debounce';
import CurrencySelector from './CurrencySelector';
import '../styles/CurrencyConverter.css';

const CurrencyConverter = () => {
  const { amount, setAmount } = useContext(ExchangeRateContext);

  const [inputValue, setInputValue] = useState('');

  const handleAmountChange = useDebouncedCallback((value) => {
    setAmount(Number(value));
  }, 500);

  const handleChange = (e) => {
    setInputValue(e.target.value);
    handleAmountChange(e.target.value);
  };

  return (
    <div className="currency-converter">
        <input
            type="number"
            value={inputValue}
            onChange={handleChange}
            placeholder="0.00"
            className="amount-input"
        />
        <CurrencySelector/>
    </div>
  );
};

export default React.memo(CurrencyConverter);
