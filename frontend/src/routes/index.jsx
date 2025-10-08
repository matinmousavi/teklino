import { Routes, Route } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout/MainLayout.jsx'
import HomePage from '../pages/userPanel/HomePage/HomePage.jsx'
import ProductsPage from '../pages/userPanel/ProductsPage/ProductsPage.jsx'
import ProductDetailPage from '../pages/userPanel/ProductDetailPage/ProductDetailPage.jsx'
import CartPage from '../pages/userPanel/CartPage/CartPage.jsx'
import LoginPage from '../pages/public/LoginPage/LoginPage.jsx'

const AppRoutes = () => {
	return (
		<Routes>
			{/* Routes with MainLayout (Header and Footer) */}
			<Route element={<MainLayout />}>
				<Route path='/' element={<HomePage />} />
				<Route path='/products' element={<ProductsPage />} />
				<Route
					path='/products/:productId'
					element={<ProductDetailPage />}
				/>
				<Route path='/cart' element={<CartPage />} />
			</Route>

			{/* Routes without MainLayout */}
			<Route path='/login' element={<LoginPage />} />
		</Routes>
	)
}

export default AppRoutes
