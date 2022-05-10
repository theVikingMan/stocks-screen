import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import {
  ResponsiveContainer,
  AreaChart,
  XAxis,
  YAxis,
  Area,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import { parseISO, format } from 'date-fns';
import moment from 'moment';

import Input from './Input.jsx';
import PriceTable from './PriceTable.jsx';

export default function App() {
  const [stockPriceData, setStockPriceData] = useState([]);
  const [quote, setQuote] = useState('TSLA');
  const [searchQuoteText, setSearchQuoteText] = useState('TSLA');
  let maxY = 0;

  let timeSeriesDataClose = [];
  let timeSeriesDataAll = [];
  if (stockPriceData.length !== 0) {
    Object.keys(stockPriceData[0]['Time Series (Daily)']).forEach((key) => {
      maxY = Math.max(maxY, stockPriceData[0]['Time Series (Daily)'][key]['4. close'] * 1.3);
      timeSeriesDataClose.push({ date: key, value: stockPriceData[0]['Time Series (Daily)'][key]['4. close'] });
      timeSeriesDataAll.push({ date: key, value: stockPriceData[0]['Time Series (Daily)'][key] });
    });
  }
  console.log(stockPriceData);
  console.log(timeSeriesDataClose);

  const getStockPriceData = () => {
    axios({
      method: 'GET',
      url: 'http://127.0.0.1:3001/stocks',
      params: {
        quote: searchQuoteText,
        functionType: 'TIME_SERIES_DAILY',
      },
    })
      .then(({ data }) => {
        // eslint-disable-next-line no-shadow
        setStockPriceData(() => ([data]));
      })
      .catch((err) => {
        console.log(err.response);
        console.log(err.status);
      });
  };

  useEffect(() => {
    getStockPriceData();
  }, []);

  const toDollarFormat = (number) => (`$${number.toFixed(2)}`);

  const toDateFormat = (str) => {
    const newDate = moment(str).format('MM-YYYY');
    return newDate;
  };

  return (
    <div>
      <GlobalPage>
        <TopStockBar>
          <span>
            <h3>{`Stock prices for ${quote}: `}</h3>
          </span>
          <Input
            setQuote={setQuote}
            setSearchQuoteText={setSearchQuoteText}
            searchQuoteText={searchQuoteText}
            setStockPriceData={setStockPriceData}
            stockPriceData={stockPriceData}
            getStockPriceData={getStockPriceData}
          />
        </TopStockBar>

        {timeSeriesDataClose && (
          <StockInfoContainer>
            <StockChart>
              <ResponsiveContainer width="100%" height={500}>
                <AreaChart
                  data={timeSeriesDataClose}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <defs>
                    <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#24251B7" stopOpacity={0.4} />
                      <stop offset="75%" stopColor="#24251B7" stopOpacity={0.05} />
                    </linearGradient>
                  </defs>
                  <Area dataKey="value" stroke="#2451B7" fill="url(#color)" />

                  <XAxis
                    dataKey="date"
                    tickLine={false}
                    tick={{ stroke: 'white' }}
                    tickFormatter={toDateFormat}
                  />
                  <YAxis
                    dataKey="value"
                    type="number"
                    domain={[0, maxY]}
                    tick={{ stroke: 'white' }}
                    tickCount={7}
                    tickFormatter={toDollarFormat}
                  />
                  <Tooltip />
                  <CartesianGrid
                    opacity={0.1}
                    vertical={false}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </StockChart>
          </StockInfoContainer>
        )}
        <PriceTable
          priceData={timeSeriesDataAll}
        />
      </GlobalPage>
    </div>
  );
}

const GlobalPage = styled.div`
  z-index: 2;
`;

const TopStockBar = styled.div`
  display: flex;
  flex-direction: column;
  color: white;
  padding-left: 3rem;
  padding-bottom: 2rem;
`;

const StockInfoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-left: 2rem;
  padding-right: 2rem;
`;

const StockChart = styled.div`
  width: 100%;
`;

// {timeSeriesData !== undefined ? Object.keys(timeSeriesData).map((key) => (
//   <ul key={key}>
//     {timeSeriesData[key]['4. close']}
//   </ul>
// )) : <div></div>}