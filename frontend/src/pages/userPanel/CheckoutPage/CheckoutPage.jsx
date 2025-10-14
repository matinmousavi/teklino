import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Steps } from 'antd'
import useAPI from '../../../hooks/useAPI'
import useNotification from '../../../hooks/useNotification'
import ShippingStep from './components/ShippingStep'
import PlaceOrderStep from './components/PlaceOrderStep'
import styles from './CheckoutPage.module.css'

const CheckoutPage = () => {
	const [currentStep, setCurrentStep] = useState(0)
	const [shippingAddress, setShippingAddress] = useState(
		JSON.parse(localStorage.getItem('shippingAddress')) || {}
	)
	const navigate = useNavigate()
	const api = useAPI()
	const { openNotification } = useNotification()

	const handleShippingSubmit = values => {
		setShippingAddress(values)
		localStorage.setItem('shippingAddress', JSON.stringify(values))
		setCurrentStep(1)
	}

	const handlePlaceOrder = async orderData => {
		try {
			const createdOrder = await api.post('/orders', orderData)
			navigate(`/profile/orders/${createdOrder.id}`)
			openNotification('success', 'سفارش شما با موفقیت ثبت شد.')
		} catch (error) {
			openNotification(
				'error',
				error?.error?.message || 'خطا در ثبت سفارش'
			)
		}
	}

	const steps = [
		{
			title: 'آدرس ارسال',
			content: (
				<ShippingStep
					onFinish={handleShippingSubmit}
					initialValues={shippingAddress}
				/>
			),
		},
		{
			title: 'تایید نهایی',
			content: (
				<PlaceOrderStep
					shippingAddress={shippingAddress}
					onPlaceOrder={handlePlaceOrder}
					isLoading={api.isLoading}
				/>
			),
		},
	]

	return (
		<div className={styles['checkout-page']}>
			<Steps
				current={currentStep}
				items={steps.map(s => ({ title: s.title }))}
			/>
			<div className={styles['step-content']}>
				{steps[currentStep].content}
			</div>
		</div>
	)
}

export default CheckoutPage
