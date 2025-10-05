import ProductCard from '../ProductCard/ProductCard.jsx';
import styles from './ProductList.module.css';

const ProductList = ({ products }) => {
  return (
    <div className={styles['product-list']}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;