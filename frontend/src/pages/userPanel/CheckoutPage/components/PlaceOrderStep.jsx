import { Button, List, Row, Col, Card } from 'antd'
import { useCart } from '../../../../context/CartContext'

const PlaceOrderStep = ({ shippingAddress, onPlaceOrder, isLoading }) => {
	const { state } = useCart()
	const { items } = state

	const itemsPrice = items.reduce(
		(acc, item) => acc + item.price * item.quantity,
		0
	)
	const shippingPrice = itemsPrice > 500000 ? 0 : 30000
	const taxPrice = Math.round(0.09 * itemsPrice)
	const totalPrice = itemsPrice + shippingPrice + taxPrice

	const handlePlaceOrder = () => {
		onPlaceOrder({
			orderItems: items.map(item => ({
				...item,
				qty: item.quantity,
			})),
			shippingAddress,
			paymentMethod: 'PayPal',
			itemsPrice,
			taxPrice,
			shippingPrice,
			totalPrice,
		})
	}

	return (
		<Row gutter={24}>
			<Col md={16}>
				<Card title='اطلاعات ارسال' style={{ marginBottom: '1rem' }}>
					<p>
						<strong>آدرس:</strong> {shippingAddress.address},{' '}
						{shippingAddress.city}, {shippingAddress.postalCode},{' '}
						{shippingAddress.country}
					</p>
				</Card>
				<Card title='محصولات سفارش'>
					<List
						dataSource={items}
						renderItem={item => (
							<List.Item key={item.id}>
								<List.Item.Meta
									avatar={
										<img
											src={item.image}
											alt={item.name}
											width={50}
										/>
									}
									title={
										<a href={`/products/${item.id}`}>
											{item.name}
										</a>
									}
									description={`${
										item.quantity
									} x ${item.price.toLocaleString()} = ${(
										item.quantity * item.price
									).toLocaleString()} تومان`}
								/>
							</List.Item>
						)}
					/>
				</Card>
			</Col>
			<Col md={8}>
				<Card title='جمع کل سفارش'>
					<List>
						<List.Item>
							<strong>جمع محصولات:</strong>{' '}
							{itemsPrice.toLocaleString()} تومان
						</List.Item>
						<List.Item>
							<strong>هزینه ارسال:</strong>{' '}
							{shippingPrice.toLocaleString()} تومان
						</List.Item>
						<List.Item>
							<strong>مالیات (۹٪):</strong>{' '}
							{taxPrice.toLocaleString()} تومان
						</List.Item>
						<List.Item>
							<strong>مبلغ کل:</strong>{' '}
							{totalPrice.toLocaleString()} تومان
						</List.Item>
						<List.Item>
							<Button
								type='primary'
								block
								onClick={handlePlaceOrder}
								loading={isLoading}
							>
								ثبت نهایی سفارش
							</Button>
						</List.Item>
					</List>
				</Card>
			</Col>
		</Row>
	)
}

export default PlaceOrderStep
