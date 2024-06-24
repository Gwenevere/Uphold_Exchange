import React, { useContext } from 'react';
import { ExchangeRateContext } from '../context/exchangeRateContext';

const InputField = () => {
    const { amount, setAmount } = useContext(ExchangeRateContext);

    return (
        <input
            type='number'
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
        />
    );
};

export default React.memo(InputField);