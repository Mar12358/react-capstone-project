import { NavLink } from 'react-router-dom';
import Icon from '../Assets/back_icon.png';
import styles from '../styles/Navbar.module.css';

const link = { path: '/assets', text: 'Assets' };

const Navbar = () => (
  <nav className={styles.wrapper}>
    <div className={styles.navbar}>
      <div className={styles.navlogo}>
        <NavLink
          to={link.path}
          className={({ isActive }) => (isActive ? styles.active : styles.none)}
        >
          <img className={styles.logoIcon} src={Icon} alt="Icon" />
        </NavLink>
        <h1>CoinCap App</h1>
      </div>
      <div>
        <input type="text" />
        <button type="button">Search</button>
      </div>
    </div>
    <div className={styles.separator} />
  </nav>
);
export default Navbar;
