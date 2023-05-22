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
// import { Form } from './components/Form/form';
import { RegistrateForm } from './components/Form/registrateForm';
import { Modal } from './components/Modal/modal';
import { LoginForm } from './components/Auth/Login/login';
import { RegisterForm, RegistrationForm } from './components/Auth/Registrate/register';
import { ResetPassword } from './components/Auth/ResetPassword/resetPassword';

function App() {
  const [cards, setCards] = useState([]);
  const [search, setSearch] = useState(undefined);
  const [user, setUser] = useState({});
  const [favorites, setFavorites] = useState([]);
  const [modalActive, setModalActive] = useState(false);
  // const [auth, setAuth] = useState(true);


  const debounceValueInApp = useDebounce(search)

  const handleProductLike = async (product, wasLiked) => {
    const updatedCard = await api.changeProductLike(product._id, wasLiked);
    setCards(s => [...s.map(e => e._id === updatedCard?._id ? updatedCard : e)]);
    wasLiked 
    ? setFavorites((state) => state.filter(f => f._id !== updatedCard._id))
    : setFavorites((state) => [updatedCard, ...state])

    return wasLiked;
  }

  const perfumeRating = (reviews) => {
    if (!reviews || !reviews.length) {
      return 0;
    }
    const sum = reviews.reduce((acc, el)=>acc += el.rating, 0);
    return sum / reviews.length
  }


  const onSort = (sortId) => {
    switch (sortId) {
      case POPULAR:
        setCards((state) => [...state.sort((a,b) => b.likes.length - a.likes.length)]);
        return
      case NEWEST: 
      setCards((state)=>[...state.sort((a,b) => new Date(b.created_at) - new Date(a.created_at))]);
        return
      case CHEAPEST:
        setCards((state) => [...state.sort((a,b) => a.price - b.price)]);
        return
      case EXPENSIVE:
        setCards((state) => [...state.sort((a,b) => b.price - a.price)]);
        return
      case SALE:
        setCards((state) => [...state.sort((a,b) => b.discount - a.discount)]);
        return
      case RATE:
        setCards((state) => [...state.sort((a,b) => perfumeRating(b.reviews) - perfumeRating(a.reviews))]);
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
    onSort,
    setModalActive,
    perfumeRating,
    user
  }

  return (
    <div className="App">
      <CardContext.Provider value={cardValue}>
      <UserContext.Provider value={user}>
        <Header setSearch={setSearch} favorites={favorites}></Header>
        {/* <Form/> */}
        <main className="container content">
        <Routes>
          <Route path='/' element={<CatalogPage/>} />
          <Route path='/perfume/:id' element={<PerfumePage />} />
          <Route path='/favorites' element={<FavoritePerfumes />} />
          <Route path='/registrate' element={
            <Modal modalActive={modalActive} setModalActive={setModalActive}>
            <RegisterForm />
          </Modal>
          } />
          <Route path='/login' element={
            <Modal modalActive={modalActive} setModalActive={setModalActive}>
            <LoginForm />
          </Modal>
          } />
          <Route path='/reset-password' element={
            <Modal modalActive={modalActive} setModalActive={setModalActive}>
            <ResetPassword />
          </Modal>
          } />
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
