import React, { useEffect, useState } from "react";
import { Perfume } from "../../components/Perfume/Perfume";
import { useParams } from "react-router-dom";
import { api } from "../../utils/api";

export const PerfumePage = () => {
    const [perfume, setPerfume] = useState({});
    const {id} = useParams();

useEffect(()=>{
    if (id) {
        api.getProductById(id).then(data => setPerfume(data));
    }
}, [id])

    return ( 
        <Perfume perfume={perfume} />
    )
}