import { useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import { Layout, Menu, Button } from 'antd'
import {
	DashboardOutlined,
	UserOutlined,
	ShoppingOutlined,
	ShopOutlined,
} from '@ant-design/icons'
import { useAuth } from '../../context/AuthContext'
import styles from './AdminLayout.module.css'

const { Header, Sider, Content } = Layout

const AdminLayout = () => {
	const [collapsed, setCollapsed] = useState(false)
	const { logout } = useAuth()

	const menuItems = [
		{
			key: '1',
			icon: <DashboardOutlined />,
			label: <Link to='/admin/dashboard'>داشبورد</Link>,
		},
		{
			key: '2',
			icon: <UserOutlined />,
			label: <Link to='/admin/users'>کاربران</Link>,
		},
		{
			key: '3',
			icon: <ShoppingOutlined />,
			label: <Link to='/admin/products'>محصولات</Link>,
		},
		{
			key: '4',
			icon: <ShopOutlined />,
			label: <Link to='/admin/orders'>سفارشات</Link>,
		},
	]

	return (
		<Layout className={styles['admin-layout']}>
			<Sider trigger={null} collapsible collapsed={collapsed}>
				<div className={styles.logo}>
					{collapsed ? 'T' : 'Teklino Admin'}
				</div>
				<Menu
					theme='dark'
					mode='inline'
					defaultSelectedKeys={['1']}
					items={menuItems}
				/>
			</Sider>
			<Layout>
				<Header className={styles['admin-layout__header']}>
					<Button
						type='text'
						icon={collapsed ? '☰' : '✕'}
						onClick={() => setCollapsed(!collapsed)}
					/>
					<Button type='primary' danger onClick={logout}>
						خروج
					</Button>
				</Header>
				<Content className={styles['admin-layout__content']}>
					<Outlet />
				</Content>
			</Layout>
		</Layout>
	)
}

export default AdminLayout
