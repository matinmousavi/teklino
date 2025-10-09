import { Link, useNavigate } from 'react-router-dom'
import { Form, Input, Button } from 'antd'
import {
	UserOutlined,
	MailOutlined,
	LockOutlined,
	PhoneOutlined,
} from '@ant-design/icons'
import { useAuth } from '../../../context/AuthContext'
import useNotification from '../../../hooks/useNotification'
import styles from './RegisterPage.module.css'

const RegisterPage = () => {
	const navigate = useNavigate()
	const { register } = useAuth()
	const { openNotification } = useNotification()

	const onFinish = async values => {
		try {
			await register(values)
			navigate('/')
		} catch (error) {
			const errorMessage =
				error?.error?.message || 'خطایی در هنگام ثبت‌نام رخ داد.'
			openNotification('error', errorMessage)
			console.error('Registration failed:', error)
		}
	}

	return (
		<div className={styles['register-page']}>
			<div className={styles['register-form-container']}>
				<h1 className={styles['register-form-container__title']}>
					ایجاد حساب کاربری
				</h1>
				<Form name='register' onFinish={onFinish} layout='vertical'>
					<Form.Item
						label='نام کامل'
						name='name'
						rules={[
							{
								required: true,
								message: 'لطفا نام کامل خود را وارد کنید!',
								whitespace: true,
							},
						]}
					>
						<Input
							prefix={<UserOutlined />}
							placeholder='نام کامل'
							size='large'
						/>
					</Form.Item>

					<Form.Item
						label='نام کاربری'
						name='username'
						rules={[
							{
								required: true,
								message: 'لطفا نام کاربری خود را وارد کنید!',
								whitespace: true,
							},
						]}
					>
						<Input
							prefix={<UserOutlined />}
							placeholder='نام کاربری (انگلیسی)'
							size='large'
						/>
					</Form.Item>

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
						label='شماره موبایل (برای ورود با کد یکبار مصرف)'
						name='mobile'
						rules={[
							{
								required: true,
								message: 'لطفا شماره موبایل خود را وارد کنید!',
							},
							{
								pattern: /^09\d{9}$/,
								message:
									'شماره موبایل باید با 09 شروع شود و 11 رقم باشد!',
							},
						]}
					>
						<Input
							prefix={<PhoneOutlined />}
							placeholder='مثال: 09123456789'
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
						hasFeedback
					>
						<Input.Password
							prefix={<LockOutlined />}
							placeholder='رمز عبور'
							size='large'
						/>
					</Form.Item>

					<Form.Item
						label='تکرار رمز عبور'
						name='confirm'
						dependencies={['password']}
						hasFeedback
						rules={[
							{
								required: true,
								message: 'لطفا رمز عبور خود را تکرار کنید!',
							},
							({ getFieldValue }) => ({
								validator(_, value) {
									if (
										!value ||
										getFieldValue('password') === value
									) {
										return Promise.resolve()
									}
									return Promise.reject(
										new Error(
											'رمزهای عبور وارد شده یکسان نیستند!'
										)
									)
								},
							}),
						]}
					>
						<Input.Password
							prefix={<LockOutlined />}
							placeholder='تکرار رمز عبور'
							size='large'
						/>
					</Form.Item>

					<Form.Item>
						<Button
							type='primary'
							htmlType='submit'
							block
							size='large'
						>
							ثبت‌نام
						</Button>
					</Form.Item>
				</Form>
				<div className={styles['register-form-container__login']}>
					قبلاً ثبت‌نام کرده‌اید؟ <Link to='/login'>وارد شوید</Link>
				</div>
			</div>
		</div>
	)
}

export default RegisterPage
