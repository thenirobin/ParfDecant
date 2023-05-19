import React, { useCallback, useContext, useEffect, useState } from "react";
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

const onPerfumeLike = useCallback(async (item, isLikedProduct) => {
    const wasLiked = await handleLike(item, isLikedProduct);
    if (wasLiked) {
        const filteredLikes = item.likes.filter(e => e !== user?._id);
        setPerfume((s) => ({...s, likes: filteredLikes}));
    } else {
        const addLikes = [...item.likes, user?._id];
        setPerfume((s) => ({...s, likes: addLikes}));
    }
},[handleLike, user?._id])

const sendReview = useCallback(async data => {
        const result = await api.addProductReview(perfume._id, data);
        setPerfume(() => ({...result}));
}, [perfume._id])
const onDeleteReview = useCallback(async (id) => {
    api.deleteProductReview(perfume._id, id)
        .then(data => setPerfume(() => ({...data})))
        .catch(() => {})
}, [perfume._id])

    return ( 
        <> {!!Object.keys(perfume).length 
            ? <Perfume perfume={perfume} onPerfumeLike={onPerfumeLike} sendReview={sendReview} onDeleteReview={onDeleteReview}/> 
            : <div>Loading...</div>}
        </>
    )
}