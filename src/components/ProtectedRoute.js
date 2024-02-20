import React from 'react'
import { UserAuth } from '../Context/AuthContext'
import { useNavigate } from 'react-router-dom';
const ProtectedRoute = ({children}) => {
   const navigate=useNavigate();
    const{user}=UserAuth();
    if(!user){
        return navigate("/");
    }
    else{
        return children;
    }
}

export default ProtectedRoute;
