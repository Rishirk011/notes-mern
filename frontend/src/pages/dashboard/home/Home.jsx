import { useState } from "react";
import NotePage from "../../../components/notes/notePage/NotePage";
import styles from '../../dashboard/home/home.module.css';
import Button from "../../../components/notes/button/Button";
import NoteList from "../../../components/notes/noteList/NoteList";

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
            
            <NoteList title={"maskooth halwa"}/>

            {button}

        </div>


    </>

}

export default Home;

