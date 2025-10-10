import { Link, useNavigate } from 'react-router-dom'
import { Form, Input, Button, Checkbox } from 'antd'
import { MailOutlined, LockOutlined } from '@ant-design/icons'
import { useAuth } from '../../../context/AuthContext'
import styles from './LoginPage.module.css'
import useNotification from '../../../hooks/useNotification'

const LoginPage = () => {
	const navigate = useNavigate()
	const { login } = useAuth()
	const { openNotification } = useNotification()

	const onFinish = async values => {
		try {
			await login(values)
			navigate('/')
		} catch (error) {
			if (error?.error?.status === 401 || error?.error?.status === 403) {
				openNotification('error', error.error.message)
			} else {
				openNotification(
					'error',
					'مشکلی در ارتباط با سرور پیش آمده است.'
				)
			}
			console.error('Login failed:', error)
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
						label='ایمیل یا نام کاربری'
						name='email'
						rules={[
							{
								required: true,
								message:
									'لطفا ایمیل یا نام کاربری خود را وارد کنید!',
							},
						]}
					>
						<Input
							prefix={<MailOutlined />}
							placeholder='ایمیل یا نام کاربری'
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
							<Link to='/forgot-password'>
								رمز عبور را فراموش کرده‌اید؟
							</Link>
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
				<div className={styles['login-form-container__footer']}>
					<Link to='/login-otp'>ورود با رمز یکبار مصرف</Link>
					<span className={styles['login-form-container__separator']}>
						|
					</span>
					<Link to='/register'>ثبت‌نام</Link>
				</div>
			</div>
		</div>
	)
}

export default LoginPage
