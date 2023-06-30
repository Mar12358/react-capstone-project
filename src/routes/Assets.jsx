import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  getAssets,
} from '../redux/assets/assetsSlice';
import styles from '../styles/assets.module.css';

const Assets = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { filterData, isLoading, error } = useSelector((state) => state.assets);
  useEffect(() => {
    if (filterData.length === 0) {
      dispatch(getAssets());
    }
  }, [dispatch, filterData.length]);

  const handleAssetClick = (symbolId) => {
    navigate(`/assets/${symbolId}`);
  };

  if (error) return <h2>Something went wrong</h2>;
  let cont = 0;
  let aux = 0;
  let switching = false;
  return (isLoading || filterData.length === 0) ? (
    <h1>Loading...</h1>
  ) : (
    <>
      <div className={styles.assetsWrapper}>
        {filterData.map((asset) => {
          cont += 1;
          if (cont - aux === 3) { switching = !switching; aux = cont - 1; }
          let classSwitcher;
          if (switching) {
            classSwitcher = (cont % 2 === 0) ? styles.assetB : styles.assetA;
          } else {
            classSwitcher = (cont % 2 === 0) ? styles.assetA : styles.assetB;
          }
          return (

            <button
              key={asset.id}
              className={classSwitcher}
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
