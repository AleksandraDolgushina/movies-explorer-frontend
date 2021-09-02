import React from 'react';
import { Route } from 'react-router-dom';
import './MoviesCard.css'

function MoviesCard({movie, isSavedMovies, onLikeClick, onDeleteClick}) {
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
            <a href={movie.trailer} target="_blank" className="movie__image" rel="noreferrer">
            <Route path='/movies'>
                <img className="movie__image" src={`https://api.nomoreparties.co${movie.image.url}`} alt="Обложка фильма" />
            </Route>
            <Route path='/saved-movies'>
                <img className="movie__image" src={movie.image} alt="Обложка фильма" />
            </Route>
            </a>
            <div className="movie__title">
                <h2 className="movie__name">{movie.nameRU}</h2>
                <Route path='/movies'>
                    <button className={cardLikeButtonClassName} type='button' onClick={isSaved ? handleDeleteClick : handleLikeClick}></button>
                </Route>
                <Route path='/saved-movies'>
                    <button className="movie__delete" type='button' onClick={handleDeleteClick}></button>
                </Route>
            </div>
            <p className="movie__duration">{movie.duration}</p>
        </div>
    )
}
export default MoviesCard;