import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import Button from 'react-bootstrap/Button';
// import Badge from 'react-bootstrap/Badge';
import {
  getAssets,
} from '../redux/coins/coinsSlice';
import styles from '../styles/assets.module.css';

const Assets = () => {
  const dispatch = useDispatch();
  const { assets, isLoading, error } = useSelector((state) => state.assets);
  useEffect(() => {
    if (assets.length === 0) {
      dispatch(getAssets());
    }
  }, [dispatch, assets.length]);

  /* const handleReserveRocket = (id) => {
    dispatch(reserveRocket(id));
  };
  const handleCancelReserveRocket = (id) => {
    dispatch(cancelReserveRocket(id));
  }; */
  if (error) return <h2>Something went wrong</h2>;

  return isLoading ? (
    <h1>Loading...</h1>
  ) : (
    <>
      <hr />
      <div className={styles.assetsWrapper}>
        {assets.map((asset) => (
          <div key={asset.asset_id} className={styles.asset}>
            <img
              className={styles.image}
              src={asset.flickr_images[0]}
              alt=""
            />
            {/* <div className={styles.rocketInfo}>
              <h2>{asset.rocket_name}</h2>
              <p className={styles.rocketDescription}>
                {asset.reserved ? (
                  <span className={styles.reserved}>
                    <Badge bg="info">Reserved</Badge>
                  </span>
                ) : null}

                {asset.description}
              </p>
              {asset.reserved ? (
                <Button
                  variant="outline-secondary"
                  onClick={() => handleCancelReserveRocket(asset.rocket_id)}
                >
                  Cancel Reservation
                </Button>
              ) : (
                <Button
                  variant="primary"
                  onClick={() => handleReserveRocket(asset.rocket_id)}
                >
                  Reserve Rocket
                </Button>
              )}
            </div> */}
          </div>
        ))}
      </div>
    </>
  );
};
export default Assets;
