import { useCart } from '../../context/CartContext'
import styles from './CartItem.module.css'

const CartItem = ({ item }) => {
	const { dispatch } = useCart()

	const handleRemove = () => {
		dispatch({ type: 'REMOVE_FROM_CART', payload: { id: item.id } })
	}

	const handleQuantityChange = newQuantity => {
		dispatch({
			type: 'UPDATE_QUANTITY',
			payload: { id: item.id, quantity: newQuantity },
		})
	}

	return (
		<div className={styles['cart-item']}>
			<img
				src={item.image}
				alt={item.name}
				className={styles['cart-item__image']}
			/>
			<div className={styles['cart-item__details']}>
				<h3 className={styles['cart-item__title']}>{item.name}</h3>
				<p className={styles['cart-item__price']}>{item.price} تومان</p>
			</div>
			<div className={styles['cart-item__quantity']}>
				<button onClick={() => handleQuantityChange(item.quantity - 1)}>
					-
				</button>
				<span>{item.quantity}</span>
				<button onClick={() => handleQuantityChange(item.quantity + 1)}>
					+
				</button>
			</div>
			<button
				onClick={handleRemove}
				className={styles['cart-item__remove-btn']}
			>
				حذف
			</button>
		</div>
	)
}

export default CartItem
