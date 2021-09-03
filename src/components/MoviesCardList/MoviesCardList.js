import React from 'react';
import { Route } from 'react-router-dom';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard.js';
import { MovieContext } from '../../contexts/MovieContext';

function MoviesCardList({ onLikeClick, onDeleteClick, isSavedMovie }) {
  const value = React.useContext(MovieContext);
  const movies = value.movies;
  const savedMovies = value.savedMovies;
  const [count, setCount] = React.useState(0);
  const [cards, setCards] = React.useState(0);
  
  function useWindowSize() {
    const [size, setSize] = React.useState(0);
    React.useEffect(() => {
      function updateSize() {
          setSize(window.innerWidth);
      }
      window.addEventListener('resize', updateSize);
      updateSize();
      return () => window.removeEventListener('resize', updateSize);
    }, []);
      return size;
  }
  const windowSize = useWindowSize()
  function increment() {
      setCount(count + cards);
  }

  React.useEffect(() => {
      function getSize() {
        if (windowSize >= 1280) {
          setCount(12);
          setCards(3);
        }
        if (windowSize < 1280 && windowSize > 767) {
          setCount(8);
          setCards(2);
        }
        if (windowSize <= 767) {
          setCount(5);
          setCards(2);
        }
      }
      getSize();
    }, [windowSize]);

  return (
    <main className='cards'>
      {movies && (
        <Route path='/movies'>
          <section className='cards__movies'>
            {movies.length > count &&
              movies
                .slice(0, count)
                .map((movie) => (
                  <MoviesCard
                    key={movie.id}
                    movie={movie}
                    onLikeClick={onLikeClick}
                    onDeleteClick={onDeleteClick}
                    isSavedMovies={isSavedMovie}
                  />
                ))}
            {movies.length <= count &&
              movies.map((movie) => (
                <MoviesCard
                  key={movie.id}
                  movie={movie}
                  onLikeClick={onLikeClick}
                  onDeleteClick={onDeleteClick}
                  isSavedMovies={isSavedMovie}
                />
              ))}
          </section>
            {count < movies.length && (
                <button
                    className='cards__more'
                    aria-label='Показать еще'
                    onClick={increment}
                >
                    Ещё
                </button>
            )}
        </Route>
      )}
      {savedMovies.length > 0 && (
        <Route path='/saved-movies'>
          <section className='cards__movies'>
            {savedMovies.length > count &&
              savedMovies
                .slice(0, count)
                .map((movie) => (
                  <MoviesCard
                    key={movie.movieId}
                    movie={movie}
                    onDeleteClick={onDeleteClick}
                    isSavedMovies={isSavedMovie}
                  />
                ))}
            {savedMovies.length <= count &&
              savedMovies.map((movie) => (
                <MoviesCard
                  key={movie.movieId}
                  movie={movie}
                  onDeleteClick={onDeleteClick}
                  isSavedMovies={isSavedMovie}
                />
              ))}
          </section>
          {/* {savedMovies && <div className='movies-cardlist__empty'></div>} */}
        </Route>
      )}
    </main>
  );
}

export default MoviesCardList;
