import React, { useState } from "react";
import { Rating } from "../Rating/rating";
import { useForm } from "react-hook-form";
import s from './index.module.css'
import { ReactComponent as Trash} from '../Perfume/img/trash.svg'
import { useSelector } from "react-redux";

const dateOptions = {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
}
export const Reviews = ({ onSendReview, reviews, onDeleteReview }) => {
    const {data: userData} = useSelector(s => s.user);
    const [showForm, setShowForm] = useState(false);
    const { register, handleSubmit, reset } = useForm({mode: "onBlur"});
    const [rate, setRate] = useState(3);

    const reviewRegister = {
        required: {
            value: true,
            message: 'Обязательное поле для заполнения'
        }
    }

    const onSendFormReview = ({ text }) => {
        onSendReview({ text, rating: rate });
        reset();
        setShowForm(false);
    }

    return(<>
    <div className={s.reviews}>
            <div className={s.reviews__controls}>
                <span className={s.price}>Отзывы</span>
                <button onClick={() => setShowForm(true)} className={s.button__review}>Оставьте отзыв</button>
            </div>
            { showForm && 
            <form className={s.reviews__form} onSubmit={handleSubmit(onSendFormReview)}>
                <Rating rating={rate} setRate={setRate} isEditable={true}/>
                <textarea {...register("text", { ...reviewRegister })} type='text' placeholder='Напишите свой отзыв'  className='form__review'/>
                <button type='submit' className={s.button__review}>Опубликовать</button>
            </form>}
            <div className={s.reviews__list}>
                <div className={s.reviews__hr} />
                {reviews.sort((a,b) => new Date(b.updated_at) - new Date(a.updated_at)).map((e) => <div key={e._id}> <div className={s.reviews__item}> 
                    <div className={s.reviews__author}>
                        <span>{e.author.name}</span>
                        <span className={s.reviews__date}>{new Date(e.created_at).toLocaleString('ru-RU', dateOptions)}</span>
                        {userData?._id === e.author._id &&
                        <Trash onClick={() => onDeleteReview(e._id)} className={s.reviews__trash}/>
                        }
                        </div>
                    <div className={s.rate}>                
                        <Rating rating={e.rating}/>
                    </div>
                    <div className={s.text}>{e.text}</div>
                </div>
                <div className={s.reviews__hr} /> </div>
                )}
            </div>
        </div>
    </>)
}