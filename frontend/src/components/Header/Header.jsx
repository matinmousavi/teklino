import { NavLink } from 'react-router-dom'
import { useCart } from '../../context/CartContext'
import styles from './Header.module.css'

const Header = () => {
	const { state } = useCart()
	const getNavLinkClass = ({ isActive }) => {
		return isActive
			? `${styles['header__nav-link']} ${styles.active}`
			: styles['header__nav-link']
	}

	const cartItemCount = state.items.reduce(
		(count, item) => count + item.quantity,
		0
	)

	return (
		<header className={styles.header}>
			<div className={styles.header__logo}>
				<NavLink to='/'>تکلینو</NavLink>
			</div>
			<nav className={styles.header__nav}>
				<ul className={styles['header__nav-list']}>
					<li className={styles['header__nav-item']}>
						<NavLink to='/' className={getNavLinkClass}>
							خانه
						</NavLink>
					</li>
					<li className={styles['header__nav-item']}>
						<NavLink to='/products' className={getNavLinkClass}>
							محصولات
						</NavLink>
					</li>
					<li className={styles['header__nav-item']}>
						<NavLink
							to='/cart'
							className={styles['header__nav-link']}
						>
							سبد خرید
							{cartItemCount > 0 && (
								<span className={styles['cart-badge']}>
									{cartItemCount}
								</span>
							)}
						</NavLink>
					</li>
					<li className={styles['header__nav-item']}>
						<NavLink
							to='/login'
							className={styles['header__nav-link--button']}
						>
							ورود
						</NavLink>
					</li>
				</ul>
			</nav>
		</header>
	)
}

export default Header
