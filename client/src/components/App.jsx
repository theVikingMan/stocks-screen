/* eslint-disable import/extensions */
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
import moment from 'moment';

import Input from './Input.jsx';
import PriceTable from './PriceTable.jsx';

export default function App() {
  const [stockPriceData, setStockPriceData] = useState([]);
  const [baseQuote, setBaseQuote] = useState('TSLA');
  const [quotes, setQuote] = useState(new Set([]));
  const [searchQuoteText, setSearchQuoteText] = useState('TSLA');
  const [timeSeriesDataCloseCurrent, setTimeSeriesDataCloseCurrent] = useState([]);
  const [timeSeriesDataAllCurrent, setTimeSeriesDataAllCurrent] = useState([]);
  const [maxY, setMaxY] = useState(0);

  console.log(timeSeriesDataCloseCurrent)
  console.log(quotes);

  const copyTimeSeriesDataCloseCurrent = [];
  const copyTimeSeriesDataAllCurrent = [];

  const getStockPriceData = (quote = baseQuote) => {
    axios({
      method: 'GET',
      url: 'http://127.0.0.1:3001/stocks',
      params: {
        quote,
        functionType: 'TIME_SERIES_DAILY',
      },
    })
      .then(({ data }) => {
        setBaseQuote(searchQuoteText);
        setStockPriceData([data]);
      })
      .catch((err) => {
        console.log(err.response);
        console.log(err.status);
      });
  };

  const addStocks = () => {
    setQuote(quotes => new Set([...quotes, searchQuoteText]));
    axios({
      method: 'GET',
      url: 'http://127.0.0.1:3001/stocks',
      params: {
        quote: searchQuoteText,
        functionType: 'TIME_SERIES_DAILY',
      },
    })
      .then(({ data }) => {
        console.log(data)
        let i = 0;
        // eslint-disable-next-line no-shadow
        const copyTimeSeriesDataCloseCurrent = [...timeSeriesDataCloseCurrent];
        Object.keys(data['Time Series (Daily)']).forEach((key) => {
          setMaxY(Math.max(maxY, data['Time Series (Daily)'][key]['4. close'] * 1.2));
          copyTimeSeriesDataCloseCurrent[i][searchQuoteText] = data['Time Series (Daily)'][key]['4. close'];
          i += 1;
        });
        console.log(copyTimeSeriesDataCloseCurrent);
        setTimeSeriesDataCloseCurrent(copyTimeSeriesDataCloseCurrent);
      })
      .catch((err) => {
        console.log(err.response);
        console.log(err.status);
      });
  };

  useEffect(() => {
    getStockPriceData();
  }, []);

  useEffect(() => {
    setQuote(new Set([searchQuoteText]));
    let baseMaxY = 0;
    if (stockPriceData.length !== 0) {
      Object.keys(stockPriceData[0]['Time Series (Daily)']).forEach((key) => {
        setMaxY(Math.max(baseMaxY, stockPriceData[0]['Time Series (Daily)'][key]['4. close'] * 1.4));
        copyTimeSeriesDataCloseCurrent.push({ date: key, [baseQuote]: stockPriceData[0]['Time Series (Daily)'][key]['4. close'] });
        copyTimeSeriesDataAllCurrent.push({ date: key, [baseQuote]: stockPriceData[0]['Time Series (Daily)'][key] });
      });
      setTimeSeriesDataCloseCurrent(copyTimeSeriesDataCloseCurrent);
      setTimeSeriesDataAllCurrent(copyTimeSeriesDataAllCurrent);
      console.log(quotes);
    }
  }, [stockPriceData]);

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
            <h3>{`Stock prices for ${baseQuote}: `}</h3>
          </span>
          <Input
            setQuote={setQuote}
            setSearchQuoteText={setSearchQuoteText}
            searchQuoteText={searchQuoteText}
            setStockPriceData={setStockPriceData}
            stockPriceData={stockPriceData}
            getStockPriceData={getStockPriceData}
            addStocks={addStocks}
            setBaseQuote={setBaseQuote}
          />
        </TopStockBar>

        {timeSeriesDataCloseCurrent && (
          <StockInfoContainer>
            <StockChart>
              <ResponsiveContainer width="100%" height={500}>
                <AreaChart
                  data={timeSeriesDataCloseCurrent}
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
                  <XAxis
                    dataKey="date"
                    tickLine={false}
                    tickFormatter={toDateFormat}
                    style={{ fill: 'rgb(199, 202, 224)' }}
                  />
                  <YAxis
                    domain={[0, maxY]}
                    type="number"
                    tickCount={7}
                    tickFormatter={toDollarFormat}
                    style={{ fill: 'rgb(199, 202, 224)' }}
                  />
                  <Area dataKey={baseQuote} stroke="#2451B7" fill="url(#color)" />
                  {timeSeriesDataAllCurrent.length > 0 && (
                    Array.from(quotes).map((q) => (
                      <Area dataKey={q} stroke="#2451B7" fill="url(#color)" />
                    )))}
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
        {(timeSeriesDataAllCurrent.length > 0 && timeSeriesDataAllCurrent[0][baseQuote] !== undefined) && (
          <PriceTable
            priceData={timeSeriesDataAllCurrent}
            baseQuote={baseQuote}
          />
        )}
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
