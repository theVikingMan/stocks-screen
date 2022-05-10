/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';

export default function PriceTable({ priceData }) {
  console.log(priceData);
  return (
    <div>
      {priceData && (
        <TableContainer>
          <table>
            <thead>
              <tr>
                <th>Open</th>
                <th>High</th>
                <th>Low</th>
                <th>Close</th>
                <th>Volume</th>
              </tr>
            </thead>
            <tbody>
              {priceData.map((dayData) => (
                <tr>
                  <td>{dayData.value["1. open"]}</td>
                  <td>{dayData.value["2. high"]}</td>
                  <td>{dayData.value["3. low"]}</td>
                  <td>{dayData.value["4. close"]}</td>
                  <td>{dayData.value["5. volume"]}</td>
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
  flex-direction: column;
  gap: 10px;
  padding: 1rem;
`;
