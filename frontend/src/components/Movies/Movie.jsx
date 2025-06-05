import './Movie.css';
import { Link } from 'react-router-dom';

function Movie({ movie, people }) {
    const title = movie.title;
    const release_date = movie.release_date;
    const getPersonName = (id) => people.find(p => p.id === id)?.name || 'Inconnu';
    const director = getPersonName(movie.director_id);

    const image_path = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;


    return (
        <Link to={`/movie/${movie.id}`} className="movie-card-link">
            <div className="movie-card">
                <img
                    src={image_path}
                    alt={title}
                    className="movie-poster"
                />
                <div className="description">
                    <h2>{title}</h2>
                    <p>Date de sortie: {release_date}</p>
                    <p>Réalisé par: {director}</p>

                </div>
            </div>
        </Link>
    );
}

export default Movie;
