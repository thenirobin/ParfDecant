import './App.css';
import { Header } from './components/Header/header';
import { Footer } from './components/Footer/footer';
import './index.css'
import { useState, useEffect } from 'react';
import { api } from "./utils/api";
import { useDebounce } from "./hooks/hooks";
import { CatalogPage } from './pages/CatalogPage/CatalogPage';
import { PerfumePage } from './pages/PerfumePage/PerfumePage';
import { Route, Routes } from 'react-router-dom';
import { FavoritePerfumes } from './pages/Favorites/FavoritePerfumes';
import {UserContext} from './context/userContext'
import { CardContext } from './context/cardContext';
import { filteredCards, findFav } from './utils/utils';
import { CHEAPEST, EXPENSIVE, NEWEST, POPULAR, RATE, SALE } from './constants/constants';

function App() {
  const [cards, setCards] = useState([]);
  const [search, setSearch] = useState(undefined);
  const [user, setUser] = useState({});
  const [favorites, setFavorites] = useState([]);
  // const [auth, setAuth] = useState(true);


  const debounceValueInApp = useDebounce(search)

  const handleProductLike = async (product, wasLiked) => {
    const updatedCard = await api.changeProductLike(product._id, wasLiked);
    const index = cards.findIndex(e => e._id === updatedCard._id);
    if (index !== -1) {
      setCards(state => [...state.slice(0, index), updatedCard, ...state.slice(index + 1)])
    }
    wasLiked 
    ? setFavorites((state) => state.filter(f => f._id !== updatedCard._id))
    : setFavorites((state) => [updatedCard, ...state])
  }

  const perfumeRating = (reviews) => {
    if (!reviews || !reviews.length) {
      return 0;
    }
    const sum = reviews.reduce((acc, el)=>acc += el.rating, 0);
    return sum / reviews.length
  }


  const onSort = (sortId) => {
    let newCards;
    switch (sortId) {
      case POPULAR:
        newCards = cards.sort((a,b) => b.likes.length - a.likes.length);
        setCards([...newCards]);
        return
      case NEWEST: 
        newCards = cards.sort((a,b) => new Date(b.created_at) - new Date(a.created_at));
        setCards([...newCards]);
        return
      case CHEAPEST:
        newCards = cards.sort((a,b) => a.price - b.price);
        setCards([...newCards]);
        return
      case EXPENSIVE:
        newCards = cards.sort((a,b) => b.price - a.price);
        setCards([...newCards]);
        return
      case SALE:
        newCards = cards.sort((a,b) => b.discount - a.discount);
        setCards([...newCards]);
        return
      case RATE:
        newCards = cards.sort((a,b) => perfumeRating(b.reviews) - perfumeRating(a.reviews));
        setCards([...newCards]);
        return
      default: break;
    }
  }

  useEffect(() => {
    if (debounceValueInApp === undefined) return;
    api.searchProducts(debounceValueInApp)
      .then((data) => setCards(filteredCards(data)))
  }, [debounceValueInApp])

  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getProductList()]).then(([userData, data]) => {
      setUser(userData);
      const filtered = filteredCards(data.products);
      setCards(filtered);
      const fav = filtered.filter(e => findFav(e, userData._id))
      setFavorites(fav)
    });
  }, [])
  const cardValue = {
    handleLike: handleProductLike,
    cards: cards,
    search, 
    favorites, 
    onSort
  }

  return (
    <div className="App">
      <CardContext.Provider value={cardValue}>
      <UserContext.Provider value={user}>
        <Header setSearch={setSearch} favorites={favorites}>
        </Header>
        <main className="container content">
        <Routes>
          <Route path='/' element={<CatalogPage/>} />
          <Route path='/perfume/:id' element={<PerfumePage />} />
          <Route path='/favorites' element={<FavoritePerfumes />} />
          <Route path='*' element={<h1> 404 NOT FOUND</h1>} />
        </Routes>
        </main>
        <Footer />
      </UserContext.Provider>
      </CardContext.Provider>
    </div>
  );
}

export default App;
