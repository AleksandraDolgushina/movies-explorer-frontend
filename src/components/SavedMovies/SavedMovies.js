import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import Footer from '../Footer/Footer'
import React from "react";
import { MovieContext } from '../../contexts/MovieContext'
import Preloader from "../Preloader/Preloader";

function SavedMovies({
    getMovies, 
    isLoading,  
    onSubmitSearch, 
    onDeleteClick,
    isSavedMovie,
    onFilterShort
}) {
    const value = React.useContext(MovieContext);
    const savedMovies = value.savedMovies;

    return (
        <section className="saved-movies">
            <SearchForm
                onSubmitSearch={onSubmitSearch}
                isLoading={isLoading}
                getMovies={getMovies}
                onFilterShort={onFilterShort}  
            />
            {isLoading && <Preloader />}
            {savedMovies && (
                <MoviesCardList
                isSavedMovie={isSavedMovie}
                onDeleteClick={onDeleteClick} />
            )}
            <Footer />
        </section>
    )
}
export default SavedMovies;