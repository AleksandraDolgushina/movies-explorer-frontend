import './App.css';
import { Redirect, Route, Switch, useHistory, useLocation } from 'react-router-dom';
import { MovieContext } from '../../contexts/MovieContext'
import Main from '../Main/Main'
import Header from '../Header/Header';
import Movies from '../Movies/Movies'
//import SavedMovies from '../SavedMovies/SavedMovies'
import Profile from '../Profile/Profile'
import Login from '../Login/Login'
import Register from '../Register/Register'
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import React from 'react';
import mainApi from '../../utils/MainApi'
import moviesApi from '../../utils/MoviesApi'
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import PageNotFound from '../PageNotFound/PageNotFound'
import Popup from '../Popup/Popup'
import SavedMovies from '../SavedMovies/SavedMovies';

const App = () => {

//   const [isLoading, setIsLoading] = React.useState(false)
//   const [loadingError, setLoadingError] = React.useState('')
//   const [currentUser, setCurrentUser] = React.useState({})
//   const [loggedIn, setLoggedIn] = React.useState(false)
//   const history = useHistory()
//   const [initialMovies, setInitialMovies] = React.useState([])
//   const [savedMovies, setSavedMovies] = React.useState([])
//   const [filterMovies, setFilterMovies] = React.useState([])
//   const [filterSavedMovies, setFilterSavedMovies] = React.useState([])
//   const [query, setQuery] = React.useState('')
//   let location = useLocation()
//   const [isInfoPopupOpen, setIsInfoPopupOpen] = React.useState(false)
//   const [textPopup, setTextPopup] = React.useState('')
      
//   React.useEffect(() => {
//     const path = location.pathname
//     const token = localStorage.getItem('jwt')
//     if (token) {
//       mainApi
//       .checkToken(token)
//       .then((res) => {
//       if (res) {
//         setLoggedIn(true)
//         getCurrentUser()
//         history.push(path)
//       }
//     })
//       .catch((err) => {
//         console.log(err)
//         localStorage.removeItem('jwt')
//         history.push('/')
//       })
//     }
//   }, [])

//   function handleRegister({ name, email, password }) {
//     if (!name || !email || !password) {
//       return
//     }
//     mainApi
//       .register(name, email, password)
//       .then((res) => {
//         if (res) {
//           history.push('/movies')
//         }
//       })
//       .catch((err) => {
//         if (err.status === 409) {
//           setTextPopup('Пользователь с таким email уже существует')
//           setIsInfoPopupOpen(true)
//         } else {
//           setTextPopup('При регистрации пользователя произошла ошибка')
//           setIsInfoPopupOpen(true)
//         }
//       })
//   }

//   function handleLogin({email, password}) {
//     if (!email || !password) {
//       return
//     }
//     mainApi
//       .authorize(email, password)
//       .then((res) => {
//         if (res.token) {
//           localStorage.setItem('jwt', res.token)
//           setLoggedIn(true)
//           getCurrentUser()
//           history.push('/movies')
//         }
//       })
//       .catch((err) => {
//         if (err.status === 400) {
//           setTextPopup('Неверный email или пароль')
//           setIsInfoPopupOpen(true)
//         } else {
//           setTextPopup('При авторизации произошла ошибка')
//           setIsInfoPopupOpen(true)
//         }
//       })
//   }
  
//   function getCurrentUser() {
//     const token = localStorage.getItem('jwt')
//     mainApi
//       .getCurrentUser(token)
//       .then((res) => {
//           if (res) {
//               setCurrentUser(res)
//               localStorage.setItem('currentUser', JSON.stringify(res))
//         }
//       })
//       .catch((err) => {
//         console.log(err)
//       })
//   }
  
//   function handleSaveProfile(data) {
//     mainApi
//       .editUser(data)
//       .then((profile) => {
//         setCurrentUser(profile)
//         setTextPopup('Профиль обновлен')
//         setIsInfoPopupOpen(true)
//       })
//       .catch((err) => {
//         if (err.status === 409) {
//           setTextPopup('Пользователь с таким email уже существует')
//         } else {
//           setTextPopup('При обновлении профиля произошла ошибка')
//         }
//         setIsInfoPopupOpen(true)
//       })
//     }

//     function handleSignOut() {
//       localStorage.removeItem('jwt')
//       localStorage.removeItem('currentUser')
//     setLoggedIn(false)
//     setCurrentUser({})
    
//     localStorage.removeItem('initialMovies')
//     localStorage.removeItem('savedMovies')
//     setInitialMovies([])
//     setSavedMovies([])
//     setFilterMovies([])
//     setFilterSavedMovies([])
    
//     history.push('/')
//   }
  
  
//   function getInitialMovies() {
//     moviesApi
//     .getMovies()
//     .then((data) => {
//       const initialArray = data.map((item) => {
//         const imageURL = item.image ? item.image.url : ''
//         return {
//           ...item,
//           image: `https://api.nomoreparties.co${imageURL}`,
//           trailer: item.trailerLink,
//         }
//       })
      
//       localStorage.setItem('initialMovies', JSON.stringify(initialArray))
//       setInitialMovies(initialArray)
//     })
//     .catch((err) => {
//       setLoadingError(
//         'Введите ключевое слово'
//         )
//       })
//     }
    
//     function getSavedMovies() {
//       mainApi
//       .getUserMovies()
//       .then((data) => {
//         const savedArray = data.map((item) => {
//           return { ...item, id: toString(item.movieId) }
//         })
//         localStorage.setItem('savedMovies', JSON.stringify(savedArray))
//         setSavedMovies(savedArray)
//       })
//       .catch((err) => {
//         localStorage.removeItem('savedMovies')
//         setLoadingError(
//           'Введите ключевое слово'
//         )
//       })
//     }
    
//     React.useEffect(() => {
//       const initial = JSON.parse(localStorage.getItem('initialMovies'))
//       if (initial) {
//         setInitialMovies(initial)
//       } else {
//         getInitialMovies()
//       }
  
//       const saved = JSON.parse(localStorage.getItem('savedMovies'))
//       if (saved) {
//         setSavedMovies(saved)
//       } else {
//         getSavedMovies()
//       }
//     }, [])

//   React.useEffect(() => {
//     if (loggedIn) {
//       getInitialMovies()
//       getSavedMovies()
//     }
//   }, [loggedIn])

//   function isSavedMovie(movie) {
//     console.log(savedMovies)
//     return savedMovies.some((item) => item.id === movie.id)
//   }

//   function filter(data, query) {
//     if (query) {
//       const regex = new RegExp(query, 'gi')
//       const filterData = data.filter((item) => {
//         return regex.test(item.nameRU) || regex.test(item.nameEN)
//       })
      
//       if (filterData.length === 0) {
//         setLoadingError('Ничего не найдено')
//       } else {
//         setLoadingError('')
//       }
//       return filterData
//     }
//     return []
//   }

//   function onSubmitSearch(query) {
//     setIsLoading(true)
//     setTimeout(() => {
//       setQuery(query)
//       setFilterMovies(filter(initialMovies, query))
//       setIsLoading(false)
//     }, 500)
//   }

//   function onSubmitSearchSaved(query) {
//     setIsLoading(true)
//     setTimeout(() => {
//       setQuery(query)
//       setFilterSavedMovies(filter(savedMovies, query))
//       setIsLoading(false)
//     }, 500)
//   }

//   function onLikeClick(movie, isMarked) {
//     if (isMarked) {
//       addMovie(movie)
//     } else {
//       deleteMovie(movie)
//     }
//   }

//   function deleteMovie(movie) {
//     const movieId = savedMovies.find((item) => item.id === movie.id)._id
//     mainApi
//       .deleteMovies(movieId)
//       .then((res) => {
//         if (res) {
//           const newArray = savedMovies.filter(
//             (item) => item.movieId !== res.movieId
//           )
//           setSavedMovies(newArray)
//         }
//       })
//       .catch((err) => {
//         setTextPopup('На сервере произошла ошибка')
//         setIsInfoPopupOpen(true)
//       })
//   }

//   function addMovie(movie) {
//     mainApi
//       .addMovies(movie)
//       .then((res) => {
//         setSavedMovies([...savedMovies, { ...res, id: res.movieId }])
//         localStorage.setItem('savedMovies', JSON.stringify(savedMovies))
//       })
//       .catch((err) => {
//         setTextPopup('На сервере произошла ошибка')
//         setIsInfoPopupOpen(true)
//       })
//   }

//   function onClosePopup() {
//     setIsInfoPopupOpen(false)
//     setTextPopup('')
//   }

//   return (
//     <div className="page">
//       <CurrentUserContext.Provider value={currentUser}>
//         {(loggedIn || location.pathname === '/') && (
//           <Header loggedIn={loggedIn} />
//         )}

//         <Switch>
//           <Route path="/signup">
//             <Register handleRegister={handleRegister} />
//           </Route>

//           <Route path="/signin">
//             <Login handleLogin={handleLogin} />
//           </Route>
//           <Route exact path="/">
//             <Main />
//           </Route>

//           <ProtectedRoute
//             exact
//             path="/movies"
//             loggedIn={loggedIn}
//             isLoading={isLoading}
//             loadingError={loadingError}
//             component={Movies}
//             savedMovies={false}
//             movies={filterMovies}
//             onSubmitSearch={onSubmitSearch}
//             onLikeClick={onLikeClick}
//             isSavedMovie={isSavedMovie}
//           />

//           <ProtectedRoute
//             exact
//             path="/saved-movies"
//             loggedIn={loggedIn}
//             isLoading={isLoading}
//             loadingError={loadingError}
//             component={Movies}
//             savedMovies={true}
//             movies={filterSavedMovies}
//             onSubmitSearch={onSubmitSearchSaved}
//             onLikeClick={onLikeClick}
//             isSavedMovie={isSavedMovie}
//           />

//           <ProtectedRoute
//             exact
//             path="/profile"
//             loggedIn={loggedIn}
//             component={Profile}
//             onSaveProfile={handleSaveProfile}
//             onSignOut={handleSignOut}
//           />


//           <Route path="*">
//             <PageNotFound />
//           </Route>
//         </Switch>

//         <Popup
//           title={textPopup}
//           isOpenPopup={isInfoPopupOpen}
//           onClosePopup={onClosePopup}
//         />
//       </CurrentUserContext.Provider>
//     </div>
//   )
// }

const history = useHistory();
const [currentUser, setCurrentUser] = React.useState({});
const [movies, setMovies] = React.useState([]);
const [savedMovies, setSavedMovies] = React.useState([]);
const [loggedIn, setLoggedIn] = React.useState(false);
const [isLoading, setIsLoading] = React.useState(false);
const [isSending, setIsSending] = React.useState(false);
const [isShortMovies, setIsShortMovies] = React.useState(false);
const [isShortSasvedMovies, setIsShortSasvedMovies] = React.useState(false);
const [isInfoPopupOpen, setIsInfoPopupOpen] = React.useState(false);
const [infoPopupTitle, setInfoPopupTitle] = React.useState({
  title: 'Что-то пошло не так! Попробуйте ещё раз.',
});
const [isError, setIsError] = React.useState(false);
let location = useLocation()

function handleInfoPopupClick() {
  setIsInfoPopupOpen(true);
}

function openErrorPopup(title) {
  handleInfoPopupClick();
  setIsError(true);
  setInfoPopupTitle({ title });
}

function openSuccessPopup(title) {
  handleInfoPopupClick();
  setIsError(false);
  setInfoPopupTitle({ title });
}

React.useEffect(() => {
  Promise.all([mainApi.getCurrentUser(), mainApi.getUserMovies()])
    .then(([currentUserData, currentSavedMovies]) => {
      setCurrentUser(currentUserData);
      setLoggedIn(true);
      const lastSearchList = JSON.parse(
        localStorage.getItem('lastSearchList')
      );
      lastSearchList && setMovies(lastSearchList);
      setSavedMovies(currentSavedMovies.movies);
      localStorage.setItem(
        'savedMoviesList',
        JSON.stringify(currentSavedMovies.movies)
      );
    })
    .catch((err) => console.log(err));
}, []);

function isSavedMovie(movie) {
  if (movie) {
    return savedMovies.some(
      (i) => i.movieId === movie.id && i.owner === currentUser._id
    );
  }
}

const handleRegister = ({ name, email, password }, onSuccess) => {
  if (!name || !email || !password) {
    return  
  }
  mainApi
    .register( name, email, password )

    .then((res) => {
      setCurrentUser(res);
      openSuccessPopup('Вы успешно зарегистрировались!');
      onSuccess();
      mainApi
        .authorize( email, password )
        .then((res) => {
          setCurrentUser(res);
          setLoggedIn(true);
          history.push('/movies');
        })
        .catch((err) => {
          console.log(err);
          openErrorPopup('Что-то пошло не так! Попробуйте ещё раз.');
        });
      history.push('/movies');
    })
    .catch((err) => {
      console.log(err);
      openErrorPopup('Что-то пошло не так! Попробуйте ещё раз.');
    })
    .finally(() => {
      setIsSending(false);
    });
};

const handleLogin = ({ email, password }, onSuccess) => {
  setIsSending(true);
  mainApi
    .authorize( email, password )
    .then((res) => {
      setCurrentUser(res);
      setLoggedIn(true);
      onSuccess();
      openSuccessPopup('С возвращением!');
      history.push('/movies');
    })
    .catch((err) => {
      console.log(err);
      openErrorPopup('Что-то пошло не так! Попробуйте ещё раз.');
    })
    .finally(() => {
      setIsSending(false);
    });
};

function searchMovies(name) {
  if (!name) {
    openErrorPopup('Нужно ввести ключевое слово');
    return;
  }
  const MoviesList = JSON.parse(localStorage.getItem('movies'));
  const lastSearchList = MoviesList.filter((movie) => {
    const nameEN = movie.nameEN ? movie.nameEN : movie.nameRU;
    return (
      movie.nameRU.toLowerCase().includes(name.toLowerCase()) ||
      movie.description.toLowerCase().includes(name.toLowerCase()) ||
      nameEN.toLowerCase().includes(name.toLowerCase())
    );
  });
  setMovies(lastSearchList);
  localStorage.setItem('lastSearchList', JSON.stringify(lastSearchList));
  lastSearchList.length === 0 &&
    setTimeout(() => openErrorPopup('Ничего не найдено'), 1200);
  return lastSearchList;
}

function getMovieslist(name) {
  if (loggedIn) {
    setIsLoading(true);
    moviesApi
      .getMoviesCardlist()
      .then((moviesData) => {
        localStorage.setItem('movies', JSON.stringify(moviesData));
        searchMovies(name);
      })
      .catch((err) => {
        openErrorPopup(
          'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз'
        );
      })
      .finally(() => {
        setIsLoading(false);
      });
  }
}

function searchSavedMovies(name) {
  const savedMoviesList = JSON.parse(localStorage.getItem('savedMoviesList'));
  if (!name) {
    openErrorPopup('Нужно ввести ключевое слово');
    return;
  }
  if (savedMoviesList) {
    const searchSavedMoviesList = savedMoviesList.filter((movie) => {
      const nameEN = movie.nameEN ? movie.nameEN : movie.nameRU;
      return (
        movie.nameRU.toLowerCase().includes(name.toLowerCase()) ||
        movie.description.toLowerCase().includes(name.toLowerCase()) ||
        nameEN.toLowerCase().includes(name.toLowerCase())
      );
    });
    setSavedMovies(searchSavedMoviesList);
  }
}

function closeInfoPopup() {
  setIsInfoPopupOpen(false);
}

function handleSavedMovie(movie) {
  mainApi
    .addMovie(movie)
    .then((res) => {
      const NewSavedMovies = [res.movie, ...savedMovies];
      setSavedMovies(NewSavedMovies);
      localStorage.setItem('savedMoviesList', JSON.stringify(NewSavedMovies));
    })
    .catch((err) => {
      console.log(err);
    });
}

function handleMovieDelete(movie) {
  const movieForDelete = savedMovies.find((i) => i.movieId === movie.id);
  mainApi
    .deleteMovie(movieForDelete._id)
    .then((res) => {
      const NewSavedMovies = savedMovies.filter(
        (i) => i.movieId !== movie.id
      );
      setSavedMovies(NewSavedMovies);
      localStorage.setItem('savedMoviesList', JSON.stringify(NewSavedMovies));
    })
    .catch((err) => {
      console.log(err);
    });
}

function handleSavedMovieDelete(movie) {
  mainApi
    .deleteMovie(movie._id)
    .then((res) => {
      const NewSavedMovies = savedMovies.filter((i) => i._id !== movie._id);
      setSavedMovies(NewSavedMovies);
      localStorage.setItem('savedMoviesList', JSON.stringify(NewSavedMovies));
    })
    .catch((err) => {
      console.log(err);
    });
}

function handleToggleShortSavedMovies() {
  !isShortSasvedMovies
    ? setIsShortSasvedMovies(true)
    : setIsShortSasvedMovies(false);
}

function handleToggleShortMovies() {
  !isShortMovies ? setIsShortMovies(true) : setIsShortMovies(false);
}

React.useEffect(() => {
  const lastSearchList = JSON.parse(localStorage.getItem('lastSearchList'));
  isShortMovies
    ? setMovies((state) => state.filter((i) => i.duration <= 40))
    : setMovies(lastSearchList);
}, [isShortMovies]);

React.useEffect(() => {
  const savedMoviesList = JSON.parse(localStorage.getItem('savedMoviesList'));
  isShortSasvedMovies
    ? setSavedMovies((state) =>
        state.filter((i) => i.duration <= 40)
      )
    : setSavedMovies(savedMoviesList);
}, [isShortSasvedMovies]);

function handleUpdateProfile({ name, email }) {
  setIsLoading(true);
  setIsSending(true);
  mainApi
    .editUser({ name, email })
    .then((res) => {
      if (res) {
        setCurrentUser({
          ...currentUser,
          name: res.name,
          email: res.email,
        });
        openSuccessPopup('Данные успешно обновлены!');
      }
    })
    .catch((err) => {
      openErrorPopup('Что-то пошло не так! Попробуйте ещё раз.');
      console.log(err);
    })
    .finally(() => {
      setIsLoading(false);
      setIsSending(false);
    });
}

function handleSignOut(email) {
  mainApi
    .logout(email)
    .then(() => {
      setLoggedIn(false);
      setCurrentUser({ name: '', email: '' });
      localStorage.removeItem('movies');
      localStorage.removeItem('lastSearchList');
      localStorage.removeItem('savedMoviesList');
      setMovies([]);
      setSavedMovies([]);
      history.push('/');
    })
    .catch((err) => {
      console.log(err);
    });
}

return (
  <CurrentUserContext.Provider value={currentUser}>
    {(loggedIn || location.pathname === '/') && (
      <Header loggedIn={loggedIn} />
    )}
    <MovieContext.Provider
      value={{
        movies: movies,
        savedMovies: savedMovies,
        loggedIn: loggedIn,
        isLoading: isLoading,
      }}
    >
      <div className='page'>
        <Switch>
          <Route path='/signin'>
              <Login handleLogin={handleLogin} />
          </Route>
          <Route path='/signup'>
              <Register handleRegister={handleRegister} />
          </Route>
          <Route exact path='/'>
            <Main />
          </Route>
          <ProtectedRoute
            path='/movies'
            loggedIn={loggedIn}
            component={Movies}
            isLoading={isLoading}
            onFilterShort={handleToggleShortMovies}
            getMovies={getMovieslist}
            onLikeClick={handleSavedMovie}
            onDeleteClick={handleMovieDelete}
            isSavedMovie={isSavedMovie}
          />
          <ProtectedRoute
            path='/saved-movies'
            component={SavedMovies}
            isLoading={isLoading}
            loggedIn={loggedIn}
            onDeleteClick={handleSavedMovieDelete}
            isSavedMovie={isSavedMovie}
            onFilterShort={handleToggleShortSavedMovies}
            getMovies={searchSavedMovies}
          />
          <ProtectedRoute
            path='/profile'
            loggedIn={loggedIn}
            onSignOut={handleSignOut}
            component={Profile}
            onSaveProfile={handleUpdateProfile}
          />
          <Route path='*'>
            <PageNotFound />
          </Route>
        </Switch>
        <Popup
          isOpenPopup={isInfoPopupOpen}
          onClosePopup={closeInfoPopup}
          title={infoPopupTitle.title}
        />
      </div>
    </MovieContext.Provider>
  </CurrentUserContext.Provider>
);
}

export default App;
