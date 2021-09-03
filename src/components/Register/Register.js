import { Link } from "react-router-dom";
import useFormWithValidation from "../../hooks/useFormValidation";
import logo from "../../images/logo.svg"
import './Register.css'

function Register({handleRegister, isSave}) {
    const {
        values,
        errors,
        isValid,
        handleChange,
        resetForm,
      } = useFormWithValidation({})
      const { name, email, password } = values;

    function handleOnSubmit(evt) {
        evt.preventDefault()
        handleRegister({ name, email, password })
        resetForm()
    }      
    return (
        <section className="regist">
            <Link to="/" >
                <img className="regist__logo" src={logo} alt="Логотип"/>
            </Link>
            <form 
                className="form regist__form" 
                name="register" 
                noValidate
                onSubmit={handleOnSubmit}
            >
                <h2 className="regist__title">Добро пожаловать!</h2>
                <label className ="regist__item">Имя
                    <input 
                        className="regist__input" 
                        type="text" 
                        name="name" 
                        placeholder="Имя" 
                        value={values.name || ''}
                        required
                        minLength='2'
                        maxLength='30'
                        autoComplete='off'
                        onChange={handleChange}     
                        disabled={isSave}
                    />
                </label>
                <span className='login__input-error'>{errors.name}</span>
                <label className="regist__item">E-mail
                    <input 
                        className="regist__input" 
                        type="email" 
                        name="email" 
                        placeholder="Email" 
                        value={values.email || ''}
                        minLength='2'
                        maxLength='50'
                        required
                        title='Неверный e-mail'
                        pattern='^([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22))*\x40([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d))*(\.\w{2,})+$'
                        autoComplete='on'
                        onChange={handleChange}
                        disabled={isSave}
                    />  
                </label>
                <span className='login__input-error'>{errors.email}</span>
                <label className="regist__item">Пароль
                    <input 
                        className="regist__input" 
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
                        disabled={isSave}
                    />
                </label>
                <span className='login__input-error'>Пароль должен содержать не менее одной цифры и не менее одной заглавной буквы</span>
                <button 
                     className={
                        isValid ? 'regist__save-button' : 'regist__save-button regist__save-button_disabled'
                      }
                    type="submit"
                    disabled={!isValid || isSave}
                >
                    Зарегистрироваться</button>
            </form>
            <p className="regist__text">Уже зарегистрированы? 
                <Link to="/signin" className="regist__link"> Войти</Link>
            </p>
      </section>
    )
}
export default Register;