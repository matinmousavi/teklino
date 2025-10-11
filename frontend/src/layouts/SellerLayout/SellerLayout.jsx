import { Link, Outlet } from 'react-router-dom'
import { Layout, Menu, Button } from 'antd'
import { DashboardOutlined, ShoppingOutlined } from '@ant-design/icons'
import { useAuth } from '../../context/AuthContext'

const { Header, Sider, Content } = Layout

const SellerLayout = () => {
	const { logout } = useAuth()
	const menuItems = [
		{
			key: '1',
			icon: <DashboardOutlined />,
			label: <Link to='/seller/dashboard'>داشبورد</Link>,
		},
		{
			key: '2',
			icon: <ShoppingOutlined />,
			label: <Link to='/seller/products'>محصولات من</Link>,
		},
	]

	return (
		<Layout style={{ minHeight: '100vh' }}>
			<Sider>
				<div
					style={{
						height: '32px',
						margin: '16px',
						background: 'rgba(255, 255, 255, 0.2)',
						color: 'white',
						textAlign: 'center',
						lineHeight: '32px',
						borderRadius: '5px',
					}}
				>
					فروشنده
				</div>
				<Menu
					theme='dark'
					mode='inline'
					defaultSelectedKeys={['1']}
					items={menuItems}
				/>
			</Sider>
			<Layout>
				<Header
					style={{
						padding: '0 24px',
						background: '#fff',
						display: 'flex',
						justifyContent: 'flex-end',
						alignItems: 'center',
					}}
				>
					<Button type='primary' danger onClick={logout}>
						خروج
					</Button>
				</Header>
				<Content
					style={{
						margin: '24px 16px',
						padding: 24,
						background: '#fff',
						borderRadius: '8px',
					}}
				>
					<Outlet />
				</Content>
			</Layout>
		</Layout>
	)
}

export default SellerLayout
