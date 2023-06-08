import React, { useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser, updateUser } from "../../storage/slices/userSlice";
import './style.css'
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export const ProfilePage = ({setModalActive}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {data: user} = useSelector(s => s.user);
    
    useEffect(()=>{
        dispatch(getUser());
    },[dispatch])

    const { register, handleSubmit, reset} = useForm({mode: "onBlur"});

    const sendData = (data) => {
        dispatch(updateUser(data));
        reset();
    }

    const logout = () => {
        localStorage.removeItem('token');
        setModalActive(true);
        navigate('/login');
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
                    <button className="profile__button" onClick={logout}>Выйти</button>
                </form>
            </div>
            <div>
            </div>
        </div>}
        </>
    )
}