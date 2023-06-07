import React, { useContext } from "react";
import { CardList } from "../../components/cardList/cardList";
import './index.css';
import { CardContext } from "../../context/cardContext";
import { CHEAPEST, EXPENSIVE, NEWEST, POPULAR, RATE, SALE } from "../../constants/constants";
import { getEnding } from "../../utils/utils";
import { useDispatch, useSelector } from "react-redux";
import { sortedPerfumes } from "../../storage/slices/perfumesSlice";


export const CatalogPage = () => {
    const getRightFound = (numb) => {
        if (numb === 1) {
            return 'найден'
        } else {
            return 'найдено'
        }
    }
    const {search} = useContext(CardContext);

    const {perfumes} = useSelector(s => s.perfumes);

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