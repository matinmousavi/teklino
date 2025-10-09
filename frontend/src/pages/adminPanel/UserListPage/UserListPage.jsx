import { useEffect, useState } from 'react'
import { Table, Button, Space, Tooltip, Modal, Tag } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import useAPI from '../../../hooks/useAPI'
import useNotification from '../../../hooks/useNotification'
import styles from './UserListPage.module.css'

const UserListPage = () => {
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [userToDelete, setUserToDelete] = useState(null)
	const api = useAPI()
	const deleteApi = useAPI()
	const { openNotification } = useNotification()

	useEffect(() => {
		api.init('/users')
	}, [])

	const showDeleteModal = user => {
		setUserToDelete(user)
		setIsModalOpen(true)
	}

	const handleCancel = () => {
		setIsModalOpen(false)
		setUserToDelete(null)
	}

	const handleDelete = async () => {
		try {
			const res = await deleteApi.delete(`/users/${userToDelete.id}`)
			openNotification('success', res.message)
			api.setData(currentUsers =>
				currentUsers.filter(user => user.id !== userToDelete.id)
			)
			handleCancel()
		} catch (error) {
			openNotification(
				'error',
				error?.error?.message || 'خطایی در حذف کاربر رخ داد.'
			)
			handleCancel()
		}
	}

	const columns = [
		{
			title: 'ردیف',
			key: 'rowNumber',
			render: (_, record, index) => index + 1,
		},
		{ title: 'نام', dataIndex: 'name', key: 'name' },
		{ title: 'ایمیل', dataIndex: 'email', key: 'email' },
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
			render: (_, record) => (
				<Space size='middle'>
					<Tooltip title='ویرایش'>
						<Button type='primary' icon={<EditOutlined />} />
					</Tooltip>
					<Tooltip title='حذف'>
						<Button
							type='primary'
							danger
							icon={<DeleteOutlined />}
							onClick={() => showDeleteModal(record)}
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
				pagination={{ position: ['bottomCenter'] }}
			/>
			<Modal
				title='تایید حذف کاربر'
				open={isModalOpen}
				onOk={handleDelete}
				onCancel={handleCancel}
				okText='بله، حذف کن'
				cancelText='خیر'
				confirmLoading={deleteApi.isLoading}
				okButtonProps={{ danger: true }}
			>
				<p>
					آیا از حذف کاربر **{userToDelete?.name}** با ایمیل **
					{userToDelete?.email}** مطمئن هستید؟ این عمل غیرقابل بازگشت
					است.
				</p>
			</Modal>
		</div>
	)
}

export default UserListPage
