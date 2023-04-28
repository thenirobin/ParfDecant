import React from 'react'
import "./index.css";
import logoDF from '../Logo/logo.svg';


export const Footer = () => {

    return <div className='footer'>
        <div className='container__footer'>
                <div className='logo-shop-name'>
                    <img src={logoDF} alt='logo'/>
                    <span className='shop-name'>ParfDecant</span>
                    <p className='corps'>© «Интернет-магазин ParfDecant»</p>
                </div>
                <div className='nav__footer'>
                    <a href='#'>Каталог</a>
                    <a href='#'>Новости</a>
                    <a href='#'>Акции</a>
                    <a href='#'>Отзывы</a>
                </div>
                <div className='info__footer'>
                    <a href='#'>Оплата и доставка</a>
                    <a href='#'>Ответы на вопросы</a>
                    <a href='#'>Обратная связь</a>
                    <a href='#'>Контакты</a>
                </div>
                <div className='contacts__footer'>
                    <b>Мы на связи</b>
                    <div className='phone-email'>
                        <p>8 (999) 111 11 11</p>
                        <p>parfdecant.ru@mail.ru</p>
                    </div> 
                </div>
        </div>
    </div>
}