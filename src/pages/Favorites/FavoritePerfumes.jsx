import React from "react";
import './index.css'
import { BackNavigate } from "../../components/BackNavigate/BackNavigate";
import { CardList } from "../../components/CardList/cardList";
import { useSelector } from "react-redux";

export const FavoritePerfumes = () => {
    const {favorites} = useSelector(s => s.perfumes);
    return ( 
        <div className="favorites">
            <BackNavigate />
            <h1 className="fav__title">Избранное</h1>
            <CardList cards={favorites}/>
        </div>
    )
}