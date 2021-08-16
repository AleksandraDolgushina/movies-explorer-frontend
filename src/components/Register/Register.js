import { Link } from "react-router-dom";
import logo from "../../images/logo.svg"
import './Register.css'

function Register() {
    return (
        <section className="regist">
            <Link to="/" >
                <img className="regist__logo" src={logo} alt="Логотип"/>
            </Link>
            <form className="regist__form" name="register" noValidate>
                <h2 className="regist__title">Добро пожаловать!</h2>
                <label className ="regist__item">Имя
                    <input className="regist__input" type="name" name="name" placeholder="Имя" value=""></input> 
                </label>
                <label className="regist__item">E-mail
                    <input className="regist__input" type="email" name="email" placeholder="Email" value=""></input>  
                </label>
                <label className="regist__item">Пароль
                    <input className="regist__input" type="password" name="password" placeholder="Пароль" value=""></input>
                </label>
                <button className="regist__save-button"  type="submit">Зарегистрироваться</button>
            </form>
            <p className="regist__text">Уже зарегистрированы? 
                <Link to="/signin" className="regist__link"> Войти</Link>
            </p>
      </section>
    )
}
export default Register;