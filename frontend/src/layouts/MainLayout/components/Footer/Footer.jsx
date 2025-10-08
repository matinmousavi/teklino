import styles from './Footer.module.css'

const Footer = () => {
	return (
		<footer className={styles.footer}>
			<div className={styles['footer__container']}>
				<div className={styles['footer__section']}>
					<h3 className={styles['footer__title']}>تکلینو</h3>
					<p className={styles['footer__text']}>
						فروشگاه تخصصی تکلینو، بهترین مقصد برای خرید جدیدترین گجت‌ها و لوازم الکترونیکی با بهترین قیمت و کیفیت.
					</p>
				</div>
				<div className={styles['footer__section']}>
					<h3 className={styles['footer__title']}>لینک‌های سریع</h3>
					<ul className={styles['footer__list']}>
						<li className={styles['footer__item']}>
							<a href='/about' className={styles['footer__link']}>
								درباره ما
							</a>
						</li>
						<li className={styles['footer__item']}>
							<a href='/contact' className={styles['footer__link']}>
								تماس با ما
							</a>
						</li>
						<li className={styles['footer__item']}>
							<a href='/faq' className={styles['footer__link']}>
								سوالات متداول
							</a>
						</li>
					</ul>
				</div>
				<div className={styles['footer__section']}>
					<h3 className={styles['footer__title']}>ارتباط با ما</h3>
					<ul className={styles['footer__list']}>
						<li className={styles['footer__item']}>
							<a href='https://github.com' target='_blank' rel='noopener noreferrer' className={styles['footer__link']}>
								گیت‌هاب
							</a>
						</li>
						<li className={styles['footer__item']}>
							<a href='https://linkedin.com' target='_blank' rel='noopener noreferrer' className={styles['footer__link']}>
								لینکدین
							</a>
						</li>
						<li className={styles['footer__item']}>
							<a href='https://twitter.com' target='_blank' rel='noopener noreferrer' className={styles['footer__link']}>
								توییتر
							</a>
						</li>
					</ul>
				</div>
			</div>
			<div className={styles['footer__bottom']}>
				<p className={styles['footer__copyright']}>طراحی و توسعه توسط متین موسوی</p>
				<p className={styles['footer__brand']}>© ۱۴۰۴ - فروشگاه تکلینو</p>
			</div>
		</footer>
	)
}

export default Footer
