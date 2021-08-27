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
      return this._getResponseData(
        fetch(`${this._address}`, {
          method: 'GET',
          headers: this._headers,
        })
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