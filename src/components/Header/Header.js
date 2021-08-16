import React from 'react';
import { Link, NavLink, Route } from 'react-router-dom';
import logo from '../../images/logo.svg'
import './Header.css'

function Header() {

    const [menuIsOpen, setMenuIsOpen] = React.useState(false);

    function handleMenuIsOpen() {
        setMenuIsOpen(true)
    }
    function handleMenuIsClose() {
        setMenuIsOpen(false)
    }

    return (
        <section className="header">
            <div className="header__main">
                <Route exact path='/'>
                    <Link to="/" >
                        <img className="link header__logo" src={logo} alt="Логотип"/>
                    </Link>
                    <nav className="header__container">
                        <NavLink to="/signup" className="link header__signup">Регистрация</NavLink>
                        <NavLink to="/signin" className="link header__signin">Войти</NavLink>
                    </nav>
                </Route>
            </div>
            <div className="header__other">
                <Route path={['/movies', '/saved-movies', '/profile']}>
                    <Link to="/" >
                        <img className="link header__logo" src={logo} alt="Логотип"/>
                    </Link>
                    <div className="header__open-menu" onClick={handleMenuIsOpen}></div>
                    <div className={`header__item ${!menuIsOpen && 'header__item_hidden'}`}>
                    <nav className="header__nav">
                        <NavLink to="/" className="link header__nav-main" onClick={handleMenuIsClose}>Главная</NavLink>
                        <NavLink to="/movies" className="link header__movies" onClick={handleMenuIsClose}>Фильмы</NavLink>
                        <NavLink to="/saved-movies" className="header__saved-movies" onClick={handleMenuIsClose}>Сохранённые фильмы</NavLink>
                        <NavLink to="/profile" className="link header__profile"
                        onClick={handleMenuIsClose}>Аккаунт</NavLink>
                        <div className="header__close-menu" onClick={handleMenuIsClose}></div>
                    </nav>
                    </div>
                </Route>
            </div>
        </section>
    )
}
export default Header;