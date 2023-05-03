import React from "react";
import './index.css'
import { useNavigate } from "react-router-dom";

export const BackNavigate = () => {
    const navigate = useNavigate();
    return ( 
            <span onClick={()=> navigate(-1)} className="nav-back">ᐸ Назад</span>
    )
}