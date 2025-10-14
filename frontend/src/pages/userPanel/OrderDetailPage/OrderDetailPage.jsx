import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Spin, Row, Col, Card, List, Tag } from 'antd'
import useAPI from '../../../hooks/useAPI'
import styles from './OrderDetailPage.module.css'

const OrderDetailPage = () => {
	const { id: orderId } = useParams()
	const api = useAPI()

	useEffect(() => {
		api.init(`/orders/${orderId}`)
	}, [orderId])

	if (api.isLoading) {
		return <Spin size='large' className={styles['page-loader']} />
	}

	if (api.error) {
		return (
			<div className={styles['page-error']}>سفارش مورد نظر یافت نشد!</div>
		)
	}

	const { order } = api.data || {}

	return (
		<div className={styles['order-detail-page']}>
			<h1 className={styles['page-title']}>جزئیات سفارش: {order?.id}</h1>
			{order && (
				<Row gutter={24}>
					<Col md={16}>
						<Card
							title='اطلاعات ارسال'
							style={{ marginBottom: '1rem' }}
						>
							<p>
								<strong>نام تحویل گیرنده:</strong>{' '}
								{order.user.name}
							</p>
							<p>
								<strong>ایمیل:</strong> {order.user.email}
							</p>
							<p>
								<strong>آدرس:</strong>{' '}
								{order.shippingAddress.address},{' '}
								{order.shippingAddress.city},{' '}
								{order.shippingAddress.postalCode}
							</p>
							{order.isDelivered ? (
								<Tag color='green'>
									تحویل داده شده در تاریخ...
								</Tag>
							) : (
								<Tag color='red'>در حال پردازش</Tag>
							)}
						</Card>
						<Card title='محصولات سفارش'>
							<List
								dataSource={order.orderItems}
								renderItem={item => (
									<List.Item key={item.product}>
										<List.Item.Meta
											avatar={
												<img
													src={item.image}
													alt={item.name}
													width={50}
												/>
											}
											title={
												<a
													href={`/products/${item.product}`}
												>
													{item.name}
												</a>
											}
											description={`${
												item.qty
											} x ${item.price.toLocaleString()} = ${(
												item.qty * item.price
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
									{order.itemsPrice.toLocaleString()} تومان
								</List.Item>
								<List.Item>
									<strong>هزینه ارسال:</strong>{' '}
									{order.shippingPrice.toLocaleString()} تومان
								</List.Item>
								<List.Item>
									<strong>مالیات:</strong>{' '}
									{order.taxPrice.toLocaleString()} تومان
								</List.Item>
								<List.Item>
									<strong>مبلغ کل:</strong>{' '}
									{order.totalPrice.toLocaleString()} تومان
								</List.Item>
								<List.Item>
									{order.isPaid ? (
										<Tag
											color='green'
											style={{
												width: '100%',
												textAlign: 'center',
												padding: '0.5rem',
											}}
										>
											پرداخت شده در تاریخ...
										</Tag>
									) : (
										<Tag
											color='red'
											style={{
												width: '100%',
												textAlign: 'center',
												padding: '0.5rem',
											}}
										>
											در انتظار پرداخت
										</Tag>
									)}
								</List.Item>
							</List>
						</Card>
					</Col>
				</Row>
			)}
		</div>
	)
}

export default OrderDetailPage
