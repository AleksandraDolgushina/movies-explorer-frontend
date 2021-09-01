import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import Footer from '../Footer/Footer'
import React from "react";
import Preloader from '../Preloader/Preloader'
import './Movies.css'
import { MovieContext } from '../../contexts/MovieContext';

function Movies({
    getMovies, 
    isLoading,  
    onSubmitSearch, 
    loadingError, 
    onLikeClick,
    onDeleteClick,
    isSavedMovie,
    onFilterShort
}) {
    const value = React.useContext(MovieContext);
    const movies = value.movies;

    return (
        <section className="movies">
            <SearchForm 
                onSubmitSearch={onSubmitSearch}
                onFilterShort={onFilterShort}
                isLoading={isLoading}
                getMovies={getMovies}
            />

            {isLoading && <Preloader />}

            {movies && (
                <MoviesCardList 
                    isSavedMovie={isSavedMovie}
                    onLikeClick={onLikeClick}
                    onDeleteClick={onDeleteClick}
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