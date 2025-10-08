import { NavLink, Link } from 'react-router-dom'
import { Dropdown, Button } from 'antd'
import { DownOutlined, UserOutlined } from '@ant-design/icons'
import { useAuth } from '../../../../context/AuthContext'
import { useCart } from '../../../../context/CartContext'
import styles from './Header.module.css'

const Header = () => {
	const { isLogin, user, logout } = useAuth()
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

	const userMenuItems = [
		{
			key: '1',
			label: <Link to='/profile'>پروفایل من</Link>,
		},
		{
			key: '2',
			label: <a onClick={() => logout()}>خروج از حساب</a>,
		},
	]

	return (
		<header className={styles.header}>
			<div className={styles.header__logo}>
				<Link to='/'>تکلینو</Link>
			</div>
			<nav className={styles.header__nav}>
				<ul className={styles['header__nav-list']}>
					<li className={styles['header__nav-item']}>
						<NavLink to='/' className={getNavLinkClass} end>
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
						{isLogin ? (
							<Dropdown
								menu={{ items: userMenuItems }}
								placement='bottomRight'
							>
								<Button
									type='text'
									className={styles['user-menu-button']}
								>
									<UserOutlined />
									{user.name}
									<DownOutlined />
								</Button>
							</Dropdown>
						) : (
							<NavLink
								to='/login'
								className={styles['header__nav-link--button']}
							>
								ورود
							</NavLink>
						)}
					</li>
				</ul>
			</nav>
		</header>
	)
}

export default Header
