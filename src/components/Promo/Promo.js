import image_promo from '../../images/image_promo.svg'
import './Promo.css'

function Promo() {
    return (
        <section className="promo">
            <div className="promo__description">
                <h1 className="promo__title">Учебный проект студента факультета <br /> Веб-разработки.</h1>
                <p className="promo__subtitle">Листайте ниже, чтобы узнать больше про этот проект и его создателя.</p>
                <a href="#project" className="promo__button">Узнать больше</a>
            </div>
            <img className="promo__image" src={image_promo} alt="Логотип"/>
        </section>
    )
}
export default Promo;