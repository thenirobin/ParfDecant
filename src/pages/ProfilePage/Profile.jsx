import React, { useCallback, useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser, updateUser } from "../../storage/slices/userSlice";
import './style.css'
import { useForm } from "react-hook-form";

export const ProfilePage = () => {
    const dispatch = useDispatch();
    const {data: user} = useSelector(s => s.user)
    
    useEffect(()=>{
        dispatch(getUser());
    },[dispatch])

    const { register, handleSubmit, reset} = useForm({mode: "onBlur"});

    const sendData = (data) => {
        dispatch(updateUser(data));
        reset();
    }
    return ( 
        <> 
        {!user?._id ? 'not auth' : <div className="profile">
            <div>
                <form className="form__style" onSubmit={handleSubmit(sendData)}>
                    <div>
                        <input className="form__input" type="text" {...register("name")} placeholder="Имя" defaultValue={user.name}/>
                    </div>
                    <div className="form__pass">
                        <input className="form__input" type="text" {...register("about")} placeholder="Обо мне" defaultValue={user.about}/>
                    </div>
                    <button className="profile__button" type="submit">Отправить</button>
                </form>
            </div>
            <div>
                <form className="form__style" onSubmit={handleSubmit(sendData)}>
                    <img src={user?.avatar} className="profile__avatar" alt="" />
                    <div>
                        <input className="form__input" type="text" {...register("avatar")} placeholder="Ссылка для нового аватара"/>
                    </div>
                    <button className="profile__button" type="submit">Отправить</button>
                </form>
            </div>
            <div>
            </div>
        </div>}
        </>
    )
}