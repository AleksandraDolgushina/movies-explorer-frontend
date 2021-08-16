import './NavTab.css';
import { NavLink } from 'react-router-dom';

function NavTab() {
  return (
    <section className="nav">
      <ul className="nav__links">
        <li className="nav__item">
          <a href="#project" className="nav__link">О проекте</a>
        </li>
        <li className="nav__item">
          <a href="#techs" className="nav__link">Технологии</a>
        </li>
        <li className="nav__item">
          <a href="#aboutme" className="nav__link">Студент</a>
        </li>
      </ul>
    </section>
  )
}

export default NavTab;