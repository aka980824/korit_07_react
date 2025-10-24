import { Link } from "react-router-dom";

function Movie({ id, coverImg, title, summary, genre }) {
    return (
    <div className="movie-card">
        <Link to={`/movie/${id}`}>
        <img src={coverImg} alt={title} />
        </Link>
        <div className="moviecard_data">
        <Link to={`/movie/${id}`}>
            {title}
        </Link>
        </div>
        <ul className="movie_card_genres">
        <li key={genre}>{genre}</li>
        </ul>
    </div>
    );
}

export default Movie;
