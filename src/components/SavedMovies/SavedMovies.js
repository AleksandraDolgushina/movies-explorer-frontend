import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import Footer from '../Footer/Footer'

function SavedMovies() {
    return (
        <section className="saved-movies">
            <SearchForm />
            <MoviesCardList />
            <Footer />
        </section>
    )
}
export default SavedMovies;