/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect } from 'react'
import { Spin, Flex } from 'antd'

const AuthContext = createContext()

const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null)
	const [initLoading, setInitLoading] = useState(true)

	const isAdmin = user?.role === 'admin'
	const isSeller = user?.role === 'seller'
	const isLogin = !!user

	useEffect(() => {
		const storedUser = localStorage.getItem('user')
		if (storedUser) {
			setUser(JSON.parse(storedUser))
		}
		setInitLoading(false)
	}, [])

	const login = userData => {
		const mockUser = { ...userData, id: 1, role: 'user' }
		localStorage.setItem('user', JSON.stringify(mockUser))
		setUser(mockUser)
	}

	const register = userData => {
		const mockUser = { ...userData, id: 2, role: 'user' }
		localStorage.setItem('user', JSON.stringify(mockUser))
		setUser(mockUser)
	}

	const logout = () => {
		localStorage.removeItem('user')
		setUser(null)
		window.location.replace('/')
	}

	if (initLoading) {
		return (
			<Flex style={{ height: '100vh' }} justify='center' align='center'>
				<Spin size='large' />
			</Flex>
		)
	}

	const contextValue = {
		user,
		setUser,
		isAdmin,
		isSeller,
		isLogin,
		login,
		register,
		logout,
	}

	return (
		<AuthContext.Provider value={contextValue}>
			{children}
		</AuthContext.Provider>
	)
}

const useAuth = () => useContext(AuthContext)

export { useAuth }
export default AuthProvider
