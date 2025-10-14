import { App } from 'antd'

const useNotification = () => {
	const { notification } = App.useApp()

	const openNotification = (
		type,
		message,
		description = '',
		options = {}
	) => {
		if (!notification || typeof notification[type] !== 'function') {
			console.error(
				'Notification context is not available or type is invalid.'
			)
			return
		}

		notification[type]({
			message,
			description,
			placement: 'bottomLeft',
			...options,
		})
	}

	return { openNotification }
}

export default useNotification
