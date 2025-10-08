import { Link } from 'react-router-dom'
import { useCart } from '../../context/CartContext'
import useNotification from '../../hooks/useNotification'
import styles from './ProductCard.module.css'

const ProductCard = ({ product }) => {
	const { state, dispatch } = useCart()
	const { openNotification } = useNotification()

	const handleAddToCart = () => {
		const isItemInCart = state.items.find(item => item.id === product.id)

		if (isItemInCart) {
			openNotification(
				'info',
				'این محصول از قبل در سبد خرید شما وجود دارد.'
			)
		} else {
			dispatch({ type: 'ADD_TO_CART', payload: product })
			openNotification('success', 'محصول با موفقیت به سبد خرید اضافه شد!')
		}
	}

	return (
		<div className={styles.card}>
			<Link
				to={`/products/${product.id}`}
				className={styles['card__link']}
			>
				<div className={styles['card__image-container']}>
					<img
						src={product.image}
						alt={product.name}
						className={styles.card__image}
					/>
				</div>
				<div className={styles.card__content}>
					<h3 className={styles.card__title}>{product.name}</h3>
					<p className={styles.card__price}>{product.price} تومان</p>
				</div>
			</Link>
			<div className={styles['card__button-wrapper']}>
				<button
					onClick={handleAddToCart}
					className={styles.card__button}
				>
					افزودن به سبد خرید
				</button>
			</div>
		</div>
	)
}

export default ProductCard
