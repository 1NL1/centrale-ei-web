import { useEffect, useState } from 'react';
import axios from 'axios';
import Movie from '../Movies/Movie';
// import './SimilarMovies.css';

function SimilarMovies({ movie, people, listId }) {
    const [similarMovies, setSimilarMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const similarMovieIds = listId || [];

    useEffect(() => {
        if (similarMovieIds.length === 0) {
            setSimilarMovies([]);
            setLoading(false);
            return;
        }

        setLoading(true);
        setError(null);

        // Lancer toutes les requêtes GET /movies/:id en parallèle
        Promise.all(
            similarMovieIds.map(id =>
                axios
                    .get(`${import.meta.env.VITE_API_URL}/movies/${id}`)
                    .then(res => res.data)
            )
        )
            .then(movies => {
                setSimilarMovies(movies);
                setLoading(false);
            })
            .catch(err => {
                console.error("Erreur lors du chargement des films similaires :", err);
                setError("Impossible de charger les films similaires.");
                setLoading(false);
            });
    }, [similarMovieIds]);

    if (loading) return <p>Chargement des films similaires...</p>;
    if (error) return <p style={{ color: 'red' }}>{error}</p>;
    if (similarMovies.length === 0) return <p>Aucun film similaire trouvé.</p>;

    return (
        <div className="similar-movie-section">
            <h2>Films similaires</h2>
            <div className="movie-grid">
                {similarMovies.map(m => (
                    <Movie key={m.id} movie={m} people={people} />
                ))}
            </div>
        </div>
    );
}

export default SimilarMovies;
