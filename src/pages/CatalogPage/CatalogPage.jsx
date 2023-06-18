import React from "react";

import './index.css';
import { CHEAPEST, EXPENSIVE, NEWEST, POPULAR, RATE, SALE } from "../../constants/constants";
import { getEnding } from "../../utils/utils";
import { useDispatch, useSelector } from "react-redux";
import { sortedPerfumes } from "../../storage/slices/perfumesSlice";
import { CardList } from "../../components/CardList/cardList";


export const CatalogPage = () => {
    const getRightFound = (numb) => {
        if (numb === 1) {
            return 'найден'
        } else {
            return 'найдено'
        }
    }

    const {perfumes, search} = useSelector(s => s.perfumes);

    const dispatch = useDispatch();

    const sortedCards = [{id: POPULAR}, {id: SALE}, {id: RATE}, {id: NEWEST}, {id: CHEAPEST}, {id: EXPENSIVE}]
    return ( 
    <>
        {!!search && <p className="search">По запросу <b>{search}</b> {getRightFound(perfumes.length)} {perfumes.length} {getEnding(perfumes.length)}</p>}
        <div className="sort-cards">
        {sortedCards.map(e =>
                    <span className='sort-item' key={e.id} onClick={() => dispatch(sortedPerfumes(e.id))}>{e.id}</span>
                )}
        </div>
        <CardList cards={perfumes} />
    </>
    )
}