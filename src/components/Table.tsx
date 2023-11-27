import React, { useContext, useMemo, useState } from "react";
import { CurrenciesContext } from "../context/Currency";

import * as icons from "../icons";

type PropsRow = {
  name: string;
  symbol: string;
  rank: number;
  price: number;
};

const Row = ({ name, symbol, rank, price }: PropsRow) => {
  return (
    <tr>
      <td>{name}</td>
      <td>{symbol}</td>
      <td>{rank}</td>
      <td>{price}</td>
    </tr>
  );
};

type PropsCell = {
  children: string;
  sortType: TableSorting;
  cb: (type: TableSorting) => void;
};

const Cell = ({ children, cb, sortType }: PropsCell) => {
  const handleClick = () => {
    cb(sortType);
  };

  return (
    <td>
      {children}
      <button onClick={handleClick}>{icons.DOWN_ARROWHEAD}</button>
    </td>
  );
};

enum TableSorting {
  Name,
  Symbol,
  Rank,
  Price,
  Default,
}

const Table = () => {
  const { visible } = useContext(CurrenciesContext);
  const [sortingType, setSortingType] = useState<TableSorting>(
    TableSorting.Default,
  );
  const sorted = useMemo(() => {
    switch (sortingType) {
      case TableSorting.Name:
        return [...visible].sort((a, b) => (a.name < b.name ? -1 : 1));
      case TableSorting.Symbol:
        return [...visible].sort((a, b) => (a.symbol < b.symbol ? -1 : 1));
      case TableSorting.Rank:
        return [...visible].sort((a, b) => a.rank - b.rank);
      case TableSorting.Price:
        return [...visible].sort(
          (a, b) => a.priceChange.price - b.priceChange.price,
        );
      default:
        return visible;
    }
  }, [visible, sortingType]);

  const rows = useMemo(() => {
    return sorted.map(({ name, symbol, rank, priceChange }) => {
      return (
        <Row
          name={name}
          symbol={symbol}
          rank={rank}
          price={priceChange.price}
          key={name}
        />
      );
    });
  }, [sorted]);

  return (
    <table className="table">
      <thead className="head">
        <tr>
          <Cell cb={setSortingType} sortType={TableSorting.Name}>
            Name
          </Cell>
          <Cell cb={setSortingType} sortType={TableSorting.Symbol}>
            Symbol
          </Cell>
          <Cell cb={setSortingType} sortType={TableSorting.Rank}>
            Rank
          </Cell>
          <Cell cb={setSortingType} sortType={TableSorting.Price}>
            Price
          </Cell>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
};

export default Table;
