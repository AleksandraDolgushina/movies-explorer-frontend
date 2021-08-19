import './AboutProject.css'
function AboutProject() {
    return (
        <section className="project" id="project">
            <h2 className="project__title">О проекте</h2>
            <ul className="project__content">
                <li className="project__item">
                    <h3 className="project__subtitle">Дипломный проект включал 5 этапов</h3>
                    <p className="project__description">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
                </li>
                <li className="project__item">
                    <h3 className="project__subtitle">На выполнение диплома ушло 5 недель</h3>
                    <p className="project__description">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
                </li>
            </ul>
            <div className="project__duration">
                <div className="project__weeks project__weeks_green">1 неделя</div>
                <div className="project__weeks project__weeks_grey">4 недели</div>
                <div className="project__work">Back-end</div>
                <div className="project__work">Front-end</div>
            </div>
        </section>
    )
}
export default AboutProject;