import { useState } from "react";
import NotePage from "../../../components/notes/notePage/NotePage";
import styles from '../../dashboard/home/home.module.css';
import Button from "../../../components/notes/button/Button";

const Home = () => {

    const[isOpen,setIsOpen] = useState(false);

    const toggleOpen = () => {
        setIsOpen(!open);
    }

    const button = <Button onClick={()=>setIsOpen(!isOpen)} style={styles.btn}>
        
            {isOpen ? "Close" : "Add a Note"}
        
        </Button>

    if (isOpen) {
        
        return (
            
            <div>
                
                <NotePage/>
                
                {button}

            </div>
        
    )


    }
    
    return <>
        
        <div>
            
            {button}

        </div>


    </>

}

export default Home;

