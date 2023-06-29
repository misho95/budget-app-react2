import { Navigate } from "react-router-dom";

function Authenication( {children} ){

    const isUserValid = false;

    if(!isUserValid){
        return (
            <Navigate to="/login" />
        )
    }

    return(
        isUserValid && children
    )
}

export default Authenication;