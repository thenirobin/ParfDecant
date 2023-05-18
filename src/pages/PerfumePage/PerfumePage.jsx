import React, { useContext, useEffect, useState } from "react";
import { Perfume } from "../../components/Perfume/Perfume";
import { useParams } from "react-router-dom";
import { api } from "../../utils/api";
import { CardContext } from "../../context/cardContext";

export const PerfumePage = () => {
    const [perfume, setPerfume] = useState({});
    const {id} = useParams();
    const {user, handleLike} = useContext(CardContext);

useEffect(()=>{
    if (id) {
        api.getProductById(id).then(data => setPerfume(data));
    }
}, [id])

const onPerfumeLike = (item, isLikedProduct) => {
    handleLike(item, isLikedProduct);
    if (isLikedProduct) {
        const filteredLikes = item.likes.filter(e => e !== user?._id);
        setPerfume((s) => ({...s, likes: filteredLikes}));
    } else {
        const addLikes = [...item.likes, user?._id];
        setPerfume((s) => ({...s, likes: addLikes}));
    }
}

    return ( 
        <> {!!Object.keys(perfume).length ? <Perfume perfume={perfume} onPerfumeLike={onPerfumeLike} /> : <div>Loading...</div>}
        </>
    )
}