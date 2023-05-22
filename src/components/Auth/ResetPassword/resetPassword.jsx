import React, { useState } from "react";
import '../index.css'
import { useForm } from "react-hook-form";
import { emailRegister, passwordRegister } from "../Registrate/register";
import { Link } from "react-router-dom";
import { api } from "../../../utils/api";

export const ResetPassword = () => {
    const [haveToken, setHaveToken] = useState(false);

    const { register, handleSubmit, formState: { errors } } = useForm({mode: "onBlur"});

    const sendData = async (data) => {
        if (data.token) {
            try {
                const res = await api.resetPasswordWithToken(data.token, {password: data.password});
                localStorage.setItem('token', res.token);
            } catch (error) {
                alert('Ooooops')
            }
        } else {
            try {
                await api.resetPassword(data);
                setHaveToken(true);
            } catch (error) {
                alert('Ooooops')
            }
        }
    }

    return (<>
    <div>
        <h3>Восстановление пароля</h3>
        <form className="form__style" onSubmit={handleSubmit(sendData)}>
            <div>
                <input className="form__input" type="text" {...register("email", { ...emailRegister })} placeholder="email@example.com" />
                {errors?.email && <span> {errors?.email.message}</span>}
            </div>
            {haveToken ?<>
                <div>
                    <input className="form__input" type="text" {...register("token")} placeholder="token" />
                    {errors?.token && <span> {errors?.token.message}</span>}
                </div>
                <div>
                    <input className="form__input" type="password" {...register("password", passwordRegister)} placeholder="password" />
                    {errors?.password && <span> {errors?.password.message}</span>}
                </div>
            </> : <></>}
            <div>
                <Link  to={'/login'}>Я вспомнил пароль</Link>
            </div>
                <button type="submit"> Восстановить пароль</button>
        </form>
    </div>
    </>)
}