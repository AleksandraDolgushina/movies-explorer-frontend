import React from "react";
import MoviesCard from "../MoviesCard/MoviesCard";
import './MoviesCardList.css'
import { MovieContext } from '../../contexts/MovieContext'
import { Route } from "react-router-dom";

function MoviesCardList({isSavedMovie, onLikeClick, onDeleteClick}) {
    const value = React.useContext(MovieContext);
    const movies = value.movies;
    const savedMovies = value.savedMovies;
    const [extraPortion, setExtraPortion] = React.useState(3)
    const [currentCount, setCurrenCount] = React.useState(0)
    const [renderMovies, setRenderMovies] = React.useState([])
  
    function getCount(windowSize) {
        if (windowSize > 768) {
        return { first: 12, extra: 3 }
        } else if (windowSize > 480 && windowSize <= 768) {
        return { first: 8, extra: 2 }
        } else {
        return { first: 5, extra: 2 }
        }
    }

    function renderExtraPortion() {
        const count = Math.min(movies.length, currentCount + extraPortion)
        const extraMovies = movies.slice(currentCount, count)
        setRenderMovies([...renderMovies, ...extraMovies])
        setCurrenCount(count)
    }
        
    function handleResize() {
        const windowSize = window.innerWidth
        const sizePortion = getCount(windowSize)
        setExtraPortion(sizePortion.extra)
    }

    React.useEffect(() => {
        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    React.useEffect(() => {
        const windowSize = window.innerWidth
        const sizePortion = getCount(windowSize)
        setExtraPortion(sizePortion.extra)
        const count = Math.min(movies.length, sizePortion.first)
        setRenderMovies(movies.slice(0, count))
        setCurrenCount(count)
    }, [movies])

    function handleMoreCards() {
        renderExtraPortion()
    }

    return (
        <section className="cards">
            <div className="cards__movies">
                {movies && (
                    <Route path='/movies'>
                        {renderMovies.map((movie) => (
                            <MoviesCard
                                movie={movie}
                                key={movie.id}
                                isSavedMovies={isSavedMovie}
                                onLikeClick={onLikeClick}
                                onDeleteClick={onDeleteClick}
                            />
                        ))}
                    </Route>
                )}
            </div>
            {currentCount < movies.length && (
                <button className="cards__more" onClick={handleMoreCards}>Ещё</button>
            )}
            {savedMovies.length > 0 && (
                <Route path='/saved-movies'>
                    {savedMovies.map((movie) => (
                        <MoviesCard
                            movie={movie}
                            key={movie.movieId}
                            isSavedMovies={isSavedMovie}
                            onDeleteClick={onDeleteClick}
                        /> 
                    ))}
                </Route>
            )}
        </section>
    )
}
export default MoviesCardList;