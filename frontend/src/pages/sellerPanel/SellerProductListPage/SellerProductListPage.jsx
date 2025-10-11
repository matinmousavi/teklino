import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Table, Button, Space, Tooltip, Modal, Input, Tag, Image } from 'antd'
import {
	EditOutlined,
	DeleteOutlined,
	PlusOutlined,
	SearchOutlined,
} from '@ant-design/icons'
import useAPI from '../../../hooks/useAPI'
import useNotification from '../../../hooks/useNotification'
import styles from './SellerProductListPage.module.css'

const SellerProductListPage = () => {
	const [productToDelete, setProductToDelete] = useState(null)
	const [filteredData, setFilteredData] = useState([])
	const navigate = useNavigate()
	const api = useAPI()
	const deleteApi = useAPI()
	const { openNotification } = useNotification()

	useEffect(() => {
		api.init('/products/myproducts')
	}, [])

	useEffect(() => {
		if (api.data) {
			setFilteredData(api.data)
		}
	}, [api.data])

	const handleSearch = e => {
		const value = e.target.value.toLowerCase()
		const filtered = (api.data || []).filter(product =>
			product.name.toLowerCase().includes(value)
		)
		setFilteredData(filtered)
	}

	const handleCreateProduct = () => {
		navigate('/admin/product/new/edit')
	}

	const handleDelete = async () => {
		try {
			const res = await deleteApi.delete(
				`/products/${productToDelete.id}`
			)
			openNotification('success', res.message)
			api.setData(currentProducts =>
				currentProducts.filter(
					product => product.id !== productToDelete.id
				)
			)
			setProductToDelete(null)
		} catch (error) {
			openNotification(
				'error',
				error?.error?.message || 'خطایی در حذف محصول رخ داد.'
			)
			setProductToDelete(null)
		}
	}

	const columns = [
		{
			title: 'ردیف',
			key: 'rowNumber',
			render: (_, record, index) => index + 1,
		},
		{
			title: 'تصویر',
			dataIndex: 'image',
			key: 'image',
			render: image => <Image width={60} src={image} />,
		},
		{
			title: 'نام',
			dataIndex: 'name',
			key: 'name',
		},
		{
			title: 'قیمت',
			dataIndex: 'price',
			key: 'price',
			render: price => `${price.toLocaleString()} تومان`,
			sorter: (a, b) => a.price - b.price,
		},
		{
			title: 'دسته بندی',
			dataIndex: 'category',
			key: 'category',
		},
		{
			title: 'وضعیت',
			dataIndex: 'countInStock',
			key: 'status',
			filters: [
				{ text: 'موجود', value: 'inStock' },
				{ text: 'ناموجود', value: 'outOfStock' },
			],
			onFilter: (value, record) => {
				if (value === 'inStock') return record.countInStock > 0
				if (value === 'outOfStock') return record.countInStock === 0
				return true
			},
			render: countInStock =>
				countInStock > 0 ? (
					<Tag color='green'>موجود</Tag>
				) : (
					<Tag color='red'>ناموجود</Tag>
				),
		},
		{
			title: 'عملیات',
			key: 'action',
			render: (_, record) => (
				<Space size='middle'>
					<Tooltip title='ویرایش'>
						<Button
							type='primary'
							icon={<EditOutlined />}
							onClick={() =>
								navigate(`/admin/product/${record.id}/edit`)
							}
						/>
					</Tooltip>
					<Tooltip title='حذف'>
						<Button
							type='primary'
							danger
							icon={<DeleteOutlined />}
							onClick={() => setProductToDelete(record)}
						/>
					</Tooltip>
				</Space>
			),
		},
	]

	return (
		<div>
			<div className={styles['page-header']}>
				<h1 className={styles['page-title']}>مدیریت محصولات من</h1>
				<Button
					type='primary'
					icon={<PlusOutlined />}
					onClick={handleCreateProduct}
				>
					افزودن محصول
				</Button>
			</div>
			<Input
				placeholder='جستجو بر اساس نام محصول...'
				onChange={handleSearch}
				prefix={<SearchOutlined />}
				style={{ marginBottom: '1rem', maxWidth: '300px' }}
			/>
			<Table
				columns={columns}
				dataSource={filteredData}
				loading={api.isLoading}
				rowKey='id'
				pagination={{ position: ['bottomCenter'] }}
			/>
			{productToDelete && (
				<Modal
					title='تایید حذف محصول'
					open={!!productToDelete}
					onOk={handleDelete}
					onCancel={() => setProductToDelete(null)}
					okText='بله، حذف کن'
					cancelText='خیر'
					confirmLoading={deleteApi.isLoading}
					okButtonProps={{ danger: true }}
				>
					<p>
						آیا از حذف محصول **{productToDelete.name}** مطمئن هستید؟
					</p>
				</Modal>
			)}
		</div>
	)
}

export default SellerProductListPage
