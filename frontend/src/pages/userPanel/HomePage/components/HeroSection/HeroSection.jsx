import styles from './HeroSection.module.css';

const HeroSection = () => {
  return (
    <section className={styles.hero}>
      <div className={styles['hero__overlay']}></div>
      <div className={styles['hero__content']}>
        <h1 className={styles['hero__title']}>
          پنجره‌ای به سوی دنیای تکنولوژی
        </h1>
        <p className={styles['hero__subtitle']}>
          جدیدترین گجت‌ها و لوازم الکترونiki را در تکلینو پیدا کنید.
        </p>
        <button className={styles['hero__cta-button']}>
          مشاهده محصولات
        </button>
      </div>
    </section>
  );
};

export default HeroSection;