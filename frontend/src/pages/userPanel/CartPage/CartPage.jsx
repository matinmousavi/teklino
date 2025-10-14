import { useNavigate } from 'react-router-dom'
import { useCart } from '../../../context/CartContext'
import CartItem from './components/CartItem/CartItem.jsx'
import styles from './CartPage.module.css'
import { Button } from 'antd'

const CartPage = () => {
	const { state } = useCart()
	const navigate = useNavigate()

	const calculateTotalPrice = () => {
		return state.items
			.reduce((total, item) => {
				const price = parseInt(String(item.price).replace(/,/g, ''))
				return total + price * item.quantity
			}, 0)
			.toLocaleString()
	}

	const handleCheckout = () => {
		navigate('/checkout')
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
						<Button
							type='primary'
							block
							size='large'
							className={styles['summary__checkout-btn']}
							onClick={handleCheckout}
							disabled={state.items.length === 0}
						>
							ادامه فرآیند خرید
						</Button>
					</div>
				</div>
			)}
		</div>
	)
}

export default CartPage
