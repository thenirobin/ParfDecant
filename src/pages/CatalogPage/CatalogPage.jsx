import React, { useContext } from "react";
import { CardList } from "../../components/cardList/cardList";
import './index.css';
import { CardContext } from "../../context/cardContext";
import { CHEAPEST, EXPENSIVE, NEWEST, POPULAR, RATE, SALE } from "../../constants/constants";


export const CatalogPage = () => {
    const getRightWordsEnd = (numb) => {
        const tmp = numb % 10;
        if ((numb > 10 && numb < 15) || (tmp > 5) || (!numb) || (tmp === 0)) {
            return ' товаров'
        }
        if (tmp === 1) {
            return ' товар'
        }
        if (tmp > 1 && tmp < 5) {
            return ' товара'
        }
    }
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
        {!!search && <p className="search">По запросу <b>{search}</b> {getRightFound(cards.length)} {cards.length} {getRightWordsEnd(cards.length)}</p>}
        <div className="sort-cards">
        {sortedCards.map(e =>
                    <span className='sort-item' key={e.id} onClick={() => onSort(e.id)}>{e.id}</span>
                )}
        </div>
        <CardList cards={cards} />
    </>
    )
}