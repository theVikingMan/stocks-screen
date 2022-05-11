/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import styled from 'styled-components';
import moment from 'moment';

export default function PriceTable({ priceData, baseQuote }) {
  console.log(baseQuote)
  console.log(priceData)
  return (
    <div>
      {priceData && (
        <TableContainer>
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Open</th>
                <th>High</th>
                <th>Low</th>
                <th>Close</th>
                <th>Volume</th>
              </tr>
            </thead>
            <tbody>
              {priceData.map((dayData) => (
                <tr key={dayData.date}>
                  <td>{moment(dayData.date).format('MMM Do YYYY')}</td>
                  <td>{`$${parseInt(dayData[baseQuote]['1. open'], 10).toLocaleString('en-US')}`}</td>
                  <td>{`$${parseInt(dayData[baseQuote]['2. high'], 10).toLocaleString('en-US')}`}</td>
                  <td>{`$${parseInt(dayData[baseQuote]['3. low'], 10).toLocaleString('en-US')}`}</td>
                  <td>{`$${parseInt(dayData[baseQuote]['4. close'], 10).toLocaleString('en-US')}`}</td>
                  <td>{`$${parseInt(dayData[baseQuote]['5. volume'], 10).toLocaleString('en-US')}`}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </TableContainer>
      )}
    </div>
  );
}

const TableContainer = styled.div`
  display: flex;
  padding-top: 40px;
  padding-left: 115px;
  padding-bottom: 2rem;
`;

// const TableHeader = styled.div`
//   border: 1px solid #ffffff;
//   text-align: left;
//   padding: 8px;
//   font-size: 32px;
//   background-color: rgb(117, 201, 250);
// `;

// const TableData = styled.div`
//   border: 1px solid #ffffff;
//   text-align: left;
//   padding: 8px;
//   font-size: 32px;
//   background-color: rgb(205, 235, 253);
// `;
