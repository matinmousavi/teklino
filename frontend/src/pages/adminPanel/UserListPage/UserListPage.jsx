import { useEffect, useState } from 'react'
import {
	Table,
	Button,
	Space,
	Tooltip,
	Modal,
	Form,
	Input,
	Select,
	Tag,
	Switch,
} from 'antd'
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons'
import useAPI from '../../../hooks/useAPI'
import useNotification from '../../../hooks/useNotification'
import styles from './UserListPage.module.css'

const { Option } = Select

const UserListPage = () => {
	const [isAddModalOpen, setIsAddModalOpen] = useState(false)
	const [isEditModalOpen, setIsEditModalOpen] = useState(false)
	const [editingUser, setEditingUser] = useState(null)
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
	const [userToDelete, setUserToDelete] = useState(null)
	const [userToToggleBlock, setUserToToggleBlock] = useState(null)
	const [form] = Form.useForm()

	const api = useAPI()
	const createApi = useAPI()
	const updateApi = useAPI()
	const deleteApi = useAPI()
	const blockApi = useAPI()
	const { openNotification } = useNotification()

	useEffect(() => {
		api.init('/users')
	}, [])

	useEffect(() => {
		if (editingUser) {
			form.setFieldsValue({
				name: editingUser.name,
				username: editingUser.username,
				email: editingUser.email,
				mobile: editingUser.mobile,
				role: editingUser.role,
			})
		}
	}, [editingUser, form])

	const handleToggleBlock = async userToToggle => {
		setUserToToggleBlock(userToToggle)
		try {
			await blockApi.put(`/users/${userToToggle.id}/toggle-block`)
			openNotification('success', 'وضعیت کاربر با موفقیت تغییر کرد.')
			api.setData(currentUsers =>
				currentUsers.map(user =>
					user.id === userToToggle.id
						? { ...user, isBlocked: !user.isBlocked }
						: user
				)
			)
		} catch (error) {
			openNotification(
				'error',
				error?.error?.message || 'خطایی در تغییر وضعیت کاربر رخ داد.'
			)
		} finally {
			setUserToToggleBlock(null)
		}
	}

	const showEditModal = user => {
		setEditingUser(user)
		setIsEditModalOpen(true)
	}

	const handleUpdate = async values => {
		try {
			const updatedUser = await updateApi.put(
				`/users/${editingUser.id}`,
				values
			)
			openNotification('success', 'کاربر با موفقیت ویرایش شد.')
			api.setData(currentUsers =>
				currentUsers.map(user =>
					user.id === editingUser.id
						? { ...user, ...updatedUser }
						: user
				)
			)
			setIsEditModalOpen(false)
			setEditingUser(null)
		} catch (error) {
			openNotification(
				'error',
				error?.error?.message || 'خطایی در ویرایش رخ داد.'
			)
		}
	}

	const showDeleteModal = user => {
		setUserToDelete(user)
		setIsDeleteModalOpen(true)
	}

	const handleDelete = async () => {
		try {
			const res = await deleteApi.delete(`/users/${userToDelete.id}`)
			openNotification('success', res.message)
			api.setData(currentUsers =>
				currentUsers.filter(user => user.id !== userToDelete.id)
			)
			setIsDeleteModalOpen(false)
			setUserToDelete(null)
		} catch (error) {
			openNotification(
				'error',
				error?.error?.message || 'خطایی در حذف کاربر رخ داد.'
			)
			setIsDeleteModalOpen(false)
			setUserToDelete(null)
		}
	}

	const handleCreate = async values => {
		try {
			const newUser = await createApi.post('/users', values)
			openNotification('success', 'کاربر با موفقیت ایجاد شد.')
			api.setData(currentUsers => [newUser, ...currentUsers])
			setIsAddModalOpen(false)
		} catch (error) {
			openNotification(
				'error',
				error?.error?.message || 'خطایی در ایجاد کاربر رخ داد.'
			)
		}
	}

	const handleCancel = () => {
		setIsAddModalOpen(false)
		setIsEditModalOpen(false)
		setEditingUser(null)
		setIsDeleteModalOpen(false)
		setUserToDelete(null)
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
			title: 'تاریخ عضویت',
			dataIndex: 'createdAt',
			key: 'createdAt',
			render: date => new Date(date).toLocaleDateString('fa-IR'),
			sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
		},
		{
			title: 'وضعیت',
			dataIndex: 'isBlocked',
			key: 'isBlocked',
			render: (isBlocked, record) => (
				<span className={isBlocked ? styles['switch-danger'] : ''}>
					<Switch
						checkedChildren='فعال'
						unCheckedChildren='مسدود'
						checked={!isBlocked}
						onChange={() => handleToggleBlock(record)}
						loading={
							blockApi.isLoading &&
							userToToggleBlock?.id === record.id
						}
						disabled={record.role === 'admin'}
					/>
				</span>
			),
		},
		{
			title: 'نقش',
			dataIndex: 'role',
			key: 'role',
			filters: [
				{ text: 'مدیر', value: 'admin' },
				{ text: 'فروشنده', value: 'seller' },
				{ text: 'کاربر', value: 'user' },
			],
			onFilter: (value, record) => record.role.includes(value),
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
						<Button
							type='link'
							icon={<EditOutlined />}
							onClick={() => showEditModal(record)}
						/>
					</Tooltip>
					<Tooltip title='حذف'>
						<Button
							type='link'
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
			<div className={styles['page-header']}>
				<h1 className={styles['page-title']}>مدیریت کاربران</h1>
				<Button
					type='primary'
					icon={<PlusOutlined />}
					onClick={() => setIsAddModalOpen(true)}
				>
					افزودن کاربر
				</Button>
			</div>
			<Table
				columns={columns}
				dataSource={api.data || []}
				loading={api.isLoading}
				rowKey='id'
				pagination={{ position: ['bottomCenter'] }}
			/>

			<Modal
				title='افزودن کاربر جدید'
				open={isAddModalOpen}
				onCancel={handleCancel}
				footer={null}
				destroyOnClose
			>
				<Form
					layout='vertical'
					onFinish={handleCreate}
					style={{ marginTop: '2rem' }}
				>
					{/* ... فرم افزودن کاربر مثل قبل ... */}
				</Form>
			</Modal>

			{editingUser && (
				<Modal
					title={`ویرایش کاربر: ${editingUser.name}`}
					open={isEditModalOpen}
					onCancel={handleCancel}
					footer={null}
					destroyOnClose
				>
					<Form
						form={form}
						layout='vertical'
						onFinish={handleUpdate}
						style={{ marginTop: '2rem' }}
					>
						<Form.Item
							name='name'
							label='نام'
							rules={[
								{
									required: true,
									message: 'لطفا نام را وارد کنید',
								},
							]}
						>
							<Input
								disabled={
									editingUser.email === 'admin@gmail.com'
								}
							/>
						</Form.Item>
						<Form.Item
							name='username'
							label='نام کاربری (غیرقابل ویرایش)'
						>
							<Input disabled />
						</Form.Item>
						<Form.Item name='email' label='ایمیل (غیرقابل ویرایش)'>
							<Input disabled />
						</Form.Item>
						<Form.Item
							name='mobile'
							label='شماره موبایل (غیرقابل ویرایش)'
						>
							<Input disabled />
						</Form.Item>
						<Form.Item
							name='role'
							label='نقش'
							rules={[
								{
									required: true,
									message: 'لطفا نقش را انتخاب کنید',
								},
							]}
						>
							<Select
								placeholder='انتخاب نقش'
								disabled={
									editingUser.email === 'admin@gmail.com'
								}
							>
								<Option value='user'>کاربر</Option>
								<Option value='seller'>فروشنده</Option>
								<Option value='admin'>مدیر</Option>
							</Select>
						</Form.Item>
						<Form.Item
							style={{ textAlign: 'left', marginTop: '2rem' }}
						>
							<Button
								onClick={handleCancel}
								style={{ marginLeft: '8px' }}
							>
								انصراف
							</Button>
							<Button
								type='primary'
								htmlType='submit'
								loading={updateApi.isLoading}
							>
								ذخیره تغییرات
							</Button>
						</Form.Item>
					</Form>
				</Modal>
			)}

			{userToDelete && (
				<Modal
					title='تایید حذف کاربر'
					open={isDeleteModalOpen}
					onOk={handleDelete}
					onCancel={handleCancel}
					okText='بله، حذف کن'
					cancelText='خیر'
					confirmLoading={deleteApi.isLoading}
					okButtonProps={{ danger: true }}
				>
					<p>
						آیا از حذف کاربر **{userToDelete.name}** با ایمیل **
						{userToDelete.email}** مطمئن هستید؟ این عمل غیرقابل
						بازگشت است.
					</p>
				</Modal>
			)}
		</div>
	)
}

export default UserListPage
