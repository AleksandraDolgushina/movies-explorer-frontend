import about from '../../images/about.jpg'
import './AboutMe.css'

function AboutMe() {
    return (
        <section className="student" id="aboutme">
            <h2 className="student__title">Студент </h2>
            <div className="student__resume">
                <div className="student__info">
                    <h3 className="student__name">Александра</h3>
                    <p className="student__profession">Фронтенд-разработчик, 26 лет</p>
                    <p className="student__about">Я родилась в Архангельске, но сейчас живу в Санкт-Петербурге. Замужем, двое детей. Есть высшее образование по профессии "Производственный менеджмент". Находясь в декрете, захотелось обучится новому, поэтому пошла учиться в Яндекс Практикум на Фронтенд-разработчика.</p>
                    <ul className="student__links">
                        <li className="student__item">
                            <a href="https://vk.com/id39480392" target="_blank" rel="noreferrer" className="student__link">Вконтакте</a>
                        </li>
                        <li className="student__item">
                            <a href="https://github.com/AleksandraDolgushina" target="_blank" rel="noreferrer" className="student__link">Github</a>
                        </li>
                    </ul>
                </div>
                <img className="student__photo" src={about} alt="Фото студента"/>
            </div>
        </section>
    )
}
export default AboutMe;