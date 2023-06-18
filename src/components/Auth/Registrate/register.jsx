import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { api } from "../../../utils/api";
import '../index.css'
import { openNotification } from "../../Notification/notification";

export const emailRegister = { required: 'Почта обязательна!' };
export const passwordRegister = {
    required: {
        value: true,
        message: 'Пароль обязателен!'
    },
    pattern: {
        value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
        message: 'Пароль должен содержать минимум 8 символов, одну большую букву латинского алфавита и одну цифру'
    }
};

export const RegisterForm = () => {
    
    const [type, setType] = useState(true);

    const { register, handleSubmit, formState: { errors } } = useForm({mode: "onBlur"});

    const sendData = async (data) => {
        try {
            await api.signUp(data);
            openNotification('success', 'Успешно!', 'Вы зарегистрировались!');
        } catch (error) {
            alert('Ooooops')
        }
    }
    return (
    <div>
        <h3>Регистрация</h3>
        <form className="form__style" onSubmit={handleSubmit(sendData)}>
            <div>
                <input className="form__input" type="text" {...register("email", { ...emailRegister })} placeholder="email@example.com" />
                {errors?.email && <span> {errors?.email.message}</span>}
            </div>
            <div>
                <input className="form__input" type="number" {...register("group")} placeholder="group" />
                {errors?.group && <span> {errors?.group.message}</span>}
            </div>
            <div className="form__pass">
                <input className="form__input" type={!type ? 'password' : 'text'} {...register("password", { ...passwordRegister })} placeholder="password" />
                <span onClick={() => setType(!type)} className={`form__pass__icon`}>{type ? '0' : 'X'}</span>
                {errors?.password && <span> {errors?.password.message}</span>}
            </div>
            <div>
                <Link to={'/login'}>Уже есть аккаунт? Войти</Link>
            </div>
                <button className='button__auth' type="submit">Зарегистрироваться</button>
        </form>
    </div>
    )
}
