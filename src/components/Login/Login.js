import { Link } from "react-router-dom";
import logo from "../../images/logo.svg"
import './Login.css'

function Login() {
    return (
        <section className="login">
            <Link to="/" >
                <img className="login__logo" src={logo} alt="Логотип"/>
            </Link>
            <form className="login__form" name="loginer" noValidate>
                <h2 className="login__title">Рады видеть!</h2>
                <label className="login__item">E-mail
                    <input className="login__input" type="email" name="email" placeholder="Email" value=""></input>  
                </label>
                <label className="login__item">Пароль
                    <input className="login__input" type="password" name="password" placeholder="Пароль" value=""></input>
                </label>
                <button className="login__save-button"  type="submit">Войти</button>
            </form>
            <p className="login__text">Еще не зарегистрированы? 
                <Link to="/signup" className="login__link"> Регистрация</Link>
            </p>
      </section>
    )
}
export default Login;