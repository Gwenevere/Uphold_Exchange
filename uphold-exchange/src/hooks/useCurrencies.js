import { useState, useEffect } from 'react';

const useCurrencies = () => {
  const [currencies, setCurrencies] = useState([]);

  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        const response = await fetch('http://localhost:5000/currencies');
        const data = await response.json();
        setCurrencies(data);
      } catch (error) {
        console.error('Error fetching currencies:', error);
        setCurrencies([]);
      }
    };

    fetchCurrencies();
  }, []);

  return currencies;
};

export default useCurrencies;
