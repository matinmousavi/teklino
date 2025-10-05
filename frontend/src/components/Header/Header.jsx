import styles from './Header.module.css'

const Header = () => {
	return (
		<header className={styles.header}>
			<div className={styles.header__logo}>
				<a href='/'>تکلینو</a>
			</div>
			<nav className={styles.header__nav}>
				<ul className={styles['header__nav-list']}>
					<li className={styles['header__nav-item']}>
						<a href='/' className={styles['header__nav-link']}>
							خانه
						</a>
					</li>
					<li className={styles['header__nav-item']}>
						<a href='/products' className={styles['header__nav-link']}>
							محصولات
						</a>
					</li>
					<li className={styles['header__nav-item']}>
						<a href='/cart' className={styles['header__nav-link']}>
							سبد خرید
						</a>
					</li>
					<li className={styles['header__nav-item']}>
						<a href='/login' className={styles['header__nav-link--button']}>
							ورود
						</a>
					</li>
				</ul>
			</nav>
		</header>
	)
}

export default Header
