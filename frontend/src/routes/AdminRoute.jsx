import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const AdminRoute = () => {
	const { isLogin, isAdmin } = useAuth()

	if (!isLogin) {
		return <Navigate to='/login' replace />
	}

	if (!isAdmin) {
		return <Navigate to='/' replace />
	}

	return <Outlet />
}

export default AdminRoute
