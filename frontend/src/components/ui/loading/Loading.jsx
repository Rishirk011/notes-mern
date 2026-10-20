import styles from '../loading/loading.module.css';

export default function Spinner() {
    return (
        <div className={styles.container}>
            <div className={styles.spinner} />
        </div>
    );
}