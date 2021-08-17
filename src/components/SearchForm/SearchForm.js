import search from '../../images/search.svg'
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox'
import './SearchForm.css'
import search_white from '../../images/search_white.svg'

function SearchForm() {
    return (
        <section className="search">
            <form className="search__form">
                <img className="search__image_white" src={search_white} alt="Поиск"/>
                <input className="search__input" placeholder="Фильм" required></input>
                <button className="search__button">
                    <img className="search__image" src={search} alt="Искать"/>
                </button>
            </form>
            <div className="search__checkbox">
                <FilterCheckbox />
                <p className="search__filter-text">Короткометражки</p>
            </div>
        </section>
    )
}
export default SearchForm;