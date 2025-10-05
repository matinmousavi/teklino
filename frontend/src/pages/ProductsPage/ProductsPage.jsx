import styles from './ProductsPage.module.css'
import { products, bestsellers } from '../../data/mockProducts.js'
import ProductList from '../../components/ProductList/ProductList.jsx'

const ProductsPage = () => {
	const allProducts = [...products, ...bestsellers]

	return (
		<div className={styles['products-page']}>
			<h1 className={styles['products-page__title']}>همه محصولات</h1>
			<ProductList products={allProducts} />
		</div>
	)
}

export default ProductsPage
