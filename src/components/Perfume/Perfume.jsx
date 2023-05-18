import React, { useContext, useEffect, useState } from "react";
import s from './index.module.css';
import { BackNavigate } from "../BackNavigate/BackNavigate";
import { CardContext } from "../../context/cardContext";
import { getEnding } from "../../utils/utils";
import truck from './Truck.svg'
import { ReactComponent as Heart} from '../Card/img/like.svg';
import cn from 'classnames';

const dateOptions = {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
}

export const Perfume = ({perfume, onPerfumeLike}) => {

    const {perfumeRating, user, handleLike} = useContext(CardContext);
    const [isLikedProduct, setIsProductLike] = useState(false);
    const [showForm, setShowForm] = useState(false);

    const getDiscountPrice = (discount, price) => {
        return Math.floor(price * (1 - discount/100)).toFixed(0)
    }

    useEffect(() => {
        const isLiked = perfume.likes.some(e => e === user?._id);
        setIsProductLike(isLiked);
    },[perfume.likes, user])

    const handleClick = () => {
        onPerfumeLike(perfume, isLikedProduct);
        // setIsProductLike(!isLikedProduct)
    }

    const handleSubmit = () => {

    }

    return (<div className={`${s.perfume} container`}>
        <div className={s.titleWrapper}>
            <BackNavigate />
            <span className={s.perfumeTitle}>{perfume.name}</span>
            <div className={s.rating}>
                <span>ItemNumber </span>
                <span>XXXXX </span> <span>{perfume.reviews.length} {getEnding(perfume.reviews.length, 'отзыв')}</span> 
            </div>
        </div>
        <div className={s.productInfo}>
            <div className={s.imgWrapper}>
                <img className={s.img} src={perfume.pictures}></img>
            </div>
            <div className={s.desc}>
                <span className={`${s.price} ${!!perfume.discount ? s.oldPrice : ''}`}>{perfume.price}&nbsp;₽</span>
                {!!perfume.discount &&
                <span className={`${s.price} ${!!perfume.discount ? s.newPrice : ''}`}>{getDiscountPrice(perfume.discount, perfume.price)}&nbsp;₽</span>
                }
                <div className={s.controls}>
                    <div className={s.controls__cart__left}>
                        <span className={s.controls__minus}>-</span>
                        <span className={s.controls__num}>0</span>
                        <span className={s.controls__plus}>+</span>
                    </div>
                    <button className={s.button__cart}>В корзину</button>
                </div>
                <button className={cn(s.favorite, {[s.favoriteActive]: isLikedProduct})} onClick={handleClick}>
                    <Heart />
                    <span>{isLikedProduct ? 'В избранном' : 'В избранное'}</span>
                </button>
                <div className={s.delivery}>
                    <img src={truck} alt="truck"></img>
                    <div>
                        <b className={s.desc}>Доставка по всему Миру!</b>
                        <p className={s.text}>Доставка курьером - от 399₽</p>
                        <p className={s.text}>Доставка в пункт выдачи - от 199₽</p>
                    </div>
                </div>
            </div>
        </div>
        <div className={s.desc}>
            <span className={s.price}>Описание</span>
            <p className={s.description}>{perfume.description}</p>
        </div>
        <div className={s.desc}>
            <span className={s.price}>Характеристики</span>
            <p className={s.description}></p>
        </div>
        <div className={s.reviews}>
            <span className={s.price}>Отзывы</span>
            <button onClick={() => setShowForm(true)} className={s.button__cart}>Оставьте отзыв</button>
            { showForm && <form className='form__style' onSubmit={handleSubmit}>
                <textarea name='review' type='text' placeholder='Напишите свой отзыв'  className='form__review'/>
                <button type='submit'>Send</button>
            </form>}
            <div className={s.reviews__list}>
                <div className={s.reviews__hr} />
                {perfume.reviews.map((e) => <div key={e._id}> <div className={s.reviews__item}> 
                    <div className={s.reviews__author}>
                        <span>{e.author.name}</span>
                        <span className={s.reviews__date}>{new Date(e.created_at).toLocaleString('ru-RU', dateOptions)}</span>
                    </div>
                    <div className={s.rate}>{new Array(e.rating ?? 1).fill('x')}</div>
                    <div className={s.text}>{e.text}</div>
                </div>
                <div className={s.reviews__hr} /> </div>
                )}
            </div>
        </div>
    </div>
    )
}