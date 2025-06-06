import { useState } from 'react';
import { Link } from 'react-router-dom';
import { genreMap } from '../Button_filter/genre';
import NotationComponent from './Notation.jsx';
import './MovieDetail.css'

function MovieDetail({ movie, people, onRating, rating }) {
    // Affichage du film
    const title = movie.title;
    const release_date = movie.release_date;
    const getPersonName = (id) => people.find(p => p.id === id)?.name || 'Inconnu';
    const director = getPersonName(movie.director_id);
    const writer = getPersonName(movie.writer_id);
    const actor1 = getPersonName(movie.actor1_id);
    const actor2 = getPersonName(movie.actor2_id);
    const actor3 = getPersonName(movie.actor3_id);
    const actor4 = getPersonName(movie.actor4_id);
    const actor5 = getPersonName(movie.actor5_id);
    const overview = movie.overview;
    const genreIds = JSON.parse(movie.genre_ids);
    const genres = genreIds
        .map(id => genreMap[id])
        .filter(Boolean)
        .join(', ');
    const image_path = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

    // Notation du film
    const [hoveredRating, setHoveredRating] = useState(0);
    const [selectedRating, setSelectedRating] = useState(rating || 0);

    const handleMouseEnter = (index) => {
        setHoveredRating(index);
    };

    const handleMouseLeave = () => {
        setHoveredRating(0);
    };

    const handleClick = (index) => {
        setSelectedRating(index);
        if (onRating) {
            onRating(movie.id, index);
        }
    };

    return (
        <div className="movie-page">
            <img src={image_path} alt={title} className="poster" />
            <div className="presentation">
                <Link to="/" className="Retour">
                    <div>Retour aux films</div>
                </Link>
                <h2>{title}</h2>
                <div className="caracteristiques">
                    <div className="colonne">
                        <p><b>Réalisé par :</b> {director}</p>
                        <p><b>Écrit par :</b> {writer}</p>
                        <p><b>Avec :</b> {actor1}, {actor2}, {actor3}, {actor4}, {actor5}</p>
                    </div>
                    <div className="colonne">
                        <p><b>Date de sortie :</b> {release_date}</p>
                        <p><i>{genres}</i></p>
                        <div className="notation">
                            {[1, 2, 3, 4, 5].map((index) => (
                                <span
                                    key={index}
                                    className="etoile"
                                    style={{ cursor: 'pointer' }}
                                    onMouseEnter={() => handleMouseEnter(index)}
                                    onMouseLeave={handleMouseLeave}
                                    onClick={() => handleClick(index)}
                                >
                                    {(hoveredRating || selectedRating) >= index ? '★' : '☆'}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
                <p>- - - - - - - - - - - - - - - - -</p>
                <h3>Résumé</h3>
                <p>{overview}</p>

                {/* Le composant NotationComponent qui envoie la note dans la base */}
                <NotationComponent movieId={movie.id} index={selectedRating} />
            </div>
        </div>
    );
}

export default MovieDetail;
