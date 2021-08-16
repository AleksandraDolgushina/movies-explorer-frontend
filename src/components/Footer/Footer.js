import './Footer.css'

function Footer() {
    return (
        <section className="footer">
            <h2 className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</h2>
            <div className="footer__info">
                <p className="footer__copyright">&copy; 2021</p>
                <ul className="footer__links">
                    <li className="footer__item">
                        <a href="https://praktikum.yandex.ru/" target="_blank" rel="noreferrer" className="footer__link">Яндекс.Практикум</a>
                    </li>
                    <li className="footer__item">
                        <a href="https://github.com/AleksandraDolgushina" target="_blank" rel="noreferrer" className="footer__link">Github</a>
                    </li>
                    <li className="footer__item">
                        <a href="https://vk.com/id39480392" target="_blank" rel="noreferrer" className="footer__link">Вконтакте</a>
                    </li>
                </ul>
            </div>
        </section>
    )
}
export default Footer;