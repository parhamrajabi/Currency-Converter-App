import React, { useEffect, useState } from "react";
import "./CurrencyConvertor.css";

const URL =
  "https://openexchangerates.org/api/latest.json?app_id=2f68a2d1aaa5443880c75cbfe5771eb7";

export default function CurrencyConvertor() {
  const [CurrencyOptions, setCurrencyOptions] = useState([]);
  const [fromCurrency, setFromCurrency] = useState("");
  const [toCurrency, setToCurrency] = useState("");
  const [amount, setAmount] = useState(1);
  const [convertedAmount, setConvertedAmount] = useState(1);
  const [fetchData, setFetchData] = useState(null);

  useEffect(() => {
    async function getData() {
      fetch(URL)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          const options = [data.base, ...Object.keys(data.rates)];
          setCurrencyOptions(options);
          setFetchData(data);
          setFromCurrency(data.base);
          setToCurrency(options[1]);
        });
    }
    if (!CurrencyOptions || CurrencyOptions.length === 0) {
      getData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleAmountChange(e) {
    setAmount(e.target.value);
  }
  function handleFromCurrencyChange(e) {
    setFromCurrency(e.target.value);
  }

  function handleToCurrencyChange(e) {
    setToCurrency(e.target.value);
  }

  function convertedCurrency() {
    const rate = fetchData.rates[toCurrency] / fetchData.rates[fromCurrency];
    setConvertedAmount(amount * rate);
  }

  useEffect(() => {
    if (fromCurrency && toCurrency) {
      convertedCurrency();
    }
  });

  return (
    <div className="main">
      <h1>Currency Converter</h1>

      <input
        type="number"
        className="input"
        value={amount}
        onChange={handleAmountChange}
      />
      <select
        className="select"
        value={fromCurrency}
        onChange={handleFromCurrencyChange}
      >
        {CurrencyOptions.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>

      <div className="equal">IS EQUAL TO :</div>

      <input type="number" className="input" value={convertedAmount} />
      <select
        className="select"
        value={toCurrency}
        onChange={handleToCurrencyChange}
      >
        {CurrencyOptions.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
