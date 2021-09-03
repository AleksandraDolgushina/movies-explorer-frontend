import './App.css';
import {  Route, Switch, useHistory, useLocation } from 'react-router-dom';
import { MovieContext } from '../../contexts/MovieContext'
import Main from '../Main/Main'
import Header from '../Header/Header';
import Movies from '../Movies/Movies'
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

  const history = useHistory();
  const [currentUser, setCurrentUser] = React.useState({});
  const [movies, setMovies] = React.useState([]);
  const [savedMovies, setSavedMovies] = React.useState([]);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isShortMovies, setIsShortMovies] = React.useState(false);
  const [isShortSavedMovies, setIsShortSavedMovies] = React.useState(false);
  const [isInfoPopupOpen, setIsInfoPopupOpen] = React.useState(false);
  const [infoPopupTitle, setInfoPopupTitle] = React.useState({});
  const [isSave, setIsSave] = React.useState(false)
  let location = useLocation()

  React.useEffect(() => {
    const path = location.pathname
    const token = localStorage.getItem('jwt')
    if (token) {
      mainApi
      .checkToken(token)
      .then((res) => {
        if (res) {
          setLoggedIn(true)
          history.push(path)
      }
    })
      .catch((err) => {
        console.log(err)
        localStorage.removeItem('jwt')
        history.push('/')
      })
    }
  }, [])

  function handleInfoPopupClick() {
    setIsInfoPopupOpen(true);
  }

  function openErrorPopup(title) {
    handleInfoPopupClick();
    setInfoPopupTitle({ title });
  }

  function openSuccessPopup(title) {
    handleInfoPopupClick();
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
          'savedMovies',
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

  const handleRegister = ({ name, email, password }) => {
    if (!name || !email || !password) {
      return  
    }
    setIsSave(true)
    mainApi
      .register( name, email, password )
      .then((res) => {
        setCurrentUser(res);
        openSuccessPopup('Вы успешно зарегистрировались!');
        mainApi
          .authorize( email, password )
          .then((res) => {
            setCurrentUser(res);
            setLoggedIn(true);
            localStorage.setItem('jwt', res.token)
            history.push('/movies');
          })
          .catch((err) => {
            if (err.status === 409) {
              openErrorPopup('Пользователь с таким email уже существует')
            } else {
              openErrorPopup('При регистрации пользователя произошла ошибка')
            }
          });
        history.push('/movies');
      })
      .catch((err) => {
        console.log(err);
        openErrorPopup('Что-то пошло не так! Попробуйте ещё раз.');
      })
  };

  const handleLogin = ({ email, password }) => {
    if (!email || !password) {
      return
    }
    setIsSave(true)
    mainApi
      .authorize( email, password )
      .then((res) => {
        setCurrentUser(res);
        setLoggedIn(true);
        localStorage.setItem('jwt', res.token)
        history.push('/movies');
      })
      .catch((err) => {
        if (err.status === 400) {
          openErrorPopup('Неверный email или пароль')
        } else {
          openErrorPopup('При авторизации произошла ошибка')
        }
      });
  };

  function searchMovies(name) {
    if (!name) {
      openErrorPopup('Нужно ввести ключевое слово');
      return;
    }
    const moviesList = JSON.parse(localStorage.getItem('initalMovies'));
    const lastSearchList = moviesList.filter((movie) => {
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
        .getMovies()
        .then((moviesData) => {
          localStorage.setItem('initalMovies', JSON.stringify(moviesData));
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
    const savedMoviesList = JSON.parse(localStorage.getItem('savedMovies'));
    if (!name) {
      openErrorPopup('Нужно ввести ключевое слово');
      return;
    }
    if (savedMoviesList) {
      const searchSavedMovies = savedMoviesList.filter((movie) => {
        const nameEN = movie.nameEN ? movie.nameEN : movie.nameRU;
        return (
          movie.nameRU.toLowerCase().includes(name.toLowerCase()) ||
          movie.description.toLowerCase().includes(name.toLowerCase()) ||
          nameEN.toLowerCase().includes(name.toLowerCase())
        );
      });
      setSavedMovies(searchSavedMovies);
    }
  }

  function closeInfoPopup() {
    setIsInfoPopupOpen(false);
  }

  function handleSavedMovie(movie) {
    mainApi
      .addMovies(movie)
      .then((res) => {
        const newSavedMovies = [res.movie, ...savedMovies];
        setSavedMovies(newSavedMovies);
        localStorage.setItem('savedMovies', JSON.stringify(newSavedMovies));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleMovieDelete(movie) {
    const movieId = savedMovies.find((i) => i.movieId === movie.id)._id;
    mainApi
      .deleteMovies(movieId)
      .then((res) => {
        const newSavedMovies = savedMovies.filter(
          (i) => i.movieId !== res.movieId
        );
        setSavedMovies(newSavedMovies);
        localStorage.setItem('savedMovies', JSON.stringify(newSavedMovies));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleSavedMovieDelete(movie) {
    mainApi
      .deleteMovies(movie._id)
      .then((res) => {
        const newSavedMovies = savedMovies.filter((i) => i._id !== res._id);
        setSavedMovies(newSavedMovies);
        localStorage.setItem('savedMovies', JSON.stringify(newSavedMovies));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleToggleShortSavedMovies() {
    !isShortSavedMovies
      ? setIsShortSavedMovies(true)
      : setIsShortSavedMovies(false);
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
    const savedMoviesList = JSON.parse(localStorage.getItem('savedMovies'));
    isShortSavedMovies
      ? setSavedMovies((state) =>
          state.filter((i) => i.duration <= 40)
        )
      : setSavedMovies(savedMoviesList);
  }, [isShortSavedMovies]);

  function handleUpdateProfile({ name, email }) {
    setIsLoading(true);
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
        if (err.status === 409) {
          openErrorPopup('Пользователь с таким email уже существует')
        } else {
          openErrorPopup('При обновлении профиля произошла ошибка')
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleSignOut() {
    setLoggedIn(false);
    setCurrentUser({ name: '', email: '' });
    setSavedMovies([])
    localStorage.removeItem('jwt')
    localStorage.removeItem('initalMovies');
    localStorage.removeItem('lastSearchList');
    localStorage.removeItem('savedMovies');
    setMovies([]);
    setSavedMovies([]);
    setIsShortMovies([]);
    setIsShortSavedMovies([]);
    history.push('/');
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
                <Login handleLogin={handleLogin} isSave={isSave}/>
            </Route>
            <Route path='/signup'>
                <Register handleRegister={handleRegister} isSave={isSave} />
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
