import styles from './Header.module.css';

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.header__logo}>
        <a href="/">Teklino</a>
      </div>
      <nav className={styles.header__nav}>
        <ul className={styles['header__nav-list']}>
          <li className={styles['header__nav-item']}>
            <a href="/" className={styles['header__nav-link']}>Home</a>
          </li>
          <li className={styles['header__nav-item']}>
            <a href="/products" className={styles['header__nav-link']}>Products</a>
          </li>
          <li className={styles['header__nav-item']}>
            <a href="/cart" className={styles['header__nav-link']}>Cart</a>
          </li>
          <li className={styles['header__nav-item']}>
            <a href="/login" className={styles['header__nav-link--button']}>Login</a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;