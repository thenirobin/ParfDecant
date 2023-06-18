import React, { useCallback, useEffect, useState } from "react";
import { Perfume } from "../../components/Perfume/Perfume";
import { useParams } from "react-router-dom";
import { api } from "../../utils/api";
import { useDispatch, useSelector } from "react-redux";
import { fetchChangePerfumeFav } from "../../storage/slices/perfumesSlice";
import { openNotification } from "../../components/Notification/notification";

export const PerfumePage = () => {
    const [perfume, setPerfume] = useState({});
    const {id} = useParams();
    const {data: user} = useSelector(s => s.user);
    const dispatch = useDispatch();

useEffect(()=>{
    if (id) {
        api.getPerfumeById(id).then(data => setPerfume(data));
    }
}, [id])

const onPerfumeLike = useCallback((item, wasLiked) => {
    dispatch(fetchChangePerfumeFav({product: item, wasLiked: wasLiked}))
    if (wasLiked) {
        const filteredLikes = item.likes.filter(e => e !== user?._id);
        setPerfume((s) => ({...s, likes: filteredLikes}));
    } else {
        const addLikes = [...item.likes, user?._id];
        setPerfume((s) => ({...s, likes: addLikes}));
    }
},[user?._id, dispatch])

const sendReview = useCallback(async data => {
    try {
        const result = await api.addPerfumeReview(perfume._id, data);
        setPerfume(() => ({...result}));
        openNotification('success', 'Успешно!', 'Ваш отзыв опубликован.');
    } catch (error) {
        openNotification('error', 'Ошибка!', 'Ваш отзыв не удалось отправить.');
    }
}, [perfume._id])

const onDeleteReview = useCallback(async (id) => {
    api.deletePerfumeReview(perfume._id, id)
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