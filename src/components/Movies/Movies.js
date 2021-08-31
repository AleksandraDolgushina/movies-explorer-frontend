import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import Footer from '../Footer/Footer'
import React from "react";
import Preloader from '../Preloader/Preloader'
import './Movies.css'

function Movies({
    movies, 
    isLoading, 
    savedMovies, 
    onSubmitSearch, 
    loadingError, 
    onLikeClick, 
    isSavedMovie
}) {
    const [shortFilm, setShortFilm] = React.useState(false)
    
    function onFilterShortFilm(filterOn) {
        setShortFilm(filterOn)
    }

    function filterShortFilm(movies) {
        return movies.filter((item) => {
          return item.duration < 40
        })
    }

    return (
        <section className="movies">
            <SearchForm 
                onSubmitSearch={onSubmitSearch}
                onFilterShort={onFilterShortFilm}
                isLoading={isLoading}
            />

            {isLoading && <Preloader />}

            {!isLoading && loadingError === '' && (
                <MoviesCardList 
                    movies={shortFilm ? filterShortFilm(movies) : movies}
                    isSavedMovie={isSavedMovie}
                    onLikeClick={onLikeClick}
                    savedMovies={savedMovies}
                />
            )}
            {!isLoading && loadingError !== '' && (
                <div className="movies__info">{loadingError}</div>
            )}
            <Footer />
        </section>
    )
}
export default Movies;