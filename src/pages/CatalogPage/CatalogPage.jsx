import React, { useContext } from "react";
import { CardList } from "../../components/cardList/cardList";
import './index.css';
import { CardContext } from "../../context/cardContext";
import { CHEAPEST, EXPENSIVE, NEWEST, POPULAR, RATE, SALE } from "../../constants/constants";
import { getEnding } from "../../utils/utils";


export const CatalogPage = () => {
    const getRightFound = (numb) => {
        if (numb === 1) {
            return 'найден'
        } else {
            return 'найдено'
        }
    }
    const {cards, search, onSort} = useContext(CardContext);

    const sortedCards = [{id: POPULAR}, {id: SALE}, {id: RATE}, {id: NEWEST}, {id: CHEAPEST}, {id: EXPENSIVE}]
    return ( 
    <>
        {!!search && <p className="search">По запросу <b>{search}</b> {getRightFound(cards.length)} {cards.length} {getEnding(cards.length)}</p>}
        <div className="sort-cards">
        {sortedCards.map(e =>
                    <span className='sort-item' key={e.id} onClick={() => onSort(e.id)}>{e.id}</span>
                )}
        </div>
        <CardList cards={cards} />
    </>
    )
}