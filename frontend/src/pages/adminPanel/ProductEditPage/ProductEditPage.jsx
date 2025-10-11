import { useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Form, Input, Button, Spin, InputNumber, Upload } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import useAPI from '../../../hooks/useAPI'
import useNotification from '../../../hooks/useNotification'
import styles from './ProductEditPage.module.css'

const ProductEditPage = () => {
	const { id: productId } = useParams()
	const navigate = useNavigate()
	const [form] = Form.useForm()
	const isCreateMode = productId === 'new'

	const api = useAPI()
	const actionApi = useAPI()
	const { openNotification } = useNotification()

	useEffect(() => {
		if (!isCreateMode) {
			api.init(`/products/${productId}`)
		} else {
			form.resetFields()
		}
	}, [productId, isCreateMode])

	useEffect(() => {
		if (api.data && !isCreateMode) {
			form.setFieldsValue(api.data)
		}
	}, [api.data, form, isCreateMode])

	const onFinish = async values => {
		try {
			if (isCreateMode) {
				await actionApi.post('/products', values)
				openNotification('success', 'محصول با موفقیت ایجاد شد.')
			} else {
				await actionApi.put(`/products/${productId}`, values)
				openNotification('success', 'محصول با موفقیت ویرایش شد.')
			}
			navigate('/admin/products')
		} catch (error) {
			const errorMessage =
				error?.error?.message ||
				(isCreateMode
					? 'خطایی در ایجاد محصول رخ داد.'
					: 'خطایی در ویرایش محصول رخ داد.')
			openNotification('error', errorMessage)
		}
	}

	const uploadProps = {
		name: 'image',
		action: '/api/upload',
		showUploadList: false,
		onChange(info) {
			if (info.file.status === 'done') {
				openNotification(
					'success',
					`${info.file.name} با موفقیت آپلود شد`
				)
				form.setFieldsValue({ image: info.file.response.image })
			} else if (info.file.status === 'error') {
				openNotification('error', `${info.file.name} آپلود نشد.`)
			}
		},
	}

	if (api.isLoading && !isCreateMode) {
		return <Spin size='large' className={styles['page-loader']} />
	}

	return (
		<div>
			<Link to='/admin/products'>
				<Button style={{ marginBottom: '1rem' }}>
					بازگشت به لیست محصولات
				</Button>
			</Link>
			<h1 className={styles['page-title']}>
				{isCreateMode
					? 'ایجاد محصول جدید'
					: `ویرایش محصول: ${api.data?.name}`}
			</h1>

			<Form form={form} layout='vertical' onFinish={onFinish}>
				<Form.Item
					name='name'
					label='نام محصول'
					rules={[
						{
							required: true,
							message: 'لطفاً نام محصول را وارد کنید',
						},
					]}
				>
					<Input />
				</Form.Item>
				<Form.Item
					name='price'
					label='قیمت ( تومان )'
					rules={[
						{ required: true, message: 'لطفاً قیمت را وارد کنید' },
					]}
				>
					<InputNumber min={0} style={{ width: '100%' }} />
				</Form.Item>

				<Form.Item
					name='image'
					label='تصویر محصول'
					rules={[
						{
							required: true,
							message: 'لطفاً تصویر محصول را آپلود کنید',
						},
					]}
				>
					<Input readOnly placeholder='برای آپلود کلیک کنید' />
				</Form.Item>
				<Form.Item>
					<Upload {...uploadProps}>
						<Button icon={<UploadOutlined />}>آپلود تصویر</Button>
					</Upload>
				</Form.Item>

				<Form.Item
					name='brand'
					label='برند'
					rules={[
						{ required: true, message: 'لطفاً برند را وارد کنید' },
					]}
				>
					<Input />
				</Form.Item>
				<Form.Item
					name='category'
					label='دسته بندی'
					rules={[
						{
							required: true,
							message: 'لطفاً دسته بندی را وارد کنید',
						},
					]}
				>
					<Input />
				</Form.Item>
				<Form.Item
					name='countInStock'
					label='موجودی انبار'
					rules={[
						{
							required: true,
							message: 'لطفاً موجودی را وارد کنید',
						},
					]}
				>
					<InputNumber min={0} style={{ width: '100%' }} />
				</Form.Item>
				<Form.Item
					name='description'
					label='توضیحات'
					rules={[
						{
							required: true,
							message: 'لطفاً توضیحات را وارد کنید',
						},
					]}
				>
					<Input.TextArea rows={4} />
				</Form.Item>
				<Form.Item>
					<Button
						type='primary'
						htmlType='submit'
						loading={actionApi.isLoading}
					>
						{isCreateMode ? 'ایجاد محصول' : 'ذخیره تغییرات'}
					</Button>
				</Form.Item>
			</Form>
		</div>
	)
}

export default ProductEditPage
