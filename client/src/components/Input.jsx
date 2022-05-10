import React from 'react';

export default function Input({
  setQuote,
  setSearchQuoteText,
  searchQuoteText,
  getStockPriceData
}) {
  return (
    <div>
      <form onSubmit={(e) => {
        e.preventDefault();
        setQuote(searchQuoteText);
        getStockPriceData();
      }}
      >
        <label>
          <b>{`Get Stock Chart: `}</b>
          <input
            type="text"
            value={searchQuoteText}
            onChange={(e) => { setSearchQuoteText(e.target.value); }}
            placeholder="Enter stock quote or ticker:"
          />
        </label>
        <button type="submit" onClick={() => {}}>Submit</button>
      </form>
      <br />
    </div>
  );
}
