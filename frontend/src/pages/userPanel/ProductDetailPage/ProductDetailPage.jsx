import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Spin, Button } from 'antd'
import useAPI from '../../../hooks/useAPI'
import useNotification from '../../../hooks/useNotification'
import { useCart } from '../../../context/CartContext'
import styles from './ProductDetailPage.module.css'

const ProductDetailPage = () => {
	const { productId } = useParams()
	const api = useAPI()
	const { state, dispatch } = useCart()
	const { openNotification } = useNotification()

	useEffect(() => {
		api.init(`/products/${productId}`)
	}, [productId])

	const handleAddToCart = product => {
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

	if (api.isLoading) {
		return (
			<Spin size='large' className={styles['product-detail__loader']} />
		)
	}

	if (api.error) {
		return (
			<div className={styles['product-detail__error']}>
				محصول مورد نظر یافت نشد!
			</div>
		)
	}

	const product = api.data

	return (
		product && (
			<div className={styles['product-detail']}>
				<div className={styles['product-detail__image-container']}>
					<img
						src={product.image}
						alt={product.name}
						className={styles['product-detail__image']}
					/>
				</div>
				<div className={styles['product-detail__info']}>
					<h1 className={styles['product-detail__title']}>
						{product.name}
					</h1>
					<p className={styles['product-detail__description']}>
						{product.description}
					</p>
					<div className={styles['product-detail__price-box']}>
						<span className={styles['product-detail__price']}>
							{product.price.toLocaleString()} تومان
						</span>
						<Button
							type='primary'
							size='large'
							onClick={() => handleAddToCart(product)}
							className={styles['product-detail__button']}
							disabled={product.countInStock === 0}
						>
							{product.countInStock > 0
								? 'افزودن به سبد خرید'
								: 'ناموجود'}
						</Button>
					</div>
				</div>
			</div>
		)
	)
}

export default ProductDetailPage
