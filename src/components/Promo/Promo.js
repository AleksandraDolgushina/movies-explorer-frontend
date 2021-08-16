import image_promo from '../../images/image_promo.svg'
import './Promo.css'

function Promo() {
    return (
        <section className="promo">
            <h1 className="promo__title">Учебный проект студента факультета Веб-разработки.</h1>
            <img className="promo__image" src={image_promo} alt="Логотип"/>
        </section>
    )
}
export default Promo;