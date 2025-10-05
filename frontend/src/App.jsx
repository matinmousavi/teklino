import Header from './components/Header/Header.jsx'
import Footer from './components/Footer/Footer.jsx'
import HomePage from './pages/HomePage/HomePage.jsx'

const App = () => {
	return (
		<div>
			<Header />
			<main>
				<HomePage />
			</main>
			<Footer />
		</div>
	)
}

export default App
