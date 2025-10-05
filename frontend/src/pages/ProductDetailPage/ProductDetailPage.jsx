import { useParams } from 'react-router-dom'
import { products, bestsellers } from '../../data/mockProducts'
import styles from './ProductDetailPage.module.css'

const ProductDetailPage = () => {
	const { productId } = useParams()
	const allProducts = [...products, ...bestsellers]
	const product = allProducts.find(p => p.id === parseInt(productId))

	if (!product) {
		return <div className={styles['product-not-found']}>محصول مورد نظر یافت نشد!</div>
	}

	return (
		<div className={styles['product-detail']}>
			<div className={styles['product-detail__image-container']}>
				<img src={product.image} alt={product.name} className={styles['product-detail__image']} />
			</div>
			<div className={styles['product-detail__info']}>
				<h1 className={styles['product-detail__title']}>{product.name}</h1>
				<p className={styles['product-detail__description']}>{product.description}</p>
				<div className={styles['product-detail__price-box']}>
					<span className={styles['product-detail__price']}>{product.price} تومان</span>
					<button className={styles['product-detail__button']}>افزودن به سبد خرید</button>
				</div>
			</div>
		</div>
	)
}

export default ProductDetailPage
