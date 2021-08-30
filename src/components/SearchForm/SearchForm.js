import search from '../../images/search.svg'
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox'
import './SearchForm.css'
import search_white from '../../images/search_white.svg'
import React from 'react'

function SearchForm({onSubmitSearch,onFilterShort, isLoading}) {
    const [query, setQuery] = React.useState('')
    const [isSubmitDisabled, setIsSubmitDisabled] = React.useState(false)
    
    function handleOnChange(evt) {
        setQuery(evt.target.value)
    }
    
    function handleOnSubmit(evt) {
        evt.preventDefault()
        onSubmitSearch(query)
    }
    
    React.useEffect(() => {
        setIsSubmitDisabled(query === '')
    }, [query])

    return (
        <section className="search">
            <form className="search__form" name="search" onSubmit={handleOnSubmit}>
                <img className="search__image_white" src={search_white} alt="Поиск"/>
                <input 
                    className="search__input" 
                    placeholder="Фильм" 
                    required 
                    onChange={handleOnChange} 
                    disabled={isLoading}
                />
                <button
                    className={`search__button ${
                        isSubmitDisabled && 'search__button_disabled'
                    }`}
                    disabled={isSubmitDisabled || isLoading}
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