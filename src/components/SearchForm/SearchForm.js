import search from '../../images/search.svg'
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox'
import './SearchForm.css'

function SearchForm() {
    return (
        <section className="search">
            <form className="search__form">
                <input className="search__input" placeholder="Фильм"></input>
                <button className="search__button">
                    <img className="search__image" src={search} alt="Искать"/>
                </button>
            </form>
            <div className="search__checkbox">
                <p className="search__filter-text">Короткометражки</p>
                <FilterCheckbox />
            </div>
        </section>
    )
}
export default SearchForm;