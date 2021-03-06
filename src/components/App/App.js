import './App.css';
import { Route, Switch } from 'react-router-dom';
import Main from '../Main/Main'
import Header from '../Header/Header';
import Movies from '../Movies/Movies'
import SavedMovies from '../SavedMovies/SavedMovies'
import Profile from '../Profile/Profile'
import Login from '../Login/Login'
import Register from '../Register/Register'

const App = () => {
  return (
    <div className="page">
    <Header />
    <Switch>
      <Route exact path='/'>
        <Main />
      </Route>
      <Route path='/movies'>
        <Movies />
      </Route>
      <Route path='/saved-movies'>
        <SavedMovies />
      </Route>
      <Route path='/profile'>
        <Profile />
      </Route>
      <Route path='/signin'>
        <Login />
      </Route>
      <Route path='/signup'>
        <Register />
      </Route>
    </Switch>
    </div>
  );
}

export default App;
