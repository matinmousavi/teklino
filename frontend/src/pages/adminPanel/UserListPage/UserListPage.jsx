import { useEffect } from 'react'
import { Table, Button, Space, Tooltip, Tag } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import useAPI from '../../../hooks/useAPI'
import styles from './UserListPage.module.css'

const UserListPage = () => {
	const api = useAPI()

	useEffect(() => {
		api.init('/users')
	}, [])

	const columns = [
		{
			title: 'ردیف',
			key: 'rowNumber',
			render: (_, record, index) => index + 1,
		},
		{
			title: 'نام',
			dataIndex: 'name',
			key: 'name',
		},
		{
			title: 'ایمیل',
			dataIndex: 'email',
			key: 'email',
		},
		{
			title: 'نقش',
			dataIndex: 'role',
			key: 'role',
			render: role => {
				let color = 'geekblue'
				let text = 'کاربر'
				if (role === 'admin') {
					color = 'volcano'
					text = 'مدیر'
				} else if (role === 'seller') {
					color = 'green'
					text = 'فروشنده'
				}
				return <Tag color={color}>{text.toUpperCase()}</Tag>
			},
		},
		{
			title: 'عملیات',
			key: 'action',
			render: () => (
				<Space size='middle'>
					<Tooltip title='ویرایش'>
						<Button type='primary' icon={<EditOutlined />} />
					</Tooltip>
					<Tooltip title='حذف'>
						<Button
							type='primary'
							danger
							icon={<DeleteOutlined />}
						/>
					</Tooltip>
				</Space>
			),
		},
	]

	return (
		<div>
			<h1 className={styles['page-title']}>مدیریت کاربران</h1>
			<Table
				columns={columns}
				dataSource={api.data || []}
				loading={api.isLoading}
				rowKey='id'
				pagination={{
					position: ['bottomCenter'],
				}}
			/>
		</div>
	)
}

export default UserListPage
