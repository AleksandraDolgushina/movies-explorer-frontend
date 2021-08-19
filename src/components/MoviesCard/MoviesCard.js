import { Route } from 'react-router-dom';
import './MoviesCard.css'

function MoviesCard() {
    return (
        <div className="movie">
            <div className="movie__image"></div>
            <div className="movie__title">
                <h2 className="movie__name">33 слова о дизайне</h2>
                <Route path='/movies'>
                    <button className="movie__like"></button>
                </Route>
                <Route path='/saved-movies'>
                    <button className="movie__delete"></button>
                </Route>
            </div>
            <p className="movie__duration">1ч42м</p>
        </div>
    )
}
export default MoviesCard;