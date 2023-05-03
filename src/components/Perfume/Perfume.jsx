import React from "react";
import s from './index.module.css';
import { BackNavigate } from "../BackNavigate/BackNavigate";

export const Perfume = ({perfume}) => {
    return (<div className={`${s.perfume} container`}>
        <div className={s.titleWrapper}>
            <BackNavigate />
            <span className={s.perfumeTitle}>{perfume.name}</span>
            <div className={s.rating}>
                <span>ItemNumber</span>
                <span>Rate</span> 
            </div>
        </div>
        <div className={s.imgWrapper}>
            <img className={s.img} src={perfume.pictures}></img>
        </div>
        <div className={s.desc}>
            <span className={s.price}>{perfume.price}&nbsp;₽</span>
        </div>
        <div className={s.desc}>
            <span className={s.price}>Описание</span>
            <p className={s.description}>{perfume.description}</p>
        </div>

    </div>)
}