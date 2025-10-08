import { useEffect } from 'react'
import useAPI from '../../hooks/useAPI'
import ProductList from '../../components/ProductList/ProductList.jsx'
import styles from './ProductsPage.module.css'

const ProductsPage = () => {
	const api = useAPI()

	useEffect(() => {
		api.init('/products')
	}, [])

	if (api.isLoading) {
		return (
			<div className={styles['products-page__loader']}>
				در حال بارگذاری...
			</div>
		)
	}

	if (api.error) {
		return (
			<div className={styles['products-page__error']}>خطایی رخ داد!</div>
		)
	}

	return (
		<div className={styles['products-page']}>
			<h1 className={styles['products-page__title']}>همه محصولات</h1>
			{api.data && <ProductList products={api.data} />}
		</div>
	)
}

export default ProductsPage
