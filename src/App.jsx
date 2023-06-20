import './App.css';
import { Header } from './components/Header/header';
import { Footer } from './components/Footer/footer';
import './index.css'
import { useState, useEffect } from 'react';
import { useDebounce } from "./hooks/hooks";
import { CatalogPage } from './pages/CatalogPage/CatalogPage';
import { PerfumePage } from './pages/PerfumePage/PerfumePage';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { FavoritePerfumes } from './pages/Favorites/FavoritePerfumes';
import { parseJwt } from './utils/utils';
import { Modal } from './components/Modal/modal';
import { LoginForm } from './components/Auth/Login/login';
import { RegisterForm} from './components/Auth/Registrate/register';
import { ResetPassword } from './components/Auth/ResetPassword/resetPassword';
import { useDispatch , useSelector} from 'react-redux';
import { ProfilePage } from './pages/ProfilePage/Profile';
import { getUser } from './storage/slices/userSlice';
import { fetchPerfumes, searchPerfumesByQuery } from './storage/slices/perfumesSlice';
import { FaqPage } from './pages/FAQ/faq';
import { openNotification } from './components/Notification/notification';

function App() {
  const [modalActive, setModalActive] = useState(false);
  const [auth, setAuth] = useState(true);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {search} = useSelector(s => s.perfumes)

  const debounceValueInApp = useDebounce(search);

  useEffect(() => {
    if (debounceValueInApp === null) return;
    dispatch(searchPerfumesByQuery(debounceValueInApp))
  }, [debounceValueInApp, dispatch])

  useEffect(() => {
    if (!auth) {
      return
    };
    dispatch(getUser()).then(() => dispatch(fetchPerfumes()));
  }, [dispatch, auth]);

  useEffect(() => {
    const token = parseJwt(localStorage.getItem('token'));
    if (token && (new Date() < new Date(token?.exp * 1e3))) {
      setAuth(true);
    } else {
      setModalActive(true);
      navigate('/login');
      openNotification('error', 'Авторизуйтесь в системе', 'Вы не авторизованы, чтобы пользоваться услугами нашего магазина');
    }
  }, [])

  return (
    <div className="App">
        <Header setModalActive={setModalActive} ></Header>
        <main className="container content">
        { auth ? <Routes>
          <Route path='/' element={<CatalogPage/>} />
          <Route path='/perfume/:id' element={<PerfumePage />} />
          <Route path='/favorites' element={<FavoritePerfumes />} />
          <Route path='/profile' element={<ProfilePage setModalActive={setModalActive}/>} />
          <Route path='/faq' element={<FaqPage />} />
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
        </Routes> : ''}
        </main>
        <Footer />
    </div>
  );
}

export default App;
