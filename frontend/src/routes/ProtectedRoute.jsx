import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const ProtectedRoute = () => {
	const { isLogin } = useAuth()

	if (!isLogin) {
		return <Navigate to='/login' replace />
	}

	return <Outlet />
}

export default ProtectedRoute
