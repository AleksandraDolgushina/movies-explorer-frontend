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

    getUserMovies() {
        const token = localStorage.getItem('jwt')
        return fetch(`${this._address}/movies`, {
            headers: {
                ...this._headers,
                Authorization: `Bearer ${token}`,
            },
        })
        .then(this._handleResponse)
    };

    editUser(data) {
        const token = localStorage.getItem('jwt')
        return fetch(`${this._address}/users/me`, {
            method: 'PATCH',
            credentials: 'include',
            headers: {
                ...this._headers,
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                name: data.name,
                email: data.email
            })
        })
        .then(this._handleResponse)
    };

    addMovies(data) {
        const token = localStorage.getItem('jwt')
        return fetch(`${this._address}/movies`, {
            method: 'POST',
            headers: {
                ...this._headers,
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                country: data.country ? data.country : "null",
                description: data.description,
                director: data.director,
                duration: data.duration,
                image: `https://api.nomoreparties.co${data.image.url}`,
                nameEN: data.nameEN,
                nameRU: data.nameRU,
                trailer: data.trailerLink,
                year: data.year,
                thumbnail: `https://api.nomoreparties.co${data.image.formats.thumbnail.url}`,
                movieId: data.id.toString(),
            })
        })
        .then(this._handleResponse)
    };

    deleteMovies(_id) {
        const token = localStorage.getItem('jwt')
        return fetch(`${this._address}/movies/${_id}`, {
            method: 'DELETE',
            headers: {
                ...this._headers,
                Authorization: `Bearer ${token}`,
            },
        })
        .then(response => response.ok
            ? Promise.resolve('success')
            : Promise.reject(`Ошибка ${response.status}`))
    };
      
    register( name, email, password ) {
        return fetch(`${this._address}/signup`, {
          method: 'POST',
          credentials: 'include',
          headers: this._headers,
          body: JSON.stringify({ name, email, password }),
        }).then(this._handleResponse);
      };
      
    authorize( email, password ) {
        return fetch(`${this._address}/signin`, {
          method: 'POST',
          headers: this._headers,
          body: JSON.stringify({ email, password }),
        }).then(this._handleResponse);
    };

    checkToken(token) {
        return fetch(`${this._address}/users/me`, {
            headers: {
            credentials: 'include',
              ...this._headers,
              Authorization: `Bearer ${token}`,
            },
          }).then(this._handleResponse);
    }

    getCurrentUser() {
        const token = localStorage.getItem('jwt')
        return fetch(`${this._address}/users/me`, {
            credentials: 'include',
            headers: {
                ...this._headers,
                'Authorization': `Bearer ${token}`,
            },
          }).then(this._handleResponse);
    }
}

const mainApi = new MainApi({
    address: 'https://api.dolgushina.diploma.nomoredomains.monster',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        }
});

export default mainApi;