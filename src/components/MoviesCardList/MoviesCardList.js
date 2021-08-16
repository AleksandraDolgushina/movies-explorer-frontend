import MoviesCard from "../MoviesCard/MoviesCard";
import './MoviesCardList.css'

function MoviesCardList() {
    return (
        <section className="cards">
            <div className="cards__movies">
                <MoviesCard />
                <MoviesCard />
                <MoviesCard />
                <MoviesCard />
                <MoviesCard />
                <MoviesCard />
                <MoviesCard />
                <MoviesCard />
            </div>
            <button className="cards__more">Ещё</button>
        </section>
    )
}
export default MoviesCardList;