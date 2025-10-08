import { Outlet } from 'react-router-dom'
import Header from './components/Header/Header.jsx'
import Footer from './components/Footer/Footer.jsx'
import styles from './MainLayout.module.css'

const MainLayout = () => {
	return (
		<div className={styles.layout}>
			<Header />
			<main className={styles['layout__main-content']}>
				<Outlet />
			</main>
			<Footer />
		</div>
	)
}

export default MainLayout
