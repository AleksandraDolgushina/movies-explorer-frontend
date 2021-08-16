import React from 'react'
import './Profile.css'

function Profile() {
    const [disabledInput, setDisabledInput] = React.useState(true);

    function handleDisabbled() {
        setDisabledInput(false);
    }

    return (
        <section className="profile">
            <h2 className="profile__title">Привет, Александра!</h2>
            <label className="profile__label">Имя
                <input className="profile__input profile__input_type_name" id="name-input" type="text" name="name" 
                placeholder="Имя" required minLength="2" maxLength="30" disabled={disabledInput} />
            </label>
            <label className="profile__label">E-mail
                <input className="profile__input profile__input_type_email" id="email-input" type="text" name="email" 
                placeholder="Почта" required minLength="5" maxLength="30" disabled={disabledInput}/>
            </label>
            <div className="profile__button">
                {disabledInput ? (
                    <>
                        <button className="profile__edit" onClick={handleDisabbled}>Редактировать</button>
                        <button className="profile__out">Выйти из аккаунта</button>
                    </>
                ) : (
                    <>
                        <button className="profile__save">Сохранить</button>
                    </>
                )}
            </div>
        </section>
    )
}
export default Profile