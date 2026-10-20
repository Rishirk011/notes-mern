import { Link } from 'react-router-dom';
import styles from '../navbar/navbar.module.css';
import useAuthStore from '../../../store/AuthStore';
import { useNavigate } from 'react-router-dom';
export default function Navbar() {
    
    const {logOut} = useAuthStore();
    const navigate = useNavigate();
    const logoutUser = () => {
        logOut();   
        navigate('/login');
    }
    return (
        <nav className={styles.navbar}>
            <h1 className={styles.title}>
                Navbar
            </h1>
            <div className={styles.links}>
                <Link to="/" className={styles.link}>
                    Home
                </Link>
                <Link to="/notes" className={styles.link}>
                    Notes
                </Link>
                <button onClick={logoutUser} className={styles.navBtn}>
                    Log-out
                </button>
            </div>
        </nav>
    );
}