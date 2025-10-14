import { useState, useEffect } from 'react'
import { Form, Input, Button, Select, Spin } from 'antd'
import { useAuth } from '../../../../context/AuthContext'

const { Option } = Select

const ShippingStep = ({ onFinish, initialValues }) => {
	const [provinces, setProvinces] = useState([])
	const [cities, setCities] = useState([])
	const [selectedProvince, setSelectedProvince] = useState(null)
	const [isLoading, setIsLoading] = useState(true)
	const { user } = useAuth()
	const [form] = Form.useForm()

	useEffect(() => {
		const fetchProvinces = async () => {
			try {
				const response = await fetch(
					'https://iran-locations-api.ir/api/v1/fa/states'
				)
				const data = await response.json()
				setProvinces(data)
			} catch (error) {
				console.error('Failed to fetch provinces:', error)
			} finally {
				setIsLoading(false)
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

	const handleProvinceChange = async provinceName => {
		setSelectedProvince(provinceName)
		form.setFieldsValue({ city: undefined })
		setCities([])
		setIsLoading(true)
		try {
			const response = await fetch(
				`https://iran-locations-api.ir/api/v1/fa/cities?state=${provinceName}`
			)
			const data = await response.json()
			setCities(data.cities)
		} catch (error) {
			console.error('Failed to fetch cities:', error)
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<Spin spinning={isLoading}>
			<Form form={form} layout='vertical' onFinish={onFinish}>
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
							<Option key={province.id} value={province.name}>
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
						disabled={!selectedProvince}
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
