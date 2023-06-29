import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getSymbol } from '../redux/symbol/symbolSlice';
import styles from '../styles/symbol.module.css';

const DetailPage = () => {
  const dispatch = useDispatch();
  const { symbolId } = useParams();
  const { symbol, isLoading, error } = useSelector((state) => state.symbol);
  useEffect(() => {
    // Fetch symbol data using the symbolId
    // Update the symbolData state with the fetched data
    // Example:
    // const fetchData = async () => {
    //   const response = await fetch(`/api/symbols/${symbolId}`);
    //   const data = await response.json();
    //   setSymbolData(data);
    // };
    // fetchData();
    dispatch(getSymbol(symbolId));
  }, [dispatch, symbolId]);

  if (error) return <h2>Something went wrong</h2>;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Symbol Detail</h2>
      {/* Display the symbol detail using the symbolData */}
      {/* Example: */}
      {/* <div>Symbol Name: {symbolData.name}</div> */}
      {/* <div>Symbol Price: {symbolData.price}</div> */}
    </div>
  );
};

export default DetailPage;
