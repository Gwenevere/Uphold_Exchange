import React, { useContext, useState, useRef, useEffect } from 'react';
import { ExchangeRateContext } from '../context/ExchangeRateContext';
import '../styles/CurrencySelector.css';

const CurrencySelector = () => {
  const { currencies, currency, setCurrency } = useContext(ExchangeRateContext);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleCurrencyChange = (code) => {
    setCurrency(code);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const getImageSrc = (currencyCode) => {
    try {
      return require(`../assets/${currencyCode}.png`);
    } catch (error) {
      return require(`../assets/Crypto.png`);
    }
  };
  
  return (
    <div className="currency-selector" ref={dropdownRef}>
      <div className="dropdown-selected" onClick={toggleDropdown}>
        <img src={getImageSrc(currency)} width="24" height="24" alt={currency} className="dropdown-icon" />
        {currency}
        <span className="dropdown-arrow">&#9662;</span>
      </div>
      {isOpen && (
        <div className="dropdown-options">
          {currencies.map((cur) => (
            <div
              key={cur.code}
              className="dropdown-option"
              onClick={() => handleCurrencyChange(cur.code)}
            >
              <img src={getImageSrc(cur.code)} width="24" height="24" alt={cur.code} className="dropdown-icon" />
              {cur.code}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CurrencySelector;
