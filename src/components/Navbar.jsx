import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import Icon from '../Assets/back_icon.png';
import styles from '../styles/Navbar.module.css';

const link = { path: '/assets', text: 'Assets' };

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname.split('/').pop();
  const capitalizedPath = currentPath.charAt(0).toUpperCase() + currentPath.slice(1);

  const handleOnChange = (assetName) => {
    if (assetName === '') {
      navigate('/assets');
    } else {
      navigate(`/search/${assetName}`);
    }
  };

  return (
    <nav className={styles.wrapper}>
      <div className={styles.navbar}>
        <div className={styles.navHeader}>
          <div className={styles.arrowContainer}>
            <NavLink
              to={link.path}
              className={currentPath === 'assets' ? styles.hidden : styles.visible}
            >
              <img className={styles.logoIcon} src={Icon} alt="Icon" />
            </NavLink>
          </div>
          <div className={styles.hContainer}>
            <h1>CoinCap</h1>
            <h2>{capitalizedPath}</h2>
          </div>
          <div />
        </div>
        <div className={styles.inputContainer}>
          <input
            type="text"
            className={styles.input}
            placeholder="Search by Asset name..."
            onChange={(e) => handleOnChange(e.target.value)}
          />
        </div>
      </div>
      <div className={styles.separator} />
    </nav>
  );
};
export default Navbar;
