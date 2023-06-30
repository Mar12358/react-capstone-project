import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getSymbol } from '../redux/symbol/symbolSlice';
import styles from '../styles/symbol.module.css';

const Symbol = () => {
  const { id } = useParams();
  const { symbol, isLoading } = useSelector((state) => state.symbol);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSymbol(id));
  }, [dispatch, id]);

  let cont = 0;
  return (isLoading || symbol.length === 0) ? (
    <h2>Loading...</h2>
  ) : (
    <div className={styles.detailsWrapper}>
      {Object.keys(symbol.data).map((key) => {
        cont += 1;
        return (
          <div key={key} className={(cont % 2 === 0) ? styles.keyValuePairA : styles.keyValuePairB}>
            <div className={styles.key}><p>{key}</p></div>
            <div className={styles.value}><p>{symbol.data[key]}</p></div>
          </div>
        );
      })}
    </div>
  );
};

export default Symbol;
