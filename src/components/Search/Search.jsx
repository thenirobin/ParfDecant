import { useDispatch } from 'react-redux'
import './index.css'
import { setSearch } from '../../storage/slices/perfumesSlice';

export const Search = () => {

    const dispatch = useDispatch();
    return (
        <input
            className="search__input"
            placeholder="search.."
            onChange={(e) => dispatch(setSearch(e.target.value))}
        />
    )
}