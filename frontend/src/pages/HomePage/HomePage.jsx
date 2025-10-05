import styles from './HomePage.module.css'
import { products } from '../../data/mockProducts.js'
import HeroSection from '../../components/HeroSection/HeroSection.jsx'
import FeaturesSection from '../../components/FeaturesSection/FeaturesSection.jsx'
import ProductList from '../../components/ProductList/ProductList.jsx'

const HomePage = () => {
	return (
		<div className={styles['home-page']}>
			<HeroSection />
			<FeaturesSection />
			<section className={styles['home-page__products']}>
				<h2 className={styles['home-page__title']}>جدیدترین محصولات</h2>
				<ProductList products={products} />
			</section>
		</div>
	)
}

export default HomePage
