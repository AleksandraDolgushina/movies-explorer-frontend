import React from 'react';
import { Route } from 'react-router-dom';
import './MoviesCard.css'

function MoviesCard({movie, isSavedMovies, onLikeClick, onDeleteClick}) {
    const { nameRU, duration, trailer } = movie;
    const isSaved = isSavedMovies(movie);
    const cardLikeButtonClassName = (
        `movie__like ${isSaved && 'movie__like_active'}`
    );

    function handleLikeClick(evt) {
        evt.preventDefault()
        onLikeClick(movie)
    }

    function handleDeleteClick() {
        onDeleteClick(movie)
    }

    return (
        <div className="movie">
            <a href={trailer} target="_blank" className="movie__image" rel="noreferrer">
                <img className="movie__image" src={`https://api.nomoreparties.co${movie.image.url}`} alt="Обложка фильма" />
            </a>
            <div className="movie__title">
                <h2 className="movie__name">{nameRU}</h2>
                <Route path='/movies'>
                    <button className={cardLikeButtonClassName} onClick={isSaved ? handleDeleteClick : handleLikeClick}></button>
                </Route>
                <Route path='/saved-movies'>
                    <button className="movie__delete" onClick={handleDeleteClick}></button>
                </Route>
            </div>
            <p className="movie__duration">{duration}</p>
        </div>
    )
}
export default MoviesCard;