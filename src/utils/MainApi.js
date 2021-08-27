class MainApi {
    constructor({address, headers}) {
        this._address = address;
        this._headers= headers;
    }

    _handleResponse(response) {
        if (response.ok) {
            return response.json()
        } return Promise.reject(`Ошибка ${response.status}`)
    };

    getUser() {
        return fetch(`${this._address}/users/me`, {
            credentials: 'include',
            headers: this._headers,
        })
        .then(this._handleResponse)
    ;}

    getMovies() {
        return fetch(`${this._address}/movies`, {
            credentials: 'include',
            headers: this._headers,
        })
        .then(this._handleResponse)
    };

    editUser(data) {
        return fetch(`${this._address}/users/me`, {
            method: 'PATCH',
            credentials: 'include',
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                email: data.email
            })
        })
        .then(this._handleResponse)
    };

    addMovies(data) {
        return fetch(`${this._address}/cards`, {
            method: 'POST',
            credentials: 'include',
            headers: this._headers,
            body: JSON.stringify({
                country: data.country,
                director: data.director,
                duration: data.duration,
                year: data.year,
                description: data.description,
                image: data.image,
                trailer: data.trailer,
                thumbnail: data.thumbnail,
                movieId: data.movieId,
                nameRU: data.nameRU,
                nameEN: data.nameEN
            })
        })
        .then(this._handleResponse)
    };

    deleteMovies(id) {
        return fetch(`${this._address}/movies/${id}`, {
            method: 'DELETE',
            credentials: 'include',
            headers: this._headers,
        })
        .then(response => response.ok
            ? Promise.resolve('success')
            : Promise.reject(`Ошибка ${response.status}`))
    };
    logout({ email }) {
        return fetch(`${this._address}/signout`, {
          method: 'POST',
          credentials: 'include',
          headers: this._headers,
          body: JSON.stringify({
            email: email,
          }),
        }).then(this._handleResponse);
      };
      
    register({ name, email, password }) {
        return fetch(`${this._address}/signup`, {
          method: 'POST',
          credentials: 'include',
          headers: this._headers,
          body: JSON.stringify({ name, email, password }),
        }).then(this._handleResponse);
      };
      
    authorize({ email, password }) {
        return fetch(`${this._address}/signin`, {
          method: 'POST',
          credentials: 'include',
          headers: this._headers,
          body: JSON.stringify({ email, password }),
        }).then(this._handleResponse);
      };

}

const mainApi = new MainApi({
    address: 'https://api.dolgushina.diploma.nomoredomains.monster',
    headers: {
        'Content-Type': 'application/json'
        }
});

export default mainApi;