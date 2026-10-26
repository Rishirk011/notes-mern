import styles from '../notePage/notePage.module.css';

const NotePage = () => {

    return (
        
        <div className={styles.container}>
            
            <div className={styles.header}>
            
                <textarea placeholder='Title' className={styles.inputHead}>

                </textarea>
            
            </div>

            <div className={styles.body}>

                <textarea placeholder='body' className={styles.inputBody}>

                </textarea>
               
            </div>

        </div>
    
    )

}

export default NotePage;