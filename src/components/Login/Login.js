import { Link } from "react-router-dom";
import logo from "../../images/logo.svg"
import './Login.css'
import useFormWithValidation from '../../hooks/useFormValidation'

function Login({handleLogin}) {
    const {
        values,
        errors, 
        isValid,
        handleChange,
        resetForm
    } = useFormWithValidation({})
    const { email, password } = values;

    function handleOnSubmit(evt) {
        evt.preventDefault()
        handleLogin({ email, password })
        resetForm()
    }

    return (
        <section className="login">
            <Link to="/" >
                <img className="login__logo" src={logo} alt="Логотип"/>
            </Link>
            <form 
                className="form login__form" 
                name="loginer" 
                noValidate 
                onSubmit={handleOnSubmit}>
                <h2 className="login__title">Рады видеть!</h2>
                <label className="login__item">E-mail
                    <input 
                        className="login__input" 
                        type="email" 
                        name="email" 
                        placeholder="Email" 
                        value={values.email || ''}
                        required
                        minLength='2'
                        maxLength='50'
                        title='Неверный e-mail'
                        pattern='^([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22))*\x40([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d))*(\.\w{2,})+$'
                        autoComplete='on'
                        onChange={handleChange}
                    />  
                </label>
                <label className="login__item">Пароль
                    <input 
                        className="login__input" 
                        type="password" 
                        name="password" 
                        placeholder="Пароль" 
                        value={values.password || ''}
                        required
                        minLength='6'
                        maxLength='20'
                        pattern='^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$'
                        title='Пароль должен содержать не менее 1 заглавный буквы.'
                        autoComplete='off'
                        onChange={handleChange}
                    />
                </label>
                <button 
                    className="login__save-button" 
                    type="submit"
                    >Войти</button>
            </form>
            <p className="login__text">Еще не зарегистрированы? 
                <Link to="/signup" className="login__link"> Регистрация</Link>
            </p>
      </section>
    )
}
export default Login;