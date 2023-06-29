import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import Button from 'react-bootstrap/Button';
// import Badge from 'react-bootstrap/Badge';
import { useHistory } from 'react-router-dom';
import {
  getAssets,
} from '../redux/assets/assetsSlice';
import styles from '../styles/assets.module.css';

const Assets = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { assets, isLoading, error } = useSelector((state) => state.assets);
  console.log('assets', assets.data);
  useEffect(() => {
    if (assets.length === 0) {
      dispatch(getAssets());
    }
  }, [dispatch, assets.length]);

  const handleAssetClick = (symbolId) => {
    history.push(`/assets/${symbolId}`);
  };

  /* const handleCancelReserveRocket = (id) => {
    dispatch(cancelReserveRocket(id));
  }; */
  if (error) return <h2>Something went wrong</h2>;
  let cont = 0;
  let aux = 0;
  let switching = false;
  return (isLoading || assets.length === 0) ? (
    <h1>Loading...</h1>
  ) : (
    <>
      <hr />
      <div className={styles.assetsWrapper}>
        {assets.data.map((asset) => {
          cont += 1;
          if (cont - aux === 3) { switching = !switching; aux = cont - 1; }
          return switching ? (
            <button
              key={asset.id}
              className={(cont % 2 === 0) ? styles.assetB : styles.assetA}
              type="button"
              onClick={() => handleAssetClick(asset.id)}
            >
              <div className={styles.symbol}>{asset.symbol}</div>
              <div className={styles.smallInfo}>
                <p className={styles.name}>{asset.name}</p>
                <p className={styles.priceUsd}>
                  U$D:
                  {' '}
                  {parseFloat(asset.priceUsd).toFixed(4)}
                </p>
              </div>
            </button>
          ) : (
            <button
              key={asset.id}
              className={(cont % 2 === 0) ? styles.assetA : styles.assetB}
              type="button"
              onClick={() => handleAssetClick(asset.id)}
            >
              <div className={styles.symbol}>{asset.symbol}</div>
              <div className={styles.smallInfo}>
                <p className={styles.name}>{asset.name}</p>
                <p className={styles.priceUsd}>
                  U$D:
                  {' '}
                  {parseFloat(asset.priceUsd).toFixed(4)}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </>
  );
};
export default Assets;
