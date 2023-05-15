import React, { useState } from "react";
import './formStyle.css';

export const Form = () => {
    const [contactInfo, setContactInfo] = useState({
        name: '',
        lastName: '',
        email: '',
        phone: ''
    });
    
    // const sendData = (data) => {
    // }
    
    const handleSubmit = (e) => {
        e.preventDefault();
        sendData(contactInfo);
    }
    const handleChange = (e) => {
        setContactInfo((state) => ({...state, [e.target.name]: e.target.value}))
    }

    return (
        <div className='incontent'>
            <form className='form__style' onSubmit={handleSubmit}>
                <input name='name' type='text' value={contactInfo.name} placeholder='Ivan' onChange={handleChange} className='form__input'/>
                <input name='lastName' type='text' value={contactInfo.lastName} placeholder='Donskoy' onChange={handleChange} className='form__input'/>
                <input name='phone' type='number' value={contactInfo.phone} placeholder='+7 (123) 456-78-90' onChange={handleChange} className='form__input'/>
                <input name='email' type='text' value={contactInfo.email} placeholder='example@xx.ru' onChange={handleChange} className='form__input'/>
                <button type='submit'>Send</button>
            </form>
        </div>
    )
}