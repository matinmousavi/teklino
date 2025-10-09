import { Routes, Route } from 'react-router-dom'

import MainLayout from '../layouts/MainLayout/MainLayout.jsx'
import AdminLayout from '../layouts/AdminLayout/AdminLayout.jsx'

import ProtectedRoute from './ProtectedRoute.jsx'
import AdminRoute from './AdminRoute.jsx'

import HomePage from '../pages/userPanel/HomePage/HomePage.jsx'
import ProductsPage from '../pages/userPanel/ProductsPage/ProductsPage.jsx'
import ProductDetailPage from '../pages/userPanel/ProductDetailPage/ProductDetailPage.jsx'
import CartPage from '../pages/userPanel/CartPage/CartPage.jsx'
import ProfilePage from '../pages/userPanel/ProfilePage/ProfilePage.jsx'

import LoginPage from '../pages/public/LoginPage/LoginPage.jsx'
import RegisterPage from '../pages/public/RegisterPage/RegisterPage.jsx'

import DashboardPage from '../pages/adminPanel/DashboardPage/DashboardPage.jsx'
import UserListPage from '../pages/adminPanel/UserListPage/UserListPage.jsx'

const AppRoutes = () => {
	return (
		<Routes>
			<Route element={<MainLayout />}>
				<Route path='/' element={<HomePage />} />
				<Route path='/products' element={<ProductsPage />} />
				<Route
					path='/products/:productId'
					element={<ProductDetailPage />}
				/>
				<Route path='/cart' element={<CartPage />} />

				<Route element={<ProtectedRoute />}>
					<Route path='/profile' element={<ProfilePage />} />
				</Route>
			</Route>

			<Route element={<AdminRoute />}>
				<Route element={<AdminLayout />}>
					<Route
						path='/admin/dashboard'
						element={<DashboardPage />}
					/>
					<Route path='/admin/users' element={<UserListPage />} />
				</Route>
			</Route>

			<Route path='/login' element={<LoginPage />} />
			<Route path='/register' element={<RegisterPage />} />
		</Routes>
	)
}

export default AppRoutes
