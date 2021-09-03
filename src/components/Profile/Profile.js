import React from 'react'
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import useFormWithValidation from '../../hooks/useFormValidation';
import './Profile.css'

function Profile({onSaveProfile, onSignOut}) {
    const currentUser = React.useContext(CurrentUserContext)
    const {
        values,
        errors,
        isValid,
        handleChange
    } = useFormWithValidation({})
    const { name, email } = values;

    function handleSignOut() {
        onSignOut({
            email: currentUser.email,
        })
    }
    
    function handleOnSubmit(evt) {
        evt.preventDefault()
        onSaveProfile({ name, email })
    }

    return (
        <section className="profile">
            <h2 className="profile__title">Привет, {currentUser.name}!</h2>
            <form 
                className="profile__form" 
                action="post" 
                name="profile" 
                noValidate 
                onSubmit={handleOnSubmit}
            >
                <label className="profile__label">Имя
                    <input 
                        className="profile__input profile__input_type_name" 
                        id="name-input" 
                        type="text" 
                        name="name" 
                        placeholder={currentUser.name}
                        required 
                        minLength="2" 
                        maxLength="30" 
                        value={values.name}
                        onChange={handleChange}
                    />
                </label>
                <span
                    className={`profile__input-error ${
                        !isValid && 'profile__input-error_visible'
                    }`}
                >
                    {errors.name}
                </span>
                <label className="profile__label">E-mail
                    <input 
                        className="profile__input profile__input_type_email" 
                        id="email-input" 
                        type="email" 
                        name="email" 
                        placeholder={currentUser.email} 
                        required 
                        minLength="5"
                        maxLength="30" 
                        value={values.email}
                        onChange={handleChange}
                    />
                </label>
                <span
                    className={`profile__input-error ${
                        !isValid && 'profile__input-error_visible'
                    }`}
                >
                    {errors.email}
                </span>
                <div className="profile__buttons">
                    <button  
                        type="submit"
                        className={`profile__button profile__button_type_edit 
                        ${!isValid && 'profile__button_disabled'}`}
                        disabled={!isValid}
                        onClick={handleOnSubmit}
                    >
                        {isValid ? 'Сохранить' : 'Редактировать'}
                    </button>
                    <button 
                        type="button"
                        className="profile__button profile__button_type_exit"
                        onClick={handleSignOut}
                    >
                        Выйти из аккаунта</button>
                </div>
            </form>
        </section>
    )
}
export default Profile