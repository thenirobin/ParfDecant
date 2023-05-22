import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import './formStyle.css';



export const RegistrateForm = ({ isRequired = true }) => {
    
    const [type, setType] = useState(true);
    // const [tags, setTags] = useState('');

    const { register, handleSubmit, formState: { errors } } = useForm({mode: "onBlur"});

    const sendData = (data) => {
        const newData = data.tags.split(' ');
        const sendedData = {...data, tags: data.tags.split(' ')}
        ({ data })
    }

    const nameRegister = {
                required: {
                    value: isRequired,
                    message: 'Имя тоже обязательно!'
                },
                maxLength: { value: 7, message: '7 is max' },
                minLength: { value: 2, message: '2 is min' },
            }
            const emailRegister = { required: 'Имя тоже обязательно!' }
            const passwordRegister = {
                required: {
                    value: isRequired,
                    message: 'Пароль обязателен!'
                },
                pattern: {
                    value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                    message: 'Пароль должен содержать минимум 8 символов, одну большую букву латинского алфавита и одну цифру'
                }
            }

    return (
    <div>
        <h3>Регистрация</h3>
        <form className="form__style" onSubmit={handleSubmit(sendData)}>
            <div>
                <input className="form__input" type="text" {...register("name", nameRegister)} placeholder="Ваше имя" />
                {errors?.name && <span> {errors?.name.message}</span>}
            </div>
            <div>
                <input className="form__input" type="text" {...register("email", { ...emailRegister })} placeholder="mail@example.com" />
                {errors?.email && <span> {errors?.email.message}</span>}
            </div>
            <div className="form__pass">
                <input className="form__input" type={!type ? 'password' : 'text'} {...register("password", { ...passwordRegister })} placeholder="Введите пароль" />
                <span onClick={() => setType(!type)} className={`form__pass__icon`}>{type ? '0' : 'X'}</span>
                {errors?.password && <span> {errors?.password.message}</span>}
            </div>
            <div>
                <Link  to={'/login'}>Авторизация</Link>
            </div>
                {/* <label htmlFor="tags">Введите теги через запятую / слеш / пробел</label> */}
                {/* <input type="text" {...register("tags")} placeholder="tags" /> */}
                {/* <textarea {...register("tags2")}  placeholder="tags2" cols="30" rows="10" onChange={(e)=>setTags(e.target.value)} ></textarea> */}
                {/* <select></select> */}
                <button type="submit"> submit</button>
        </form>
    </div>
    )
}