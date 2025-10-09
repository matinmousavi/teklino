import { Link, useNavigate } from 'react-router-dom'
import { Form, Input, Button, Checkbox } from 'antd'
import { MailOutlined, LockOutlined } from '@ant-design/icons'
import styles from './LoginPage.module.css'
import { useAuth } from '../../../context/AuthContext'

const LoginPage = () => {
	const navigate = useNavigate()
	const { login } = useAuth()

	const onFinish = async values => {
		try {
			await login(values)
			navigate('/')
		} catch (error) {
			console.error('Login failed:', error);
		}
	}

	return (
		<div className={styles['login-page']}>
			<div className={styles['login-form-container']}>
				<h1 className={styles['login-form-container__title']}>
					ورود به تکلینو
				</h1>
				<Form
					name='login'
					initialValues={{ remember: true }}
					onFinish={onFinish}
					layout='vertical'
				>
					<Form.Item
						label='ایمیل'
						name='email'
						rules={[
							{
								required: true,
								message: 'لطفا ایمیل خود را وارد کنید!',
							},
							{
								type: 'email',
								message: 'ایمیل وارد شده معتبر نیست!',
							},
						]}
					>
						<Input
							prefix={<MailOutlined />}
							placeholder='ایمیل'
							size='large'
						/>
					</Form.Item>

					<Form.Item
						label='رمز عبور'
						name='password'
						rules={[
							{
								required: true,
								message: 'لطفا رمز عبور خود را وارد کنید!',
							},
						]}
					>
						<Input.Password
							prefix={<LockOutlined />}
							placeholder='رمز عبور'
							size='large'
						/>
					</Form.Item>

					<Form.Item>
						<div
							className={styles['login-form-container__options']}
						>
							<Form.Item
								name='remember'
								valuePropName='checked'
								noStyle
							>
								<Checkbox>مرا به خاطر بسپار</Checkbox>
							</Form.Item>
							<a href='/forgot-password'>
								رمز عبور را فراموش کرده‌اید؟
							</a>
						</div>
					</Form.Item>

					<Form.Item>
						<Button
							type='primary'
							htmlType='submit'
							block
							size='large'
						>
							ورود
						</Button>
					</Form.Item>
				</Form>
				<div className={styles['login-form-container__register']}>
					حساب کاربری ندارید؟ <Link to='/register'>ثبت‌نام کنید</Link>
				</div>
			</div>
		</div>
	)
}

export default LoginPage
