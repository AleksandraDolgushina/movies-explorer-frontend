import search from '../../images/search.svg'
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox'
import './SearchForm.css'
import search_white from '../../images/search_white.svg'
import React from 'react'
import useFormAndValidation from '../../hooks/useFormAndValidation';

function SearchForm({getMovies, onFilterShort, isLoading}) {
    const { values, handleChange, resetForm, errors, isValid } = useFormAndValidation ();
    const { name } = values;

    function handleOnSubmit(evt) {
        evt.preventDefault();
        isValid && !isLoading &&
          getMovies(name);
        resetForm();
    }

    return (
        <section className="search">
            <form className="search__form" name="search" onSubmit={handleOnSubmit}>
                <img className="search__image_white" src={search_white} alt="Поиск"/>
                <input 
                    className="search__input" 
                    placeholder="Фильм" 
                    required
                    name='name'
                    onChange={handleChange}
                    value={name || ''}
                />
                <button
                    className={`search__button ${
                    !isValid && 'search__button_disabled'
                    }`}
                    disabled={!isValid}
                >
                    <img className="search__image" src={search} alt="Искать"/>
                </button>
            </form>
            <div className="search__checkbox">
                <FilterCheckbox onFilter={onFilterShort} />
                <p className="search__filter-text">Короткометражки</p>
            </div>
        </section>
    )
}
export default SearchForm;