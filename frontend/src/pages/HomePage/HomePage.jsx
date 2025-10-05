import styles from './HomePage.module.css';
import { products } from '../../data/mockProducts.js';
import ProductList from '../../components/ProductList/ProductList.jsx';

const HomePage = () => {
  return (
    <div className={styles['home-page']}>
      <h1 className={styles['home-page__title']}>جدیدترین محصولات</h1>
      <ProductList products={products} />
    </div>
  );
};

export default HomePage;