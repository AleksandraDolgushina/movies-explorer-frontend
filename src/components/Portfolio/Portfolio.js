import './Portfolio.css'

function Portfolio() {
    return (
        <section className="portfolio">
            <h2 className="portfolio__title">Портфолио</h2>
            <ul className="portfolio__links">
                <li className="portfolio__list">
                    <a href="https://github.com/AleksandraDolgushina/how-to-learn" target="_blank" rel="noreferrer" className="portfolio__link">
                        <p className="portfolio__text">Статичный сайт</p>
                        <p className="portfolio__arrow">&#8599;</p>
                    </a>
                </li>
                <li className="portfolio__list">
                    <a href="https://github.com/AleksandraDolgushina/russian-travel" target="_blank" rel="noreferrer" className="portfolio__link">
                        <p className="portfolio__text">Адаптивный сайт</p>
                        <p className="portfolio__arrow">&#8599;</p>
                    </a>
                </li>
                <li className="portfolio__list">
                    <a href="https://github.com/AleksandraDolgushina/react-mesto-api-full" target="_blank" rel="noreferrer" className="portfolio__link">
                        <p className="portfolio__text">Одностраничное приложение</p>
                        <p className="portfolio__arrow">&#8599;</p>
                    </a>
                </li>
            </ul>
        </section>
    )
}
export default Portfolio;