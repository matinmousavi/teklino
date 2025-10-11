import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const SellerRoute = () => {
	const { isLogin, isSeller, isAdmin } = useAuth()

	if (!isLogin) return <Navigate to='/login' replace />
	if (!isSeller && !isAdmin) return <Navigate to='/' replace />

	return <Outlet />
}

export default SellerRoute
