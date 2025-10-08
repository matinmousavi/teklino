import styles from './CallToActionSection.module.css'

const CallToActionSection = () => {
	return (
		<section className={styles.cta}>
			<div className={styles['cta__container']}>
				<div className={styles['cta__content']}>
					<h2 className={styles['cta__title']}>تخفیف‌های شگفت‌انگیز هفتگی</h2>
					<p className={styles['cta__text']}>هر هفته منتظر پیشنهادات ویژه ما برای محصولات منتخب باشید. بهترین فرصت برای خرید هوشمندانه!</p>
					<button className={styles['cta__button']}>مشاهده تخفیف‌ها</button>
				</div>
			</div>
		</section>
	)
}

export default CallToActionSection
