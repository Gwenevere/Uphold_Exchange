import React, { useContext } from 'react';
import { ExchangeRateContext } from '../context/ExchangeRateContext';

const InputField = () => {
 
    const { amount, setAmount } = useContext(ExchangeRateContext);
  
    return (
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
        placeholder="Enter amount"
      />
    );
};

export default React.memo(InputField);