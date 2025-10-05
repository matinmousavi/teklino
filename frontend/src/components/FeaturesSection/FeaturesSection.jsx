import styles from './FeaturesSection.module.css'

const FeaturesSection = () => {
	return (
		<section className={styles.features}>
			<div className={styles['features__container']}>
				<div className={styles['features__item']}>
					<div className={styles['features__icon']}>
						{/* Icon Placeholder */}
						🚚
					</div>
					<h3 className={styles['features__title']}>ارسال سریع</h3>
					<p className={styles['features__text']}>سفارشات شما در سریع‌ترین زمان ممکن به دستتان خواهد رسید.</p>
				</div>
				<div className={styles['features__item']}>
					<div className={styles['features__icon']}>
						{/* Icon Placeholder */}
						🛡️
					</div>
					<h3 className={styles['features__title']}>ضمانت اصالت</h3>
					<p className={styles['features__text']}>تمامی کالاهای ما اورجینال بوده و با ضمانت اصالت عرضه می‌شوند.</p>
				</div>
				<div className={styles['features__item']}>
					<div className={styles['features__icon']}>
						{/* Icon Placeholder */}
						💬
					</div>
					<h3 className={styles['features__title']}>پشتیبانی ۲۴/۷</h3>
					<p className={styles['features__text']}>تیم پشتیبانی ما همواره آماده پاسخگویی به سوالات شماست.</p>
				</div>
			</div>
		</section>
	)
}

export default FeaturesSection
