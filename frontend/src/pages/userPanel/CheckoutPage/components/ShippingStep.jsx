import { useState, useEffect } from 'react'
import { Form, Input, Button, Select, Spin } from 'antd'
import { useAuth } from '../../../../context/AuthContext'
import useAPI from '../../../../hooks/useAPI'

const { Option } = Select

const ShippingStep = ({ onFinish, initialValues }) => {
	const [provinces, setProvinces] = useState([])
	const [cities, setCities] = useState([])
	const [selectedProvinceId, setSelectedProvinceId] = useState(null)
	const { user } = useAuth()
	const [form] = Form.useForm()

	const provincesApi = useAPI()
	const citiesApi = useAPI()

	useEffect(() => {
		const fetchProvinces = async () => {
			try {
				const data = await provincesApi.get('/locations/provinces')
				setProvinces(data)
			} catch (error) {
				console.error('Failed to fetch provinces:', error)
			}
		}
		fetchProvinces()
	}, [])

	useEffect(() => {
		const initialFormValues = {
			...initialValues,
			mobile: initialValues?.mobile || user?.mobile,
		}
		form.setFieldsValue(initialFormValues)
	}, [initialValues, user, form])

	const handleProvinceChange = async (provinceId, option) => {
		setSelectedProvinceId(provinceId)
		form.setFieldsValue({ city: undefined, province: option.children })
		setCities([])
		try {
			const data = await citiesApi.get(`/locations/cities/${provinceId}`)
			setCities(data)
		} catch (error) {
			console.error('Failed to fetch cities:', error)
		}
	}

	return (
		<Spin spinning={provincesApi.isLoading || citiesApi.isLoading}>
			<Form
				form={form}
				layout='vertical'
				onFinish={onFinish}
				initialValues={{ country: 'ایران' }}
			>
				<Form.Item
					label='استان'
					name='province'
					rules={[
						{
							required: true,
							message: 'لطفاً استان را انتخاب کنید',
						},
					]}
				>
					<Select
						placeholder='استان خود را انتخاب کنید'
						onChange={handleProvinceChange}
					>
						{provinces.map(province => (
							<Option key={province.id} value={province.id}>
								{province.name}
							</Option>
						))}
					</Select>
				</Form.Item>
				<Form.Item
					label='شهر'
					name='city'
					rules={[
						{ required: true, message: 'لطفاً شهر را انتخاب کنید' },
					]}
				>
					<Select
						placeholder='ابتدا استان را انتخاب کنید'
						disabled={!selectedProvinceId}
					>
						{cities.map(city => (
							<Option key={city.id} value={city.name}>
								{city.name}
							</Option>
						))}
					</Select>
				</Form.Item>
				<Form.Item
					label='آدرس دقیق'
					name='address'
					rules={[
						{
							required: true,
							message: 'لطفاً آدرس دقیق را وارد کنید',
						},
					]}
				>
					<Input.TextArea rows={3} />
				</Form.Item>
				<Form.Item
					label='کد پستی'
					name='postalCode'
					rules={[
						{
							required: true,
							message: 'لطفاً کد پستی را وارد کنید',
						},
					]}
				>
					<Input />
				</Form.Item>
				<Form.Item
					label='کشور'
					name='country'
					rules={[
						{ required: true, message: 'لطفاً کشور را وارد کنید' },
					]}
				>
					<Input />
				</Form.Item>
				<Form.Item
					label='شماره تماس'
					name='mobile'
					rules={[
						{
							required: true,
							message: 'لطفاً شماره تماس را وارد کنید',
						},
					]}
				>
					<Input />
				</Form.Item>
				<Form.Item>
					<Button type='primary' htmlType='submit'>
						ادامه
					</Button>
				</Form.Item>
			</Form>
		</Spin>
	)
}

export default ShippingStep
