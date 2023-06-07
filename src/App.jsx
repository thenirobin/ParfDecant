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
import { CardContext } from './context/cardContext';
import { filteredCards} from './utils/utils';
// import { Form } from './components/Form/form';
import { Modal } from './components/Modal/modal';
import { LoginForm } from './components/Auth/Login/login';
import { RegisterForm} from './components/Auth/Registrate/register';
import { ResetPassword } from './components/Auth/ResetPassword/resetPassword';
import { useDispatch , useSelector} from 'react-redux';
import { ProfilePage } from './pages/ProfilePage/Profile';
import { getUser } from './storage/slices/userSlice';
import { fetchPerfumes, searchPerfumeByQuery } from './storage/slices/perfumesSlice';

function App() {
  const [search, setSearch] = useState(undefined);
  const [modalActive, setModalActive] = useState(false);
  // const [auth, setAuth] = useState(true);

  const dispatch = useDispatch();
  
  const debounceValueInApp = useDebounce(search);

  useEffect(() => {
    if (debounceValueInApp === undefined) return;
    dispatch(searchPerfumeByQuery(debounceValueInApp))
  }, [debounceValueInApp, dispatch])

  useEffect(() => {
    dispatch(getUser()).then(() => dispatch(fetchPerfumes()));
  }, [dispatch]);

  const cardValue = {
    search,
    setModalActive
  }

  return (
    <div className="App">
      <CardContext.Provider value={cardValue}>
        <Header setSearch={setSearch}></Header>
        {/* <Form/> */}
        <main className="container content">
        <Routes>
          <Route path='/' element={<CatalogPage/>} />
          <Route path='/perfume/:id' element={<PerfumePage />} />
          <Route path='/favorites' element={<FavoritePerfumes />} />
          <Route path='/profile' element={<ProfilePage />} />
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
      </CardContext.Provider>
    </div>
  );
}

export default App;
