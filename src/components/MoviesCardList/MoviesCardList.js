// import React from "react";
// import MoviesCard from "../MoviesCard/MoviesCard";
// import './MoviesCardList.css'
// import { MovieContext } from '../../contexts/MovieContext'

// function MoviesCardList({isSavedMovie, onLikeClick, onDeleteClick, isSavedPage}) {
//     const value = React.useContext(MovieContext);
//     const movies = value.movies;
//     const savedMovies = value.savedMovies;
//     const [extraPortion, setExtraPortion] = React.useState(3)
//     const [currentCount, setCurrenCount] = React.useState(0)
//     const [renderMovies, setRenderMovies] = React.useState([])
  
//     function getCount(windowSize) {
//         if (windowSize > 768) {
//         return { first: 12, extra: 3 }
//         } else if (windowSize > 480 && windowSize <= 768) {
//         return { first: 8, extra: 2 }
//         } else {
//         return { first: 5, extra: 2 }
//         }
//     }

//     function renderExtraPortion() {
//         const count = Math.min(movies.length, currentCount + extraPortion)
//         const extraMovies = movies.slice(currentCount, count)
//         setRenderMovies([...renderMovies, ...extraMovies])
//         setCurrenCount(count)
//     }
        
//     function handleResize() {
//         const windowSize = window.innerWidth
//         const sizePortion = getCount(windowSize)
//         setExtraPortion(sizePortion.extra)
//     }

//     React.useEffect(() => {
//         window.addEventListener('resize', handleResize)

//         return () => {
//             window.removeEventListener('resize', handleResize)
//         }
//     }, [])

//     React.useEffect(() => {
//         const windowSize = window.innerWidth
//         const sizePortion = getCount(windowSize)
//         setExtraPortion(sizePortion.extra)
//         const count = Math.min(movies.length, sizePortion.first)
//         setRenderMovies(movies.slice(0, count))
//         setCurrenCount(count)
//     }, [movies])

//     function handleMoreCards() {
//         renderExtraPortion()
//     }

//     return (
//         <section className="cards">
//             <div className="cards__movies">
//                 {isSavedPage && 
//                     savedMovies.map((movie) => (
//                         <MoviesCard
//                             movie={movie}
//                             key={movie.movieId}
//                             isSavedMovies={isSavedMovie}
//                             onLikeClick={onLikeClick}
//                             onDeleteClick={onDeleteClick}
//                         />
//                     ))
//                 }

//                 {!isSavedPage &&
//                     renderMovies.map((movie) => (
//                         <MoviesCard
//                             key={movie.movieId}
//                             movie={movie}
//                             onLikeClick={onLikeClick}
//                             isSavedMovies={isSavedMovie}
//                             onDeleteClick={onDeleteClick}
//                         />
//                     ))
//                 }
//             </div>

//             {!isSavedPage && currentCount < movies.length && (
//                 <button className="cards__more" onClick={handleMoreCards}>Ещё</button>
//             )}
//         </section>
//     )
// }
// export default MoviesCardList;

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
          if (windowSize > 768) {
            setCount(12);
            setCards(3);
          }
          if (windowSize > 480 && windowSize <= 768){
            setCount(8);
            setCards(2);
          }
          if (windowSize < 480) {
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
