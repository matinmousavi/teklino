import { Routes, Route } from 'react-router-dom'
import Header from './components/Header/Header.jsx'
import Footer from './components/Footer/Footer.jsx'
import HomePage from './pages/HomePage/HomePage.jsx'
import ProductsPage from './pages/ProductsPage/ProductsPage.jsx'

const App = () => {
	return (
		<div>
			<Header />
			<main>
				<Routes>
					<Route path='/' element={<HomePage />} />
					<Route path='/products' element={<ProductsPage />} />
				</Routes>
			</main>
			<Footer />
		</div>
	)
}

export default App
