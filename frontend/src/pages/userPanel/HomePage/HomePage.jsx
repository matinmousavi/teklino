import styles from './HomePage.module.css'
import { products, bestsellers } from '../../../data/mockProducts.js'
import HeroSection from './components/HeroSection/HeroSection.jsx'
import FeaturesSection from './components/FeaturesSection/FeaturesSection.jsx'
import BrandsSlider from './components/BrandsSlider/BrandsSlider.jsx'
import ProductList from '../../../components/ProductList/ProductList.jsx'
import CallToActionSection from './components/CallToActionSection/CallToActionSection.jsx'

const HomePage = () => {
	return (
		<div className={styles['home-page']}>
			<HeroSection />
			<FeaturesSection />
			<BrandsSlider />
			<section className={styles['home-page__products']}>
				<h2 className={styles['home-page__title']}>جدیدترین محصولات</h2>
				<ProductList products={products} />
			</section>
			<CallToActionSection />
			<section className={styles['home-page__products']}>
				<h2 className={styles['home-page__title']}>پرفروش‌ترین‌ها</h2>
				<ProductList products={bestsellers} />
			</section>
		</div>
	)
}

export default HomePage
