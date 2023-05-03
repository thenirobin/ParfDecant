import React, { useContext } from "react";
import './index.css'
import { BackNavigate } from "../../components/BackNavigate/BackNavigate";
import { CardList } from "../../components/cardList/cardList";
import { CardContext } from "../../context/cardContext";

export const FavoritePerfumes = () => {
    const {favorites} = useContext(CardContext);
    return ( 
        <div className="favorites">
            <BackNavigate />
            <h1 className="fav__title">Избранное</h1>
            <CardList cards={favorites}/>
        </div>
    )
}