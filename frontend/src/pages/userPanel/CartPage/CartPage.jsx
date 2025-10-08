import { useCart } from '../../../context/CartContext.jsx'
import CartItem from './components/CartItem/CartItem.jsx'
import styles from './CartPage.module.css'

const CartPage = () => {
	const { state } = useCart()

	const calculateTotalPrice = () => {
		return state.items
			.reduce((total, item) => {
				const price = parseInt(item.price.replace(/,/g, ''))
				return total + price * item.quantity
			}, 0)
			.toLocaleString()
	}

	return (
		<div className={styles['cart-page']}>
			<h1 className={styles['cart-page__title']}>سبد خرید شما</h1>
			{state.items.length === 0 ? (
				<p className={styles['cart-page__empty-message']}>
					سبد خرید شما خالی است.
				</p>
			) : (
				<div className={styles['cart-page__main']}>
					<div className={styles['cart-page__items']}>
						{state.items.map(item => (
							<CartItem key={item.id} item={item} />
						))}
					</div>
					<div className={styles['cart-page__summary']}>
						<h2 className={styles['summary__title']}>جمع کل</h2>
						<div className={styles['summary__row']}>
							<span>مبلغ کل:</span>
							<span>{calculateTotalPrice()} تومان</span>
						</div>
						<button className={styles['summary__checkout-btn']}>
							ادامه فرآیند خرید
						</button>
					</div>
				</div>
			)}
		</div>
	)
}

export default CartPage
