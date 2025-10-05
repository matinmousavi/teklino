import styles from './ProductCard.module.css';

const ProductCard = ({ product }) => {
  return (
    <div className={styles.card}>
      <div className={styles['card__image-container']}>
        <img src={product.image} alt={product.name} className={styles.card__image} />
      </div>
      <div className={styles.card__content}>
        <h3 className={styles.card__title}>{product.name}</h3>
        <p className={styles.card__price}>{product.price} تومان</p>
        <button className={styles.card__button}>افزودن به سبد خرید</button>
      </div>
    </div>
  );
};

export default ProductCard;