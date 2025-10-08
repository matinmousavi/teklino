import { Routes, Route } from 'react-router-dom'
import Header from './components/Header/Header.jsx'
import Footer from './components/Footer/Footer.jsx'
import HomePage from './pages/HomePage/HomePage.jsx'
import ProductsPage from './pages/ProductsPage/ProductsPage.jsx'
import ProductDetailPage from './pages/ProductDetailPage/ProductDetailPage.jsx'
import CartPage from './pages/CartPage/CartPage.jsx'

const App = () => {
	return (
		<div>
			<Header />
			<main>
				<Routes>
					<Route path='/' element={<HomePage />} />
					<Route path='/products' element={<ProductsPage />} />
					<Route
						path='/products/:productId'
						element={<ProductDetailPage />}
					/>
					<Route path='/cart' element={<CartPage />} />
				</Routes>
			</main>
			<Footer />
		</div>
	)
}

export default App
