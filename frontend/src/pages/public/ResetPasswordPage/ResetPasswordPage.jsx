import { useParams, useNavigate } from 'react-router-dom'
import { Form, Input, Button } from 'antd'
import useAPI from '../../../hooks/useAPI'
import useNotification from '../../../hooks/useNotification'
import styles from './ResetPasswordPage.module.css'

const ResetPasswordPage = () => {
	const { token } = useParams()
	const navigate = useNavigate()
	const api = useAPI()
	const { openNotification } = useNotification()

	const onFinish = async values => {
		try {
			await api.put(`/users/resetpassword/${token}`, {
				password: values.password,
			})
			openNotification('success', 'رمز عبور شما با موفقیت تغییر کرد.')
			navigate('/login')
		} catch (error) {
			const errorMessage = error?.error?.message || 'خطایی رخ داد.'
			openNotification('error', errorMessage)
		}
	}

	return (
		<div className={styles['page-container']}>
			<div className={styles['form-container']}>
				<h1 className={styles['form-container__title']}>
					تنظیم رمز عبور جدید
				</h1>
				<Form
					name='reset_password'
					onFinish={onFinish}
					layout='vertical'
				>
					<Form.Item
						label='رمز عبور جدید'
						name='password'
						rules={[
							{
								required: true,
								message: 'لطفا رمز عبور جدید را وارد کنید!',
							},
						]}
						hasFeedback
					>
						<Input.Password
							placeholder='رمز عبور جدید'
							size='large'
						/>
					</Form.Item>
					<Form.Item
						label='تکرار رمز عبور جدید'
						name='confirm'
						dependencies={['password']}
						hasFeedback
						rules={[
							{
								required: true,
								message: 'لطفا رمز عبور را تکرار کنید!',
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
										new Error('رمزهای عبور یکسان نیستند!')
									)
								},
							}),
						]}
					>
						<Input.Password
							placeholder='تکرار رمز عبور جدید'
							size='large'
						/>
					</Form.Item>
					<Form.Item>
						<Button
							type='primary'
							htmlType='submit'
							block
							size='large'
							loading={api.isLoading}
						>
							تغییر رمز عبور
						</Button>
					</Form.Item>
				</Form>
			</div>
		</div>
	)
}

export default ResetPasswordPage
