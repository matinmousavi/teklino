import { Form, Input, Button } from 'antd'
import useAPI from '../../../hooks/useAPI'
import useNotification from '../../../hooks/useNotification'
import styles from './ForgotPasswordPage.module.css'

const ForgotPasswordPage = () => {
	const api = useAPI()
	const { openNotification } = useNotification()

	const onFinish = async values => {
		try {
			await api.post('/users/forgotpassword', values)
			openNotification(
				'success',
				'ایمیل بازنشانی رمز عبور با موفقیت ارسال شد.',
				'اگر ایمیل وارد شده در سیستم ما موجود باشد، لینکی برای بازنشانی رمز عبور دریافت خواهید کرد.'
			)
		} catch (error) {
			const errorMessage = error?.error?.message || 'خطایی رخ داد.'
			openNotification('error', errorMessage)
		}
	}

	return (
		<div className={styles['page-container']}>
			<div className={styles['form-container']}>
				<h1 className={styles['form-container__title']}>
					فراموشی رمز عبور
				</h1>
				<p className={styles['form-container__subtitle']}>
					ایمیل حساب کاربری خود را وارد کنید تا لینک بازنشانی برای شما
					ارسال شود.
				</p>
				<Form
					name='forgot_password'
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
							{ type: 'email', message: 'ایمیل معتبر نیست!' },
						]}
					>
						<Input placeholder='ایمیل' size='large' />
					</Form.Item>
					<Form.Item>
						<Button
							type='primary'
							htmlType='submit'
							block
							size='large'
							loading={api.isLoading}
						>
							ارسال لینک بازنشانی
						</Button>
					</Form.Item>
				</Form>
			</div>
		</div>
	)
}

export default ForgotPasswordPage
