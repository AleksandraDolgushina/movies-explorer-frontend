export class MoviesApi {
    constructor({address, headers}) {
        this._address = address;
        this._headers= headers;
    }
  
    _getResponseData(response) {
      return response.then((res) => {
        if (res.ok) {
          return res.json()
        }
        return Promise.reject(
          new Error(`Ошибка получения данных: ${res.status} ${res.statusText}`)
        )
      })
    }
  
    getMovies() {
      return fetch(`${this._address}`, {
          headers: this._headers,
        })
        .then(this._getResponseData)
        .then ((res) => {
          return res
        }
        )
    }
  }
  
  const moviesApi = new MoviesApi({
    address: 'https://api.nomoreparties.co/beatfilm-movies',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  
  export default moviesApi