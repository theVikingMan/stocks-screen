import React from 'react';

export default function Input({
  setSearchQuoteText,
  searchQuoteText,
  getStockPriceData,
  addStocks,
  setBaseQuote,
}) {
  return (
    <div>
      <form onSubmit={(e) => {
        e.preventDefault();
      }}
      >
        <label>
          <b>{'Get Stock Chart: '}</b>
          <input
            type="text"
            value={searchQuoteText}
            onChange={(e) => {
              setSearchQuoteText(e.target.value);
            }}
            placeholder="Enter stock quote or ticker:"
          />
        </label>
        <button
          type="submit"
          onClick={() => {
            console.log('fire')
            // setBaseQuote(searchQuoteText);
            getStockPriceData(searchQuoteText);
          }}
        >
          Search
        </button>
        <button
          type="submit"
          onClick={() => {
            addStocks();
          }}
        >
          Add Stock
        </button>
      </form>
      <br />
    </div>
  );
}
