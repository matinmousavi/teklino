import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { App as AntdAppProvider, ConfigProvider } from 'antd'
import { CartProvider } from './context/CartContext.jsx'
import App from './App.jsx'
import './index.css'

const theme = {
	token: {
		fontFamily: 'Vazirmatn, sans-serif',
	},
	components: {
		Notification: {
			fontSizeLG: 14,
			fontSize: 14,
		},
	},
}
ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<BrowserRouter>
			<ConfigProvider theme={theme} direction='rtl'>
				<AntdAppProvider>
					<CartProvider>
						<App />
					</CartProvider>
				</AntdAppProvider>
			</ConfigProvider>
		</BrowserRouter>
	</React.StrictMode>
)
