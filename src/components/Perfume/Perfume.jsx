import React, { useEffect, useState } from "react";
import s from './index.module.css';
import { BackNavigate } from "../BackNavigate/BackNavigate";
import { getEnding, perfumeRating } from "../../utils/utils";
import truck from './img/Truck.svg'
import { ReactComponent as Heart} from '../Card/img/like.svg';
import cn from 'classnames';
import { Rating } from "../Rating/rating";
import { Reviews } from "../Reviews/reviews";
import { useSelector } from "react-redux";


export const Perfume = ({perfume, onPerfumeLike, sendReview, onDeleteReview}) => {

    const {data: user} = useSelector(s => s.user);
    const [isLikedProduct, setIsProductLike] = useState(false);

    const getDiscountPrice = (discount, price) => {
        return Math.floor(price * (1 - discount/100)).toFixed(0)
    }

    useEffect(() => {
        const isLiked = perfume.likes.some(e => e === user?._id);
        setIsProductLike(isLiked);
    },[perfume.likes, user])

    const handleClick = () => {
        onPerfumeLike(perfume, isLikedProduct);
    }


    const onSendReview = (data) => {
        sendReview(data);
    }

    return (<div className={`${s.perfume} container`}>
        <div className={s.titleWrapper}>
            <BackNavigate />
            <span className={s.perfumeTitle}>{perfume.name}</span>
            <div className={s.rating}>
                {/* <span>ItemNumber </span> */}
                <Rating rating={perfumeRating(perfume.reviews)}/>
                <span>{perfume.reviews.length} {getEnding(perfume.reviews.length, 'отзыв')}</span> 
            </div>
        </div>
        <div className={s.productInfo}>
            <div className={s.imgWrapper}>
                <img className={s.img} src={perfume.pictures} alt=''></img>
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
        <Reviews onDeleteReview={onDeleteReview} onSendReview={onSendReview} reviews={perfume.reviews} />
    </div>
    )
}