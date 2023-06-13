
import React from 'react'
import './index.css';
import { ReactComponent as LogoSvg } from '../Logo/logo.svg';
// import  styles from './style.module.css'
import { Search } from '../Search/Search';
import { Link, useLocation } from 'react-router-dom';
import { ReactComponent as Basket} from './img/basket.svg'
import { ReactComponent as Profile} from './img/profile.svg'
import { ReactComponent as Heart} from './img/favorites.svg'
import { ReactComponent as User} from './img/user.svg'
import { useSelector } from 'react-redux';


export const Header = ({setModalActive, auth}) => {

    const location = useLocation();
    const {favorites} = useSelector(s => s.perfumes)

    return <div className="header">
        <div className='container'>
            <div className='header__wrapper'>
                <Link to={'/'} className='header__link'>
                    <div className='logo-wrap'>
                        <LogoSvg className='logo' />
                    <span className='shop-name'>ParfDecant</span>
                    </div>
                </Link>
                {location.pathname === '/' && <Search />}
                <div className='header__icons'>
                    <Link className='header__fav' to={'/favorites'}>
                        <Heart />
                        {!!favorites.length && <span className='header__bubble'>{favorites.length}</span>}
                    </Link>
                    <Basket />
                    { auth ? 
                    <Link to={'/profile'} >
                        <User />
                    </Link>
                    :<Link to={'/login'} onClick={() => setModalActive(true)}>
                    <Profile/>
                    </Link>
                    }
                </div>
            </div>
        </div>
    </div>
}
