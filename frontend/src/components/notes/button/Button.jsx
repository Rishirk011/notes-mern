
const Button = ({onClick,style,children}) => {

    return (

        <>

            <div>


                <button onClick={onClick} className={style}>
                
                    {children}
                
                </button>

            </div>

        </>


    )

}

export default Button;