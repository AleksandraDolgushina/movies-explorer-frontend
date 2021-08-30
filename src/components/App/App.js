import './App.css';
import { Route, Switch, useHistory, useLocation } from 'react-router-dom';
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

const App = () => {
  // const [isLoading, setIsLoading] = React.useState(false)
  // const [loadingError, setLoadingError] = React.useState('')
  // const [currentUser, setCurrentUser] = React.useState({})
  // const [loggedIn, setLoggedIn] = React.useState(false)
  // const [initialMovies, setInitialMovies] = React.useState([])
  // const [savedMovies, setSavedMovies] = React.useState([])
  // const [filterMovies, setFilterMovies] = React.useState([])
  // const [filterSavedMovies, setFilterSavedMovies] = React.useState([])
  // const [query, setQuery] = React.useState('')
  // const history = useHistory()
  // const [isInfoPopupOpen, setIsInfoPopupOpen] = React.useState(false)
  // const [textPopup, setTextPopup] = React.useState('')
  // let location = useLocation()
  
  // React.useEffect( () => {
  //   checkToken()
  // }, [])

  // const checkToken = () => {
  //   const jwt = localStorage.getItem('jwt')
  //   if (jwt) {
  //     mainApi.getContent(jwt)
  //     .then( res => {
  //       setLoggedIn(true)
  //       setCurrentUser(res)
  //     })
  //     .catch((err) => {
  //       console.log(err)
  //       localStorage.removeItem('jwt')
  //       history.push('/')
  //     })
  //   }
  // }

  // React.useEffect(() => {
  //   Promise.all([mainApi.getUser(), mainApi.getUserMovies()])
  //     .then(([ userData, userMovies ]) => {
  //       setCurrentUser(userData)
  //       setSavedMovies(userMovies)
  //     })
  //     .catch((err) => {
  //       setLoadingError(
  //         'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз'
  //       )
  //     })
  // }, []);

  // function handleRegister({ name, email, password }) {
  //   if (!name || !email || !password) {
  //     return
  //   }
  //   mainApi
  //     .register(name, email, password)
  //     .then((res) => {
  //       setCurrentUser(res);
  //       history.push("/signin")
  //     })
  //     .catch((err) => {
  //       if (err.status === 409) {
  //         setTextPopup('Пользователь с таким email уже существует')
  //         setIsInfoPopupOpen(true)
  //       } else {
  //         setTextPopup('При регистрации пользователя произошла ошибка')
  //         setIsInfoPopupOpen(true)
  //       }
  //     })
  //   }
    
  //   function handleLogin({email, password}) {
  //     mainApi
  //     .authorize(email, password)
  //     .then((res) => {
  //       setCurrentUser(res)
  //       setLoggedIn(true)
  //       localStorage.setItem('jwt', res.token);
  //       //getCurrentUser()
  //       history.push('/movies')
  //     })
  //     .catch((err) => {
  //       if (err.status === 400) {
  //         setTextPopup('Неверный email или пароль')
  //         setIsInfoPopupOpen(true)
  //       } else {
  //         setTextPopup('При авторизации произошла ошибка')
  //         setIsInfoPopupOpen(true)
  //       }
  //     })
  // }

  // // function getCurrentUser() {
  // //   const token = localStorage.getItem('jwt')
  // //   mainApi
  // //     .getContent(token)
  // //     .then((res) => {
  // //       if (res) {
  // //         setCurrentUser(res)
  // //         localStorage.setItem('currentUser', JSON.stringify(res))
  // //       }
  // //     })
  // //     .catch((err) => {
  // //       console.log(err)
  // //     })
  // // }

  // function handleSaveProfile(data) {
  //   mainApi
  //     .editUser(data)
  //     .then((profile) => {
  //       setCurrentUser(profile)
  //       setTextPopup('Профиль обновлен')
  //       setIsInfoPopupOpen(true)
  //     })
  //     .catch((err) => {
  //       if (err.status === 409) {
  //         setTextPopup('Пользователь с таким email уже существует')
  //       } else {
  //         setTextPopup('При обновлении профиля произошла ошибка')
  //       }
  //       setIsInfoPopupOpen(true)
  //     })
  // }

  // function handleSignOut() {
  //   localStorage.removeItem('jwt')
  //   localStorage.removeItem('currentUser')
  //   setLoggedIn(false)
  //   setCurrentUser({})

  //   localStorage.removeItem('initialMovies')
  //   localStorage.removeItem('savedMovies')
  //   setInitialMovies([])
  //   setSavedMovies([])
  //   setFilterMovies([])
  //   setFilterSavedMovies([])

  //   history.push('/')
  // }

  // function getInitialMovies() {
  //   moviesApi
  //     .getMovies()
  //     .then((data) => {
  //       localStorage.setItem('initialMovies', JSON.stringify(data))
  //       setInitialMovies(data)
  //     })
  //     .catch((err) => {
  //       localStorage.removeItem('initialMovies')
  //       setLoadingError(
  //         'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз'
  //       )
  //     })
  // }

  // // function getSavedMovies() {
  // //   mainApi
  // //     .getUserMovies()
  // //     .then((data) => {
  // //       const savedArray = data.map((item) => {
  // //         return { ...item, id: toString(item.movieId) }
  // //       })
  // //       localStorage.setItem('savedMovies', JSON.stringify(savedArray))
  // //       setSavedMovies(savedArray)
  // //     })
  // //     .catch((err) => {
  // //       localStorage.removeItem('savedMovies')
  // //       setLoadingError(
  // //         'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз'
  // //       )
  // //     })
  // // }

  // React.useEffect(() => {
  //   const initial = JSON.parse(localStorage.getItem('initialMovies'))
  //   if (initial) {
  //     setInitialMovies(initial)
  //   } else {
  //     getInitialMovies()
  //   }

  //   const saved = JSON.parse(localStorage.getItem('savedMovies'))
  //   if (saved) {
  //     setSavedMovies(saved)
  //   } else {
  //     //getSavedMovies()
  //   }
  // }, [])

  // React.useEffect(() => {
  //   if (loggedIn) {
  //     getInitialMovies()
  //     //getSavedMovies()
  //   }
  // }, [loggedIn])

  // function isSavedMovie(movie) {
  //   return savedMovies.some((item) => item.id === movie.id)
  // }

  // function filter(data, query) {
  //   if (query) {
  //     const regex = new RegExp(query, 'gi')
  //     const filterData = data.filter((item) => {
  //       return regex.test(item.nameRU) || regex.test(item.nameEN)
  //     })
  //     if (filterData.length === 0) {
  //       setLoadingError('Ничего не найдено')
  //     } else {
  //       setLoadingError('')
  //     }
  //     return filterData
  //   }
  //   return []
  // }

  // function onSubmitSearch(query) {
  //   setIsLoading(true)
  //   setTimeout(() => {
  //     setQuery(query)
  //     setFilterMovies(filter(initialMovies, query))
  //     setIsLoading(false)
  //   }, 500)
  // }

  // function onSubmitSearchSaved(query) {
  //   setIsLoading(true)
  //   setTimeout(() => {
  //     setQuery(query)
  //     setFilterSavedMovies(filter(savedMovies, query))
  //     setIsLoading(false)
  //   }, 500)
  // }

  // function onLikeClick(movie, isMarked) {
  //   if (isMarked) {
  //     addMovie(movie)
  //   } else {
  //     deleteMovie(movie)
  //   }
  // }

  // function deleteMovie(movie) {
  //   const movieId = savedMovies.find((item) => item.id === movie.id)._id
  //   mainApi
  //     .deleteMovies(movieId)
  //     .then((res) => {
  //       if (res) {
  //         const newArray = savedMovies.filter(
  //           (item) => item.movieId !== res.movieId
  //         )
  //         setSavedMovies(newArray)
  //       }
  //     })
  //     .catch((err) => {
  //       setTextPopup('На сервере произошла ошибка')
  //       setIsInfoPopupOpen(true)
  //     })
  // }

  // function addMovie(movie) {
  //   mainApi
  //     .addMovies(movie)
  //     .then((res) => {
  //       setSavedMovies([...savedMovies, { ...res, id: res.movieId }])
  //     })
  //     .catch((err) => {
  //       setTextPopup('На сервере произошла ошибка')
  //       setIsInfoPopupOpen(true)
  //     })
  // }
  
  // React.useEffect(() => {
    //   setFilterSavedMovies(filter(savedMovies, query))
    //   localStorage.setItem('savedMovies', JSON.stringify(savedMovies))
    // }, [savedMovies])
    
    
    // function onClosePopup() {
      //   setIsInfoPopupOpen(false)
      //   setTextPopup('')
      // }
      const [isLoading, setIsLoading] = React.useState(false)
      const [loadingError, setLoadingError] = React.useState('')
      
  const [currentUser, setCurrentUser] = React.useState({})
  const [loggedIn, setLoggedIn] = React.useState(false)
  const history = useHistory()
  const [initialMovies, setInitialMovies] = React.useState([])
  const [savedMovies, setSavedMovies] = React.useState([])
  const [filterMovies, setFilterMovies] = React.useState([])
  const [filterSavedMovies, setFilterSavedMovies] = React.useState([])
  const [query, setQuery] = React.useState('')
  let location = useLocation()
  const [isInfoPopupOpen, setIsInfoPopupOpen] = React.useState(false)
  const [textPopup, setTextPopup] = React.useState('')
      
  React.useEffect(() => {
    const path = location.pathname
    const token = localStorage.getItem('jwt')
    if (token) {
      mainApi
      .checkToken(token)
      .then((res) => {
      if (res) {
        setLoggedIn(true)
        //getCurrentUser()
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

  function handleRegister({ name, email, password }) {
    if (!name || !email || !password) {
      return
    }
    mainApi
      .register(name, email, password)
      .then((res) => {
        if (res) {
          history.push('/signin')
        }
      })
      .catch((err) => {
        if (err.status === 409) {
          setTextPopup('Пользователь с таким email уже существует')
          setIsInfoPopupOpen(true)
        } else {
          setTextPopup('При регистрации пользователя произошла ошибка')
          setIsInfoPopupOpen(true)
        }
      })
  }

  function handleLogin({email, password}) {
    if (!email || !password) {
      return
    }
    mainApi
      .authorize(email, password)
      .then((res) => {
        if (res.token) {
          localStorage.setItem('jwt', res.token)
          setLoggedIn(true)
          //getCurrentUser()
          history.push('/movies')
        }
      })
      .catch((err) => {
        if (err.status === 400) {
          setTextPopup('Неверный email или пароль')
          setIsInfoPopupOpen(true)
        } else {
          setTextPopup('При авторизации произошла ошибка')
          setIsInfoPopupOpen(true)
        }
      })
  }

    React.useEffect(() => {
    Promise.all([mainApi.getCurrentUser(), mainApi.getUserMovies()])
      .then(([ userData, userMovies ]) => {
        setCurrentUser(userData)
        setSavedMovies(userMovies)
        setLoggedIn(true)
      })
      .catch((err) => {
        setLoadingError(
          'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз'
        )
      })
  }, []);

  React.useEffect(() => {
    const initial = JSON.parse(localStorage.getItem('initialMovies'))
    if (initial) {
      setInitialMovies(initial)
    } else {
      getInitialMovies()
    }

    const saved = JSON.parse(localStorage.getItem('savedMovies'))
    if (saved) {
      setSavedMovies(saved)
    } else {
      getSavedMovies()
    }
  }, [])

  // function getCurrentUser() {
  //   const token = localStorage.getItem('jwt')
  //   mainApi
  //     .getCurrentUser(token)
  //     .then((res) => {
  //       if (res) {
  //         setCurrentUser(res)
  //         localStorage.setItem('currentUser', JSON.stringify(res))
  //       }
  //     })
  //     .catch((err) => {
  //       console.log(err)
  //     })
  // }

  function handleSaveProfile(data) {
    mainApi
      .editUser(data)
      .then((profile) => {
        setCurrentUser(profile)
        setTextPopup('Профиль обновлен')
        setIsInfoPopupOpen(true)
      })
      .catch((err) => {
        if (err.status === 409) {
          setTextPopup('Пользователь с таким email уже существует')
        } else {
          setTextPopup('При обновлении профиля произошла ошибка')
        }
        setIsInfoPopupOpen(true)
      })
  }

  function handleSignOut() {
    localStorage.removeItem('jwt')
    localStorage.removeItem('currentUser')
    setLoggedIn(false)
    setCurrentUser({})

    localStorage.removeItem('initialMovies')
    localStorage.removeItem('savedMovies')
    setInitialMovies([])
    setSavedMovies([])
    setFilterMovies([])
    setFilterSavedMovies([])

    history.push('/')
  }


  function getInitialMovies() {
    moviesApi
      .getMovies()
      .then((data) => {
        console.log(data)
        const initialArray = data.map((item) => {
          const imageURL = item.image ? item.image.url : ''
          return {
            ...item,
            image: `https://api.nomoreparties.co${imageURL}`,
            trailer: item.trailerLink,
          }
        })

        localStorage.setItem('initialMovies', JSON.stringify(initialArray))
        setInitialMovies(initialArray)
      })
      .catch((err) => {
        setLoadingError(
          'Во время запроса произошла ошибка. Подождите немного и попробуйте ещё раз'
        )
      })
  }

  function getSavedMovies() {
    mainApi
      .getUserMovies()
      .then((data) => {
        const savedArray = data.map((item) => {
          return { ...item, id: toString(item.movieId) }
        })
        localStorage.setItem('savedMovies', JSON.stringify(savedArray))
        setSavedMovies(savedArray)
      })
      .catch((err) => {
        localStorage.removeItem('savedMovies')
        setLoadingError(
          'Во время запроса произошла ошибка. Подождите немного и попробуйте ещё раз'
        )
      })
  }

  React.useEffect(() => {
    if (loggedIn) {
      getInitialMovies()
      getSavedMovies()
    }
  }, [loggedIn])

  function isSavedMovie(movie) {
    return savedMovies.some((item) => item.id === movie.id)
  }

  function filter(data, query) {
    if (query) {
      const regex = new RegExp(query, 'gi')
      const filterData = data.filter((item) => {
        return regex.test(item.nameRU) || regex.test(item.nameEN)
      })
      
      if (filterData.length === 0) {
        setLoadingError('Ничего не найдено')
      } else {
        setLoadingError('')
      }
      console.log(filterData)
      return filterData
    }
    return []
  }

  function onSubmitSearch(query) {
    setIsLoading(true)
    setTimeout(() => {
      setQuery(query)
      setFilterMovies(filter(initialMovies, query))
      setIsLoading(false)
    }, 500)
  }

  function onSubmitSearchSaved(query) {
    setIsLoading(true)
    setTimeout(() => {
      setQuery(query)
      setFilterSavedMovies(filter(savedMovies, query))
      setIsLoading(false)
    }, 500)
  }

  function onLikeClick(movie, isMarked) {
    if (isMarked) {
      addMovie(movie)
    } else {
      deleteMovie(movie)
    }
  }

  function deleteMovie(movie) {
    const movieId = savedMovies.find((item) => item.id === movie.id)._id
    mainApi
      .deleteMovies(movieId)
      .then((res) => {
        if (res) {
          const newArray = savedMovies.filter(
            (item) => item.movieId !== res.movieId
          )
          setSavedMovies(newArray)
        }
      })
      .catch((err) => {
        setTextPopup('На сервере произошла ошибка')
        setIsInfoPopupOpen(true)
      })
  }

  function addMovie(movie) {
    mainApi
      .addMovie(movie)
      .then((res) => {
        setSavedMovies([...savedMovies, { ...res, id: res.movieId }])
      })
      .catch((err) => {
        setTextPopup('На сервере произошла ошибка')
        setIsInfoPopupOpen(true)
      })
  }

  React.useEffect(() => {
    setFilterSavedMovies(filter(savedMovies, query))
    localStorage.setItem('savedMovies', JSON.stringify(savedMovies))
  }, [savedMovies])


  function onClosePopup() {
    setIsInfoPopupOpen(false)
    setTextPopup('')
  }

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        {(loggedIn || location.pathname === '/') && (
          <Header loggedIn={loggedIn} />
        )}

        <Switch>
          <Route exact path="/">
            <Main />
          </Route>

          <ProtectedRoute
            exact
            path="/movies"
            loggedIn={loggedIn}
            isLoading={isLoading}
            loadingError={loadingError}
            component={Movies}
            savedMovies={false}
            movies={filterMovies}
            onSubmitSearch={onSubmitSearch}
            onLikeClick={onLikeClick}
            isSavedMovie={isSavedMovie}
          />

          <ProtectedRoute
            exact
            path="/saved-movies"
            loggedIn={loggedIn}
            isLoading={isLoading}
            loadingError={loadingError}
            component={Movies}
            savedMovies={true}
            movies={filterSavedMovies}
            onSubmitSearch={onSubmitSearchSaved}
            onLikeClick={onLikeClick}
            isSavedMovie={isSavedMovie}
          />

          <ProtectedRoute
            exact
            path="/profile"
            loggedIn={loggedIn}
            component={Profile}
            onSaveProfile={handleSaveProfile}
            onSignOut={handleSignOut}
          />

          <Route path="/signup">
            <Register handleRegister={handleRegister} />
          </Route>

          <Route path="/signin">
            <Login handleLogin={handleLogin} />
          </Route>

          <Route path="*">
            <PageNotFound />
          </Route>
        </Switch>

        <Popup
          title={textPopup}
          isOpenPopup={isInfoPopupOpen}
          onClosePopup={onClosePopup}
        />
      </CurrentUserContext.Provider>
    </div>
  )
}

export default App;
