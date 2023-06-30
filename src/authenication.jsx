import { Navigate } from "react-router-dom";
import { useState } from "react";

function Authenication( {children} ){

    const userSigned = localStorage.getItem('ID');

    if(!userSigned){
        return (
            <Navigate to="/signin" />
        )
    }

    return(
        userSigned && children
    )
}

export default Authenication;