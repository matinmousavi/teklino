import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import Header from './components/Header/Header.jsx'
import Footer from './components/Footer/Footer.jsx'
import HomePage from './pages/HomePage/HomePage.jsx'
import ProductsPage from './pages/ProductsPage/ProductsPage.jsx'
import ProductDetailPage from './pages/ProductDetailPage/ProductDetailPage.jsx'

const App = () => {
	return (
		<div>
			<Header />
			<main>
				<Routes>
					<Route path='/' element={<HomePage />} />
					<Route path='/products' element={<ProductsPage />} />
					<Route
						path='/products/:productId'
						element={<ProductDetailPage />}
					/>
				</Routes>
			</main>
			<Footer />
			<ToastContainer
				position='bottom-left'
				autoClose={3000}
				theme='colored'
				limit={3}
				rtl
			/>
		</div>
	)
}

export default App
