import styles from '../noteList/noteList.module.css';

const NoteList = ({title,toggleList,remove}) => {

    return (
        
        <div className={styles.note}>

            <div className={styles.content}>
                <h3>{title}</h3>
            </div>
            
            <div className={styles.buttons}>

                <button className={styles.toggleBtn} onclick={toggleList}>
                    Open
                </button>

                <button className={styles.removeBtn} onclick={remove}>
                    Remove
                </button>

            </div>
            

        </div>

    )

} 



export default NoteList;