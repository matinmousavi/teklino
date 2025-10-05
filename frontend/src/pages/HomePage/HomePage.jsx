import styles from './HomePage.module.css';

const HomePage = () => {
  return (
    <div className={styles['home-page']}>
      <h1 className={styles['home-page__title']}>Welcome to Teklino!</h1>
      <p className={styles['home-page__subtitle']}>
        Our awesome e-commerce is under construction.
      </p>
    </div>
  );
};

export default HomePage;