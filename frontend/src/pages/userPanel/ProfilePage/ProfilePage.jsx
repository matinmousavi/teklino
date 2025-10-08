import { useAuth } from '../../../context/AuthContext'
import styles from './ProfilePage.module.css'

const ProfilePage = () => {
	const { user } = useAuth()
	return (
		<div className={styles['profile-page']}>
			<h1>سلام، {user.name}!</h1>
			<p>به پنل کاربری خود در تکلینو خوش آمدید.</p>
		</div>
	)
}

export default ProfilePage
