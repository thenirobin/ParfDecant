import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../../../utils/api";
import '../index.css'
import { emailRegister } from "../Registrate/register";
import { openNotification } from "../../Notification/notification";

export const LoginForm = () => {
    
    const [type, setType] = useState(true);
    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors } } = useForm({mode: "onBlur"});

    const sendData = async (data) => {
        try {
            const res = await api.signIn(data);
            localStorage.setItem('token', res.token);
            navigate('/');
            openNotification('success', 'Успешно!', 'Вы успешно вошли в свой аккаунт.');
        } catch (error) {
            openNotification('error', 'Ошибка!', 'Неправильный логин или пароль.');
        }
    };

    return (
    <div>
        <h3>Вход на сайт</h3>
        <form className="form__style" onSubmit={handleSubmit(sendData)}>
            <div>
                <input className="form__input" type="text" {...register("email", { ...emailRegister })} placeholder="email" />
                {errors?.email && <span> {errors?.email.message}</span>}
            </div>
            <div className="form__pass">
                <input className="form__input" type={!type ? 'password' : 'text'} {...register("password")} placeholder="password" />
                <span onClick={() => setType(!type)} className={`form__pass__icon`}>{type ? '0' : 'X'}</span>
                {errors?.password && <span> {errors?.password.message}</span>}
            </div>
            <div className="auth__links">
                <Link className="auth__link" to={'/registrate'}>Регистрация</Link>
                <Link className="auth__link" to={'/reset-password'}>Забыли пароль?</Link>
            </div>
                {/* <label htmlFor="tags">Введите теги через запятую / слеш / пробел</label> */}
                <button className="button__auth" type="submit">Войти</button>
        </form>
    </div>
    )
}
