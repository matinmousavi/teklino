/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect } from 'react'
import { Spin, Flex } from 'antd'
import useAPI from '../hooks/useAPI'

const AuthContext = createContext()

const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null)
	const [initLoading, setInitLoading] = useState(true)
	const api = useAPI()

	const isAdmin = user?.role === 'admin'
	const isSeller = user?.role === 'seller'
	const isLogin = !!user

	useEffect(() => {
		const checkUserStatus = async () => {
			try {
				const storedUser = JSON.parse(localStorage.getItem('user'))
				if (storedUser) {
					setUser(storedUser)
				}
			} catch (error) {
				console.log('Error fetching user:', error)
				setUser(null)
			} finally {
				setInitLoading(false)
			}
		}
		checkUserStatus()
	}, [])

	const login = async userData => {
		const loggedInUser = await api.post('/users/login', userData)
		localStorage.setItem('user', JSON.stringify(loggedInUser))
		setUser(loggedInUser)
	}

	const register = async userData => {
		const registeredUser = await api.post('/users/register', userData)
		localStorage.setItem('user', JSON.stringify(registeredUser))
		setUser(registeredUser)
	}

	const logout = async () => {
		await api.post('/users/logout')
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
