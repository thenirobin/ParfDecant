import React from 'react';
import './index.css';
import { ReactComponent as Like } from './img/like.svg'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchChangePerfumeFav } from '../../storage/slices/perfumesSlice';


export const Card = ({ name, price, wight, pictures, likes, discount, product, ...args }) => {

    const {data: user} = useSelector(s => s.user);

    const dispatch = useDispatch();

    const isLiked = likes.some(e => e === user._id);
    const handleClick = () => {
        dispatch(fetchChangePerfumeFav({product, wasLiked: isLiked}))
    }
    return (
        <div className='card'>
            <div className='card__sticky card__sticky_type_top-left'>
                {!!discount && <span className='card__discount'>
                    -{discount}%
                </span>}
                {args.tags.map(e => <span className={`tag tag_type_${e}`} key={e}>{e}</span>)}
            </div>
            <div className='card__sticky card__sticky_type_top-right'>

                <button onClick={handleClick} className={`card__favorite ${isLiked ? 'card__favorite_active' : ''}`}>
                    <Like />
                </button>

            </div>
            <Link to={`/perfume/${product._id}`} className='card__link'>
                <img src={pictures } alt="food" className='card__image' />
                <div className='card__desc'>
                    <span className='card__price'>{price}p</span>
                    <span className='card__weight'>{wight}</span>
                </div>
                <p className='card__name'>{name}</p>
            </Link>
            <span className='card__card btn btn_type_primary'>В Корзину</span>
        </div>
    )
}