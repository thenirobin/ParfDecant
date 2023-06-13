import React from 'react'
import "./index.css";
import logoDF from '../Logo/logo.svg';
import { Link } from 'react-router-dom';


export const Footer = () => {

    return <div className='footer'>
        <div className='container__footer'>
                <div className='logo-shop-name'>
                    <div className='logo-shop-wrap'>
                        <img src={logoDF} alt='logo'/>
                        <span className='shop-name'>ParfDecant</span>
                    </div>
                    <span className='corps'>© «Интернет-магазин ParfDecant»</span>
                </div>
                <div className='nav__footer'>
                    <span>Каталог</span>
                    <span>Новости</span>
                    <span>Акции</span>
                    <span>Отзывы</span>
                </div>
                <div className='info__footer'>
                    <span>Оплата и доставка</span>
                    <Link to={'/faq'} className='faq__style'>
                        <span>Ответы на вопросы</span>
                    </Link>
                    <span>Обратная связь</span>
                    <span>Контакты</span>
                </div>
                <div className='contacts__footer'>
                    <b>Мы на связи</b>
                    <div className='phone-email'>
                        <p>8 (999) 111 11 11</p>
                        <span>parfdecant.ru@mail.ru</span>
                    </div> 
                </div>
        </div>
    </div>
}