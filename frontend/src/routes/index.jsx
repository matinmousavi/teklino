import { Routes, Route } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout/MainLayout.jsx'
import HomePage from '../pages/userPanel/HomePage/HomePage.jsx'
import ProductsPage from '../pages/userPanel/ProductsPage/ProductsPage.jsx'
import ProductDetailPage from '../pages/userPanel/ProductDetailPage/ProductDetailPage.jsx'
import CartPage from '../pages/userPanel/CartPage/CartPage.jsx'
import LoginPage from '../pages/public/LoginPage/LoginPage.jsx'
import RegisterPage from '../pages/public/RegisterPage/RegisterPage.jsx'
import ProfilePage from '../pages/userPanel/ProfilePage/ProfilePage.jsx'
import ProtectedRoute from './ProtectedRoute.jsx'

const AppRoutes = () => {
	return (
		<Routes>
			{/* Routes with MainLayout */}
			<Route element={<MainLayout />}>
				<Route path='/' element={<HomePage />} />
				<Route path='/products' element={<ProductsPage />} />
				<Route
					path='/products/:productId'
					element={<ProductDetailPage />}
				/>
				<Route path='/cart' element={<CartPage />} />
			</Route>

			{/* Protected User Routes */}
			<Route element={<ProtectedRoute />}>
				<Route path='/profile' element={<ProfilePage />} />
			</Route>

			{/* Routes without MainLayout */}
			<Route path='/login' element={<LoginPage />} />
			<Route path='/register' element={<RegisterPage />} />
		</Routes>
	)
}

export default AppRoutes
